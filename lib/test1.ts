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
    const res = await client.test1.get({
      query: {
        fields: 'id'
      },
      config: fetchConfig
    });
    if (res.status === 200) {
      console.log(res.body.contents);
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
    // TODO: ビルド時のエラーはどう扱うのが正解? 迂闊に response を表示するとシークレットが漏洩する可能性もある.
    console.error(`getTest1Data error: ${err.name}`);
  }
  return {};
}
