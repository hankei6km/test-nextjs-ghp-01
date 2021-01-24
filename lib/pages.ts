import { ParsedUrlQuery } from 'querystring';
import { GetStaticPropsContext } from 'next';
import client, { fetchConfig, ApiNameArticle } from './client';
import { PagesContent, blankPageContent } from '../types/client/contentTypes';
import { GetQuery } from '../types/client/queryTypes';
import { PageData, blankPageData } from '../types/pageTypes';
import { getSectionFromPages } from './section';

const globalPageId = '_global';

export async function getSortedPagesData(
  apiName: ApiNameArticle,
  query: GetQuery = {}
) {
  try {
    const res = await client[apiName].get({
      query: {
        ...query,
        fields:
          'id,createdAt,updatedAt,publishedAt,revisedAt,title,category.id,category.title'
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
    return res.body.contents.map(({ id }) => id);
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
          draftKey: !preview ? '' : previewData.draftKey,
          fields:
            'id,createdAt,updatedAt,publishedAt,revisedAt,title,kind,description,mainImage,category.id,category.title,sections'
        },
        config: fetchConfig
      });
    return res;
  } catch (err) {
    console.error(`getPagesData error: ${err.name}`);
  }
  return blankPageContent();
}

// ページングされる API 名など、pages の項目側で固定できないような API 名をマップする.
// 項目側では %articles のように % を付加して指定する
export type MapApiNameArticle = {
  articles: ApiNameArticle;
};
export type PageDataGetOptions = {
  // posts などの場合で、共通の top 等を持つ page を指定指定する (id. blog-post など)
  outerIds: string[];
  // ページングされる API 名など、pages の項目側で固定できないような API 名をマップする
  mapApiNameArticle?: MapApiNameArticle;
  // ページングの pageNo
  pageNo?: number;
};

export async function getPagesDataWithOuter(
  apiName: ApiNameArticle,
  {
    params = { id: '' }
  }: // preview = false,
  // previewData = {}
  GetStaticPropsContext<ParsedUrlQuery>,
  { outerIds = [] }: PageDataGetOptions = {
    outerIds: []
  }
): Promise<PagesContent[]> {
  try {
    // TODO: preview 対応
    if (apiName === 'pages') {
      const res = await client[apiName].get({
        query: {
          ids: [globalPageId].concat(outerIds, params.id).join(','),
          fields:
            'id,createdAt,updatedAt,publishedAt,revisedAt,title,kind,description,mainImage,category.id,category.title,sections'
        },
        config: fetchConfig
      });
      return res.body.contents;
    }
    const res = await client['pages'].get({
      query: {
        ids: [globalPageId].concat(outerIds).join(','),
        fields:
          'id,createdAt,updatedAt,publishedAt,revisedAt,title,kind,description,mainImage,category.id,category.title,sections'
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

export async function getPagesPageData(
  apiName: ApiNameArticle,
  {
    params = { id: '' },
    preview = false,
    previewData = {}
  }: GetStaticPropsContext<ParsedUrlQuery>,
  { outerIds = [], mapApiNameArticle, pageNo = 0 }: PageDataGetOptions = {
    outerIds: []
  }
): Promise<PageData> {
  try {
    const rawPageDatas = await getPagesDataWithOuter(
      apiName,
      {
        params,
        preview,
        previewData
      },
      { outerIds, mapApiNameArticle, pageNo }
    );
    const pageData: PageData = {
      id: rawPageDatas[0].id,
      updated: rawPageDatas[0].revisedAt || rawPageDatas[0].updatedAt,
      title: rawPageDatas[0].title,
      description: rawPageDatas[0].description || '',
      mainImage: '',
      allCategory: [],
      category: [],
      header: await getSectionFromPages(rawPageDatas[0], 'sectionHeader', {
        outerIds,
        mapApiNameArticle,
        pageNo
      }),
      top: await getSectionFromPages(rawPageDatas[0], 'sectionTop', {
        outerIds,
        mapApiNameArticle,
        pageNo
      }),
      sections: await getSectionFromPages(rawPageDatas[0], 'sectionContent', {
        outerIds,
        mapApiNameArticle,
        pageNo
      }),
      bottom: await getSectionFromPages(rawPageDatas[0], 'sectionBottom', {
        outerIds,
        mapApiNameArticle,
        pageNo
      }),
      footer: await getSectionFromPages(rawPageDatas[0], 'sectionFooter', {
        outerIds,
        mapApiNameArticle,
        pageNo
      })
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
      pageData.allCategory = [];
      pageData.category = [];
      const header = await getSectionFromPages(rawPageData, 'sectionHeader', {
        outerIds,
        mapApiNameArticle,
        pageNo
      });
      pageData.header = header.length > 0 ? header : pageData.header;
      const top = await getSectionFromPages(rawPageData, 'sectionTop', {
        outerIds,
        mapApiNameArticle,
        pageNo
      });
      pageData.top = top.length > 0 ? top : pageData.top;
      const sections = await getSectionFromPages(
        rawPageData,
        'sectionContent',
        { outerIds, mapApiNameArticle, pageNo }
      );
      pageData.sections = sections.length > 0 ? sections : pageData.sections;
      const bottom = await getSectionFromPages(rawPageData, 'sectionBottom', {
        outerIds,
        mapApiNameArticle,
        pageNo
      });
      pageData.bottom = bottom.length > 0 ? bottom : pageData.bottom;
      const footer = await getSectionFromPages(rawPageData, 'sectionFooter', {
        outerIds,
        mapApiNameArticle,
        pageNo
      });
      pageData.footer = footer.length > 0 ? footer : pageData.footer;
    }
    switch (apiName) {
      case 'pages':
        if (rawPageDataLen > 1) {
          // pages の場合 glogab,id のみのはずだが念のため
          pageData.allCategory = rawPageDatas[rawPageDataLen - 1].category;
        }
        break;
      case 'category':
        // category は allCategory のみ
        // ( allCategory 自身のページにも定義できるが、outer からとってくる)
        if (rawPageDataLen > 2) {
          pageData.allCategory = rawPageDatas[rawPageDataLen - 2].category;
        }
        break;
      default:
        // pages 意外では通常のカテゴリーとして扱う.
        // TODO: allCategory でフィルター.
        if (rawPageDataLen > 1) {
          if (rawPageDataLen > 2) {
            pageData.allCategory = rawPageDatas[rawPageDataLen - 2].category;
          }
          pageData.category = rawPageDatas[rawPageDataLen - 1].category;
        }
    }
    return pageData;
  } catch (err) {
    console.error(`getPagesPageData error: ${err.name}`);
  }
  return blankPageData();
}
