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
import {
  Section,
  SectionContentHtmlChildren,
  TocItems
} from '../types/pageTypes';

import visit from 'unist-util-visit';
import { Element } from 'hast';
// import { Heading } from 'mdast';
import { Transformer } from 'unified';
// import nodesToString from 'unist-util-to-string-with-nodes';
const nodesToString = require('unist-util-to-string-with-nodes');

const schema = merge(gh, {
  tagNames: ['picture', 'source'],
  attributes: {
    source: ['srcSet', 'sizes'],
    img: ['alt', 'srcSet', 'sizes', 'className']
  }
});

const textToTocLabelRegExp = /[#.()[\]{}<>@&%$"`=_:;'\\ \t\n\r]/g;
export function getTocLabel(s: string): string {
  // selector ではそのままで使えない id になる可能性もある
  // CSS.escape() は "selector 内で operator? になる文字をエスケープ"するものなので
  // ちょっと意味合いが違う
  return s.replace(textToTocLabelRegExp, '-');
}

const headingToNumberRegExp = /h(\d+)/;
export function headingToNumber(tagName: string): number {
  const n = parseInt(tagName.replace(headingToNumberRegExp, '$1'), 10);
  return isNaN(n) ? -1 : n;
}

export function adjustHeading(
  { top }: { top: number } = { top: 4 }
): Transformer {
  // コンテント HTML と Markdown で本文に入力される見出しは
  // h2 と h3 を使うという前提.
  // (しばらくメモ的につかってみたが、感覚的に本文に見出しを入れると h2 にしたくなる).
  // h1 は保険で最上位にまるめる、.
  return function transformer(tree): void {
    // 今回は最上位が h3 か h4 に固定
    const adjust =
      top === 3
        ? {
            h1: 'h3',
            h2: 'h3',
            h3: 'h4'
          }
        : {
            h1: 'h4',
            h2: 'h4',
            h3: 'h5'
          };
    function visitor(node: Element, _index: number): void {
      if (
        node.tagName === 'h1' ||
        node.tagName === 'h2' ||
        node.tagName === 'h3'
      ) {
        node.tagName = adjust[node.tagName];
        if (node.properties) {
          // とりあえず 空白と tab 改行は - にしておく.
          // https://developer.mozilla.org/ja/docs/Web/HTML/Global_attributes/id
          //> この制約は HTML5 で外されましたが、互換性のために ID は文字で始めるようにしましょう。
          // prefix は sanitize で付加される.
          // 問題になるようなら hash 化する
          // (hashs は notification 用があるので、それを util にする).
          node.properties.id = getTocLabel(nodesToString(node).text);
        }
      }
    }
    visit(tree, 'element', visitor);
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

const tocProcessor = unified().use(rehypeParse, { fragment: true }).freeze();
export function htmlContent(
  html: string,
  root: TocItems = [],
  opts: { top: number; depth: number } = { top: 4, depth: 1 }
): TocItems {
  const ret: TocItems = [...root];
  let items: TocItems = ret;
  const path: TocItems[] = [items];
  let prevDepth = ret.length > 0 ? ret[0].depth : 0;
  const node = tocProcessor.parse(html);
  visit(node, 'element', function (node: Element) {
    const tagName = node.tagName;
    if (
      tagName === 'h1' ||
      tagName === 'h2' ||
      tagName === 'h3' ||
      tagName === 'h4' ||
      tagName === 'h5' ||
      tagName === 'h6'
    ) {
      const depth = opts.depth + (headingToNumber(tagName) - opts.top);
      const item = {
        label: getTocLabel(nodesToString(node).text),
        items: [],
        depth,
        id: `${node.properties?.id}`
      };
      if (prevDepth < depth) {
        if (items.length > 0) {
          path.push(items);
          items = items[items.length - 1].items;
        }
      } else if (depth < prevDepth) {
        items = path.pop() || [];
      }
      items.push(item);
      prevDepth = depth;
    }
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

// toc 用に用意したもの.
// class の処理が抜けている.
export function htmlFromSection(section: Section): string {
  return section.content
    .filter((content) => content.kind === 'html')
    .map((content) => {
      let html = '';
      if (content.kind === 'html') {
        content.contentHtml.forEach((c) => {
          const elm = cheerio.load(`<${c.tagName}/>`)(c.tagName);
          elm.attr(c.attribs);
          elm.html(c.html);
          if (elm) {
            html = `${html}${elm.parent().html()}`;
          }
        });
      }
      return html;
    })
    .join('');
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
