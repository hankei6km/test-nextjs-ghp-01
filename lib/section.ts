import { join } from 'path';
import cheerio from 'cheerio';
import {
  PageDataGetOptions,
  getSortedPagesData,
  MapApiNameArticle
} from './pages';
import { markdownToHtml } from './markdown';
import { ApiNameArticleValues, ApiNameArticle } from './client';
import { PagesContent, PagesSectionKind } from '../types/client/contentTypes';
import { Section, SectionContentHtmlChildren } from '../types/pageTypes';
import { GetQuery } from '../types/client/queryTypes';

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
            ret.push({
              tagName: elm.tagName,
              attribs: elm.attribs || {},
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
      attribs: {},
      html: html
    });
  }
  if (ret.length === 0) {
    ret.push({
      tagName: 'div',
      attribs: {},
      html: html
    });
  }
  return ret;
}

export function getApiNameArticle(
  apiNameFromContent: string,
  mapApiNameArticle?: MapApiNameArticle
): '' | ApiNameArticle {
  if (
    apiNameFromContent === '%articles' &&
    mapApiNameArticle &&
    mapApiNameArticle.articles
  ) {
    return mapApiNameArticle.articles;
  } else if (ApiNameArticleValues.some((v) => v === apiNameFromContent)) {
    return apiNameFromContent as ApiNameArticle;
  }
  return '';
}

export async function getSectionFromPages(
  page: PagesContent,
  kind: PagesSectionKind,
  { mapApiNameArticle, pageNo, itemsPerPage }: PageDataGetOptions = {
    outerIds: [],
    pageNo: 1,
    itemsPerPage: 10
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
          } else if (
            content.fieldId === 'contentArticles' &&
            getApiNameArticle(content.apiName, mapApiNameArticle)
          ) {
            const apiName = getApiNameArticle(
              content.apiName,
              mapApiNameArticle
            ) as ApiNameArticle;
            // if での評価と２回実行される.
            // 型ガードが効かない & ちょっともったいないが、
            // 外に出すと関係のないカスタムフィールドでも実行されるので、とりあえずここで
            const q: GetQuery = {};
            if (itemsPerPage !== undefined) {
              q.limit = itemsPerPage;
              if (pageNo !== undefined) {
                q.offset = itemsPerPage * (pageNo - 1);
              }
            }
            if (content.category.length > 0) {
              q.filters = `category[contains]${content.category
                .map(({ id }) => id)
                .join(',')}`;
            }
            const contents = await getSortedPagesData(apiName, q);
            return {
              kind: 'posts' as const,
              contents: contents.map((c) => ({
                ...c,
                // path: normalize(`/${content.apiName}`)
                path: join('/', apiName)
              })),
              detail: content.detail || false,
              category: content.category
            };
          } else if (content.fieldId === 'contentImage') {
            return {
              kind: 'image' as const,
              image: content.image,
              alt: content.alt,
              link: content.link || ''
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
