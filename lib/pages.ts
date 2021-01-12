import { ParsedUrlQuery } from 'querystring';
import { GetStaticPropsContext } from 'next';
import client, {
  fetchConfig,
  ApiNameArticleValues,
  ApiNameArticle
} from './client';
import { PagesContent, blankPageContent } from '../types/client/contentTypes';
import { getSortedArticleList } from './articles';
import { Section } from '../types/pageTypes';

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

export async function getPagesSectionsData({
  params = { id: '' },
  preview = false,
  previewData = {}
}: GetStaticPropsContext<ParsedUrlQuery>): Promise<Section[]> {
  try {
    const sections = (
      await getPagesData({
        params,
        preview,
        previewData
      })
    ).sections.map((section) => {
      return async () => {
        if (section.fieldId === 'sectionContent') {
          return {
            title: section.title || '',
            kind: 'content' as 'content',
            contentHtml:
              (section.contentMarkdown
                ? section.contentMarkdown
                : section.contentHtml) || ''
          };
        } else if (
          section.fieldId === 'sectionArticles' &&
          ApiNameArticleValues.some((v) => v === section.apiName)
        ) {
          return {
            title: section.title || '',
            kind: 'posts' as 'posts',
            contents: await getSortedArticleList(
              section.apiName as ApiNameArticle
            ),
            detail: section.detail || false
          };
        }
        return {
          title: section.title,
          kind: '' as ''
        };
      };
    });
    // all だと fetch が同時に実行されすぎる?
    // (いっても 2 セクションもないだろうけど)
    return await Promise.all(sections.map((section) => section()));
  } catch (err) {
    console.error(`getPagesData error: ${err.name}`);
  }
  return [];
}
