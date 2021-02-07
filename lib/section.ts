import { join } from 'path';
import cheerio from 'cheerio';
import parseStyle from 'style-to-object';
// import camelcaseKeys from 'camelcase-keys';  // vedor prefix が jsx styleにならない?
import { PageDataGetOptions, getSortedPagesData } from './pages';
import { markdownToHtml } from './markdown';
import { ApiNameArticleValues, ApiNameArticle } from './client';
import { PagesContent, PagesSectionKind } from '../types/client/contentTypes';
import { Section, SectionContentHtmlChildren } from '../types/pageTypes';
import { GetQuery } from '../types/client/queryTypes';
import { imageToHtml, imageInfo } from './image';

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

export function getApiNameArticle(
  apiNameFromContent: string
): '' | ApiNameArticle {
  if (ApiNameArticleValues.some((v) => v === apiNameFromContent)) {
    return apiNameFromContent as ApiNameArticle;
  }
  return '';
}

export async function getSectionFromPages(
  page: PagesContent,
  kind: PagesSectionKind,
  { articlesApi, curCategory, itemsPerPage, pageNo }: PageDataGetOptions = {
    outerIds: [],
    pageNo: 1,
    itemsPerPage: 10,
    pageCount: 1
  }
): Promise<Section[]> {
  const sections = page.sections
    .filter(({ fieldId }) => fieldId === kind)
    .map((section) => ({
      title: section.title || '',
      content: section.content.map((content) => {
        return async () => {
          if (content.fieldId === 'contentHtml') {
            return {
              kind: 'html' as const,
              contentHtml: htmlToChildren(content.html)
            };
          } else if (content.fieldId === 'contentMarkdown') {
            return {
              kind: 'html' as const,
              contentHtml: htmlToChildren(markdownToHtml(content.markdown))
            };
          } else if (content.fieldId === 'contentImage') {
            return {
              kind: 'html' as const,
              // contentHtml: htmlToChildren(imageToHtml({ ...content }))
              contentHtml: htmlToChildren(
                imageToHtml({
                  image: await imageInfo(content.image.url),
                  alt: content.alt,
                  asThumb: true
                })
              )
            };
          } else if (content.fieldId === 'contentPageArticles' && articlesApi) {
            const apiName = articlesApi;
            const q: GetQuery = {};
            if (itemsPerPage !== undefined) {
              q.limit = itemsPerPage;
              if (pageNo !== undefined) {
                q.offset = itemsPerPage * (pageNo - 1);
              }
            }
            if (curCategory) {
              q.filters = `category[contains]${curCategory}`;
            }
            const pagesList = await getSortedPagesData(apiName, q);
            return {
              kind: 'posts' as const,
              postsKind: 'page' as const,
              contents: pagesList.contents.map((c) => ({
                ...c,
                // path: normalize(`/${content.apiName}`)
                path: join('/', apiName)
              })),
              totalCount: pagesList.totalCount,
              detail: content.detail || false
            };
          } else if (
            content.fieldId === 'contentFragArticles' &&
            getApiNameArticle(content.apiName)
          ) {
            const apiName = getApiNameArticle(
              content.apiName
            ) as ApiNameArticle;
            // if での評価と２回実行される.
            // 型ガードが効かない & ちょっともったいないが、
            // 外に出すと関係のないカスタムフィールドでも実行されるので、とりあえずここで
            const q: GetQuery = {};
            if (content.limit !== undefined) {
              q.limit = content.limit;
            }
            if (content.category.length > 0) {
              q.filters = `category[contains]${content.category
                .map(({ id }) => id)
                .join(',')}`;
            }
            const pagesList = await getSortedPagesData(apiName, q);
            return {
              kind: 'posts' as const,
              postsKind: 'fragment' as const,
              contents: pagesList.contents.map((c) => ({
                ...c,
                // path: normalize(`/${content.apiName}`)
                path: join('/', apiName)
              })),
              totalCount: pagesList.totalCount,
              detail: content.detail || false
            };
          }
          return {
            kind: '' as const
          };
        };
      })
    }));
  // all だと fetch が同時に実行されすぎる?
  // (いっても 2 セクションもないだろうけど)
  return await Promise.all(
    sections.map(async (section) => {
      return {
        title: section.title,
        // content: []
        content: await Promise.all(section.content.map((content) => content()))
      };
    })
  );
}
