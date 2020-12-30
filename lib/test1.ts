import { ParsedUrlQuery } from 'querystring';
import { GetStaticPropsContext } from 'next';
import client, { fetchConfig } from './client';

export async function getSortedTest1Data() {
  try {
    const res = await client.test1.get({
      query: {
        fields: 'id,title'
      },
      config: fetchConfig
    });
    return res.body.contents;
  } catch (err) {
    // res.status = 404 などでも throw される(試した限りでは)
    // res.status を知る方法は?
    console.error(`getSortedTest1Data error: ${err.name}`);
  }
  return [];
}

export async function getAllTest1Ids() {
  try {
    const res = await client.test1.get({
      query: {
        fields: 'id'
      },
      config: fetchConfig
    });
    return res.body.contents.map(({ id }) => ({ params: { id } }));
  } catch (err) {
    console.error(`getAllTest1Ids error: ${err.name}`);
  }
  return [];
}

export async function getTest1Data({
  params = { id: '' },
  preview = false,
  previewData = {}
}: GetStaticPropsContext<ParsedUrlQuery>) {
  try {
    const res = await client.test1
      ._id(!preview ? params.id : previewData.slug) // 似たような3項式がバラけていてすっきりしない
      .$get({
        query: {
          draftKey: !preview ? '' : previewData.draftKey
        },
        config: fetchConfig
      });
    return res;
  } catch (err) {
    console.error(`getTest1Data error: ${err.name}`);
  }
  return {};
}
