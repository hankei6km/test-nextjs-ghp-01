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
import { getSortedArticleList } from './articles';
import { join } from 'path';
import { Section, PageData, blankPageData } from '../types/pageTypes';
import { markdownToHtml } from './markdown';

export async function getSortedPagesData() {
  try {
    const res = await client.pages.get({
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

export async function getAllPagesIds() {
  try {
    const res = await client.pages.get({
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

export async function getPagesData({
  params = { id: '' },
  preview = false,
  previewData = {}
}: GetStaticPropsContext<ParsedUrlQuery>): Promise<PagesContent> {
  try {
    const res = await client.pages
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

export async function getPagesDataWithLayout({
  params = { id: '' }
}: // preview = false,
// previewData = {}
GetStaticPropsContext<ParsedUrlQuery>): Promise<PagesContent[]> {
  try {
    // TODO: preview 対応
    const res = await client.pages.get({
      query: {
        ids: `_layout,${params.id}`
      },
      config: fetchConfig
    });
    return res.body.contents;
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
              kind: 'html' as 'html',
              contentHtml: content.html
            };
          } else if (content.fieldId === 'contentMarkdown') {
            return {
              kind: 'html' as 'html',
              contentHtml: markdownToHtml(content.markdown)
            };
          } else if (
            content.fieldId === 'contentArticles' &&
            ApiNameArticleValues.some((v) => v === content.apiName)
          ) {
            const contents = await getSortedArticleList(
              content.apiName as ApiNameArticle
            );
            return {
              kind: 'posts' as 'posts',
              contents: contents.map((c) => ({
                ...c,
                // path: normalize(`/${content.apiName}`)
                path: join('/', content.apiName)
              })),
              detail: content.detail || false
            };
          } else if (content.fieldId === 'contentImage') {
            return {
              kind: 'image' as 'image',
              image: markdownToHtml(content.image)
            };
          }
          return {
            kind: '' as ''
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

export async function getPagesPageData({
  params = { id: '' },
  preview = false,
  previewData = {}
}: GetStaticPropsContext<ParsedUrlQuery>): Promise<PageData> {
  try {
    const rawPageDatas = await getPagesDataWithLayout({
      params,
      preview,
      previewData
    });
    const rawLayoutData = rawPageDatas[0];
    const layoutData = {
      title: rawLayoutData.title,
      description: rawLayoutData.description || '',
      mainImage: '',
      header: await getSectionFromPages(rawLayoutData, 'sectionHeader'),
      sections: await getSectionFromPages(rawLayoutData, 'sectionContent'),
      footer: await getSectionFromPages(rawLayoutData, 'sectionFooter')
    };
    const rawPageData = rawPageDatas[1];
    const pageData = {
      title: rawPageData.title,
      description: rawPageData.description || '',
      mainImage: '',
      header: await getSectionFromPages(rawPageData, 'sectionHeader'),
      sections: await getSectionFromPages(rawPageData, 'sectionContent'),
      footer: await getSectionFromPages(rawPageData, 'sectionFooter')
    };
    return {
      // title: layoutData.title || pageData.title,
      title: pageData.title,
      description: layoutData.description || pageData.description,
      mainImage: '',
      header:
        layoutData.header.length > 0 ? layoutData.header : pageData.sections,
      sections:
        layoutData.sections.length > 0
          ? layoutData.sections
          : pageData.sections,
      footer: layoutData.footer.length > 0 ? layoutData.footer : pageData.footer
    };
  } catch (err) {
    console.error(`getPagesPageData error: ${err.name}`);
  }
  return blankPageData();
}
