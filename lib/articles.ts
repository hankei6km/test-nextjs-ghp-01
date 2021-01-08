import { ParsedUrlQuery } from 'querystring';
import { GetStaticPropsContext } from 'next';
import client, { fetchConfig, ApiNameArticle } from './client';

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
) {
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
  return {};
}
