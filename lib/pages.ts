import { ParsedUrlQuery } from 'querystring';
import { GetStaticPropsContext } from 'next';
import client, {
  fetchConfig,
  ApiNameArticleValues,
  ApiNameArticle
} from './client';
import {
  PagesSectionKind,
  PagesContent,
  blankPageContent
} from '../types/client/contentTypes';
import { join } from 'path';
import { Section, PageData, blankPageData } from '../types/pageTypes';
import { markdownToHtml } from './markdown';

const globalPageId = '_global';

export async function getSortedPagesData(apiName: ApiNameArticle) {
  try {
    const res = await client[apiName].get({
      query: {
        fields: 'id,createdAt,updatedAt,publishedAt,revisedAt,title'
      },
      config: fetchConfig
    });
    return res.body.contents;
  } catch (err) {
    // res.status = 404 などでも throw される(試した限りでは)
    // res.status を知る方法は?
    console.error(`getSortedPagesData error: ${err.name}`);
  }
  return [];
}

export async function getAllPagesIds(apiName: ApiNameArticle) {
  try {
    const res = await client[apiName].get({
      query: {
        fields: 'id'
      },
      config: fetchConfig
    });
    return res.body.contents.map(({ id }) => ({ params: { id } }));
  } catch (err) {
    console.error(`getAllPagesIds error: ${err.name}`);
  }
  return [];
}

export async function getPagesData(
  apiName: ApiNameArticle,
  {
    params = { id: '' },
    preview = false,
    previewData = {}
  }: GetStaticPropsContext<ParsedUrlQuery>
): Promise<PagesContent> {
  try {
    const res = await client[apiName]
      ._id(!preview ? params.id : previewData.slug) // 似たような3項式がバラけていてすっきりしない
      .$get({
        query: {
          draftKey: !preview ? '' : previewData.draftKey
        },
        config: fetchConfig
      });
    return res;
  } catch (err) {
    console.error(`getPagesData error: ${err.name}`);
  }
  return blankPageContent();
}

export async function getPagesDataWithOuter(
  apiName: ApiNameArticle,
  {
    params = { id: '' }
  }: // preview = false,
  // previewData = {}
  GetStaticPropsContext<ParsedUrlQuery>,
  outerIds: string[]
): Promise<PagesContent[]> {
  try {
    // TODO: preview 対応
    if (apiName === 'pages') {
      const res = await client[apiName].get({
        query: {
          ids: [globalPageId].concat(outerIds, params.id).join(',')
        },
        config: fetchConfig
      });
      return res.body.contents;
    }
    const res = await client['pages'].get({
      query: {
        ids: [globalPageId].concat(outerIds).join(',')
      },
      config: fetchConfig
    });
    return res.body.contents.concat(
      await getPagesData(apiName, {
        params
      })
    );
  } catch (err) {
    console.error(`getPagesDataWithLayout error: ${err.name}`);
  }
  return [blankPageContent(), blankPageContent()];
}

async function getSectionFromPages(
  page: PagesContent,
  kind: PagesSectionKind
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
              contentHtml: content.html
            };
          } else if (content.fieldId === 'contentMarkdown') {
            return {
              kind: 'html' as const,
              contentHtml: markdownToHtml(content.markdown)
            };
          } else if (
            content.fieldId === 'contentArticles' &&
            ApiNameArticleValues.some((v) => v === content.apiName)
          ) {
            const contents = await getSortedPagesData(
              content.apiName as ApiNameArticle
            );
            return {
              kind: 'posts' as const,
              contents: contents.map((c) => ({
                ...c,
                // path: normalize(`/${content.apiName}`)
                path: join('/', content.apiName)
              })),
              detail: content.detail || false
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

export async function getPagesPageData(
  apiName: ApiNameArticle,
  {
    params = { id: '' },
    preview = false,
    previewData = {}
  }: GetStaticPropsContext<ParsedUrlQuery>,
  outerIds: string[] = []
): Promise<PageData> {
  try {
    const rawPageDatas = await getPagesDataWithOuter(
      apiName,
      {
        params,
        preview,
        previewData
      },
      outerIds
    );
    const pageData = {
      id: rawPageDatas[0].id,
      updated: rawPageDatas[0].revisedAt || rawPageDatas[0].updatedAt,
      title: rawPageDatas[0].title,
      description: rawPageDatas[0].description || '',
      mainImage: '',
      header: await getSectionFromPages(rawPageDatas[0], 'sectionHeader'),
      top: await getSectionFromPages(rawPageDatas[0], 'sectionTop'),
      sections: await getSectionFromPages(rawPageDatas[0], 'sectionContent'),
      bottom: await getSectionFromPages(rawPageDatas[0], 'sectionBottom'),
      footer: await getSectionFromPages(rawPageDatas[0], 'sectionFooter')
    };
    const rawPageDataLen = rawPageDatas.length;
    for (let idx = 1; idx < rawPageDataLen; idx++) {
      const rawPageData = rawPageDatas[idx];
      pageData.id = rawPageData.id;
      pageData.updated = rawPageData.revisedAt || rawPageData.updatedAt;
      pageData.title =
        rawPageData.title !== '' ? rawPageData.title : pageData.title;
      pageData.description = rawPageData.description || pageData.description;
      pageData.mainImage = '';
      const header = await getSectionFromPages(rawPageData, 'sectionHeader');
      pageData.header = header.length > 0 ? header : pageData.header;
      const top = await getSectionFromPages(rawPageData, 'sectionTop');
      pageData.top = top.length > 0 ? top : pageData.top;
      const sections = await getSectionFromPages(rawPageData, 'sectionContent');
      pageData.sections = sections.length > 0 ? sections : pageData.sections;
      const bottom = await getSectionFromPages(rawPageData, 'sectionBottom');
      pageData.bottom = bottom.length > 0 ? bottom : pageData.bottom;
      const footer = await getSectionFromPages(rawPageData, 'sectionFooter');
      pageData.footer = footer.length > 0 ? footer : pageData.footer;
    }
    return pageData;
  } catch (err) {
    console.error(`getPagesPageData error: ${err.name}`);
  }
  return blankPageData();
}
