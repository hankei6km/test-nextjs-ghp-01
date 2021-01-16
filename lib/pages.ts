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
import siteConfig from '../src/site.config';
import { Section, PageData, blankPageData } from '../types/pageTypes';
import { markdownToHtml } from './markdown';

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

export async function getPagesDataWithLayout(
  apiName: ApiNameArticle,
  {
    params = { id: '' }
  }: // preview = false,
  // previewData = {}
  GetStaticPropsContext<ParsedUrlQuery>
): Promise<PagesContent[]> {
  try {
    // TODO: preview 対応
    if (apiName === 'pages') {
      const res = await client[apiName].get({
        query: {
          ids: `_layout,${params.id}`
        },
        config: fetchConfig
      });
      return res.body.contents;
    }
    return [
      await getPagesData('pages', {
        params: {
          id: '_layout'
        }
      }),
      await getPagesData(apiName, {
        params
      })
    ];
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
              className: content.className || ''
            };
          } else if (
            content.fieldId === 'contentConfigLabel' &&
            siteConfig.label[content.field] !== undefined
          ) {
            return {
              kind: 'configLabel' as const,
              field: content.field
            };
          } else if (
            content.fieldId === 'contentConfigImage' &&
            siteConfig.image[content.field] !== undefined
          ) {
            return {
              kind: 'configImage' as const,
              field: content.field
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
  }: GetStaticPropsContext<ParsedUrlQuery>
): Promise<PageData> {
  try {
    const rawPageDatas = await getPagesDataWithLayout(apiName, {
      params,
      preview,
      previewData
    });
    const rawLayoutData = rawPageDatas[0];
    const layoutData = {
      id: rawLayoutData.id,
      updated: rawLayoutData.revisedAt || rawLayoutData.updatedAt,
      title: rawLayoutData.title,
      description: rawLayoutData.description || '',
      mainImage: '',
      header: await getSectionFromPages(rawLayoutData, 'sectionHeader'),
      sections: await getSectionFromPages(rawLayoutData, 'sectionContent'),
      footer: await getSectionFromPages(rawLayoutData, 'sectionFooter')
    };
    const rawPageData = rawPageDatas[1];
    const pageData = {
      id: rawPageData.id,
      updated: rawPageData.revisedAt || rawPageData.updatedAt,
      title: rawPageData.title,
      description: rawPageData.description || '',
      mainImage: '',
      header: await getSectionFromPages(rawPageData, 'sectionHeader'),
      sections: await getSectionFromPages(rawPageData, 'sectionContent'),
      footer: await getSectionFromPages(rawPageData, 'sectionFooter')
    };
    return {
      id: pageData.id,
      updated: pageData.updated,
      // title: layoutData.title || pageData.title,
      title: pageData.title,
      description: layoutData.description || pageData.description,
      mainImage: '',
      header: pageData.header.length > 0 ? pageData.header : layoutData.header,
      sections: pageData.sections,
      footer: pageData.footer.length > 0 ? pageData.footer : layoutData.footer
    };
  } catch (err) {
    console.error(`getPagesPageData error: ${err.name}`);
  }
  return blankPageData();
}
