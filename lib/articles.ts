import { ParsedUrlQuery } from 'querystring';
import { GetStaticPropsContext } from 'next';
import client, { fetchConfig, ApiNameArticle } from './client';
import { ArticlePost, blankArticlePost } from '../types/articleTypes';
import {
  ArticleContent,
  blankArticleContent
} from '../types/client/contentTypes';
import { markdownToHtml } from './markdown';

export async function getSortedArticleList(apiName: ApiNameArticle) {
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
    console.error(`getSortedArticleList error: ${apiName}: ${err.name}`);
  }
  return [];
}

export async function getAllArticleIds(apiName: ApiNameArticle) {
  try {
    const res = await client[apiName].get({
      query: {
        fields: 'id'
      },
      config: fetchConfig
    });
    return res.body.contents.map(({ id }) => ({ params: { id } }));
  } catch (err) {
    console.error(`getAllArticleIds error: ${apiName}: ${err.name}`);
  }
  return [];
}

export async function getArticleData(
  apiName: ApiNameArticle,
  {
    params = { id: '' },
    preview = false,
    previewData = {}
  }: GetStaticPropsContext<ParsedUrlQuery>
): Promise<ArticleContent> {
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
    console.error(`getArticleData error: ${apiName}: ${err.name}`);
  }
  return blankArticleContent();
}

export async function getArticlePostData(
  apiName: ApiNameArticle,
  {
    params = { id: '' },
    preview = false,
    previewData = {}
  }: GetStaticPropsContext<ParsedUrlQuery>
): Promise<ArticlePost> {
  try {
    const res = await getArticleData(apiName, {
      params,
      preview,
      previewData
    });
    const data = {
      id: res.id,
      updated: res.revisedAt || res.updatedAt,
      title: res.title,
      content: res.content.map((content) => {
        if (content.fieldId === 'contentHtml') {
          return { kind: 'html' as 'html', html: content.html };
        } else if (content.fieldId === 'contentMarkdown') {
          return {
            kind: 'html' as 'html',
            html: markdownToHtml(content.markdown)
          };
        }
        return { kind: 'html' as 'html', html: '' };
      }),
      mainImage: res.mainImage || ''
    };
    return data;
  } catch (err) {
    console.error(`getArticlePostData error: ${apiName}: ${err.name}`);
  }
  return blankArticlePost();
}
