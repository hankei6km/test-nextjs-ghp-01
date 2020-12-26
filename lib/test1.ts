import aspida from '@aspida/fetch';
import api from '../api/$api';
import { ParsedUrlQuery } from 'querystring';
import { GetStaticPropsContext } from 'next';

const test1FetchBaseURL = ((): string => {
  const test1FetchBaseURL = process.env.API_TEST1_URL_BASE || '';
  if (test1FetchBaseURL === '') {
    console.error('$API_TEST1_URL_BASE is not defined.');
  }
  return test1FetchBaseURL;
})();
const test1FetchConfig = (() => {
  const getApiKey = process.env.GET_API_KEY || '';
  if (getApiKey === '') {
    console.error('$GET_API_KEY is not defined.');
  }
  return {
    headers: { 'X-API-KEY': getApiKey }
  };
})();
const sortedTest1DataFields = ['id', 'title'].join(',');
const allTest1IdsFields = ['id'].join(',');

const client = api(
  aspida(fetch, {
    baseURL: test1FetchBaseURL
  })
);

export async function getSortedTest1Data() {
  try {
    const res = await client.api.v1.test1.get({
      query: {
        fields: sortedTest1DataFields
      },
      config: test1FetchConfig
    });
    if (res.status === 200) {
      return res.body.contents;
    }
    console.error(`getSortedTest1Data error: status=${res.status}`);
  } catch (err) {
    // TODO: ビルド時のエラーはどう扱うのが正解? 迂闊に err を表示するとシークレットが漏洩する可能性もある.
    console.error(`getSortedTest1Data error: ${err.name}`);
  }
  return [];
}

export async function getAllTest1Ids() {
  try {
    const res = await client.api.v1.test1.get({
      query: {
        fields: allTest1IdsFields
      },
      config: test1FetchConfig
    });
    if (res.status === 200) {
      return res.body.contents.map(({ id }) => ({ params: { id } }));
    }
    console.error(`getAllTest1Ids error: status=${res.status}`);
  } catch (err) {
    // TODO: ビルド時のエラーはどう扱うのが正解? 迂闊に err を表示するとシークレットが漏洩する可能性もある.
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
    const res = await client.api.v1.test1
      ._id(!preview ? params.id : previewData.slug) // 似たような3項式がバラけていてすっきりしない
      .$get({
        query: {
          draftKey: !preview ? '' : previewData.draftKey
        },
        config: test1FetchConfig
      });
    return res;
  } catch (err) {
    // TODO: ビルド時のエラーはどう扱うのが正解? 迂闊に response を表示するとシークレットが漏洩する可能性もある.
    console.error(`getTest1Data error: ${err.name}`);
  }
  return {};
}
