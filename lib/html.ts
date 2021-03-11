import unified, { Processor, FrozenProcessor } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeMinifyWhitespace from 'rehype-minify-whitespace';
import rehypeStringify from 'rehype-stringify';
import rehypeSanitize from 'rehype-sanitize';
import merge from 'deepmerge';
import gh from 'hast-util-sanitize/lib/github.json';
import { Schema } from 'hast-util-sanitize';
import cheerio from 'cheerio';
import parseStyle from 'style-to-object';
// import camelcaseKeys from 'camelcase-keys';  // vedor prefix が jsx styleにならない?
import { Section, SectionContentHtmlChildren } from '../types/pageTypes';

import visit from 'unist-util-visit';
import { Element } from 'hast';
// import { Heading } from 'mdast';
import { Transformer } from 'unified';

const schema = merge(gh, {
  tagNames: ['picture', 'source'],
  attributes: {
    source: ['srcSet', 'sizes'],
    img: ['srcSet', 'sizes', 'className']
  }
});

export function adjustHeading(
  { top }: { top: number } = { top: 4 }
): Transformer {
  // hコンテント HTML と Markdown で本文に入力される見出しは h2 と h3 .
  // h1 は保険で最上位にまるめる、.
  return function transformer(tree): void {
    // 今回は最上位が h3 か h4 に固定
    function visitorH3Top(node: Element, _index: number): void {
      switch (node.tagName) {
        case 'h1':
          node.tagName = 'h3';
          break;
        case 'h2':
          node.tagName = 'h3';
          break;
        case 'h3':
          node.tagName = 'h4';
          break;
      }
    }
    function visitorH4Top(node: Element, _index: number): void {
      switch (node.tagName) {
        case 'h1':
          node.tagName = 'h4';
          break;
        case 'h2':
          node.tagName = 'h4';
          break;
        case 'h3':
          node.tagName = 'h5';
          break;
      }
    }
    visit(tree, 'element', top === 3 ? visitorH3Top : visitorH4Top);
  };
}

export function processorHtml() {
  return unified().use(rehypeParse, { fragment: true });
}

function normalizeProcessor(processor: Processor): FrozenProcessor {
  return processor
    .use(rehypeMinifyWhitespace)
    .use(rehypeSanitize, (schema as unknown) as Schema)
    .use(rehypeStringify)
    .freeze();
}

export function normalizedHtml(processor: Processor, html: string): string {
  let ret = '';
  normalizeProcessor(processor).process(html, (err, file) => {
    if (err) {
      console.error(err);
    }
    ret = String(file);
  });
  return ret;
}

export function styleToJsxStyle(
  s: string
): SectionContentHtmlChildren['style'] {
  const p = parseStyle(s) || {};
  const ret: SectionContentHtmlChildren['style'] = {};
  Object.entries(p).forEach((kv) => {
    const [first, ...names] = kv[0].split('-');
    const capitalizedNames = names.map(
      (r) => `${r[0].toLocaleUpperCase()}${r.slice(1)}`
    );
    const k = `${first}${capitalizedNames.join('')}`;

    ret[k] = kv[1];
  });
  return ret;
}

// とりあえず、普通に記述された markdown から変換されたときに body の直下にありそうなタグ.
// いまのところ小文字のみ.
export const SectionContentHtmlChildrenElemValues = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'div',
  'p',
  'blockquote',
  'code',
  'pre',
  'span',
  'img',
  'picture',
  'table',
  'ul',
  'ol',
  'dl',
  'hr',
  'a',
  'header',
  'footer',
  'section',
  'article',
  'aside'
] as const;
export function htmlToChildren(html: string): SectionContentHtmlChildren[] {
  // markdown の変換と sanitize には unifed を使っているので、少し迷ったが cheerio を利用.
  // (unified は typescript で利用するときに対応していないプラグインがたまにあるので)

  const ret: SectionContentHtmlChildren[] = [];
  const $ = cheerio.load(html);
  try {
    $('body')
      .contents()
      .each((_idx, elm) => {
        // https://stackoverflow.com/questions/31949521/scraping-text-with-cheerio
        // if (elm.nodeType === Node.ELEMENT_NODE) {
        if (elm.nodeType === 1) {
          if (
            SectionContentHtmlChildrenElemValues.some((v) => v === elm.tagName)
          ) {
            const $elm = $(elm);
            const attribs = elm.attribs ? { ...elm.attribs } : {};
            let style: SectionContentHtmlChildren['style'] = {};
            if (elm.attribs.style) {
              style = styleToJsxStyle(elm.attribs.style);
              delete attribs.style;
            }
            if (elm.attribs.class) {
              attribs.className = elm.attribs.class;
              delete attribs.class;
            }
            ret.push({
              tagName: elm.tagName,
              style: style,
              attribs: attribs,
              html: $elm.html() || ''
            });
          } else {
            throw new Error(
              `support only ${SectionContentHtmlChildrenElemValues.join(', ')}`
            );
          }
        } else {
          throw new Error('support only nodeType=Node.ELEMENT_NODE');
        }
      });
  } catch (_e) {
    ret.splice(0, ret.length, {
      tagName: 'div',
      style: {},
      attribs: {},
      html: html
    });
  }
  if (ret.length === 0) {
    ret.push({
      tagName: 'div',
      style: {},
      attribs: {},
      html: html
    });
  }
  return ret;
}

export type IndexedHtml = {
  index: {
    range: [
      // start and end pos.
      number,
      number
    ];
    // section  section contentHtml を特定する idx.
    sectionIdx: number;
    contentIdx: number;
    childIdx: number;
  }[];
  html: string;
};

export function getIndexedHtml(sections: Section[]): IndexedHtml {
  const ret: IndexedHtml = {
    index: [],
    html: ''
  };
  sections.forEach((section, sectionIdx) => {
    section.content.forEach((content, contentIdx) => {
      if (content.kind === 'html') {
        // filter ではじくと index がずれる
        // const contentHtmlWithoutCodeBlock = content.contentHtml.filter(
        //   ({ tagName, html }) =>
        //     tagName !== 'pre' && html.slice(0, 4) !== 'code'
        // );
        content.contentHtml.forEach(({ tagName, html }, childIdx) => {
          if (
            tagName !== 'img' &&
            !(tagName === 'pre' && html.slice(0, 5) === '<code')
          ) {
            const start = ret.html.length;
            ret.html = `${ret.html}<${tagName}>${html}</${tagName}>`;
            const index: IndexedHtml['index'][0] = {
              range: [start, ret.html.length - 1],
              sectionIdx: sectionIdx,
              contentIdx: contentIdx,
              childIdx: childIdx
            };
            ret.index.push(index);
          }
        });
      }
    });
  });
  return ret;
}
