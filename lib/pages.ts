import { ParsedUrlQuery } from 'querystring';
import { GetStaticPropsContext } from 'next';
import client, { fetchConfig, ApiNameArticle } from './client';
import {
  PagesList,
  PagesIds,
  PagesContent,
  blankPagesList,
  blankPageContent
} from '../types/client/contentTypes';
import { GetQuery } from '../types/client/queryTypes';
import { PageData, blankPageData } from '../types/pageTypes';
import {
  getSectionFromPages,
  getPagePostsTotalCountFromSection
} from './section';
import {
  pageCountFromTotalCount,
  paginationIdsFromPageCount
} from '../utils/pagination';

const globalPageId = '_global';
// id が 1件で 40byte  と想定、 content-length が 5M 程度とのことなので、1000*1000*5 / 40 で余裕を見て決めた値。
const allIdsLimit = 120000;
// const itemsPerPage = 10;

export type PageDataGetOptions = {
  // posts などの場合で、共通の top 等を持つ page を指定指定する (id. blog-post など)
  outerIds: string[];
  // ページの主題となる一覧を取得する場合に指定(ブログページで posps API を指定するなど)
  // コンテンツ側からは congtentPageArticles として指定する。
  // カテゴリは下記の curCategory が使われる.
  articlesApi?: ApiNameArticle;
  // route 上で選択されているカテゴリ(page 内の category[] のうちの１つになるはず).
  curCategory?: string;
  // ページング用j
  itemsPerPage?: number;
  pageNo?: number;
};

export async function getSortedPagesData(
  apiName: ApiNameArticle,
  query: GetQuery = {}
): Promise<PagesList> {
  try {
    const res = await client[apiName].get({
      query: {
        ...query,
        fields:
          'id,createdAt,updatedAt,publishedAt,revisedAt,title,category.id,category.title'
      },
      config: fetchConfig
    });
    return res.body;
  } catch (err) {
    // res.status = 404 などでも throw される(試した限りでは)
    // res.status を知る方法は?
    console.error(`getSortedPagesData error: ${err.name}`);
  }
  return blankPagesList();
}

export async function getPagesIdsList(
  apiName: ApiNameArticle,
  query: GetQuery = {}
): Promise<PagesIds> {
  try {
    const res = await client[apiName].get({
      query: {
        ...query,
        fields: 'id'
      },
      config: fetchConfig
    });
    return res.body;
  } catch (err) {
    console.error(`getPagesIdsList error: ${err.name}`);
  }
  return blankPagesList();
}

export async function getAllPagesIds(
  apiName: ApiNameArticle,
  query: GetQuery = {}
) {
  try {
    return (
      await getPagesIdsList(apiName, {
        ...query,

        limit: allIdsLimit
      })
    ).contents.map(({ id }) => id);
  } catch (err) {
    console.error(`getAllPagesIds error: ${err.name}`);
  }
  return [];
}

export async function getAllPaginationIds(
  apiName: ApiNameArticle,
  itemsPerPage: number,
  pagePath: string[] = [],
  query: GetQuery = {}
): Promise<string[][]> {
  try {
    const idsList = await getPagesIdsList(apiName, { ...query, limit: 0 });
    return paginationIdsFromPageCount(
      pageCountFromTotalCount(idsList.totalCount, itemsPerPage),
      pagePath
    );
  } catch (err) {
    console.error(`getAllPagesIdsPageCount error: ${err.name}`);
  }
  return [];
}

export async function getAllCategolizedPaginationIds(
  apiName: ApiNameArticle,
  category: string[],
  itemsPerPage: number,
  pagePath: string[] = ['page'],
  query: GetQuery = {}
) {
  try {
    let ret: string[][] = category.map((cat) => [cat]);
    // Promis.all だと、各カテゴリの ids をすべて保持しておく瞬間があるのでやめておく.
    // totalCount を使うようにしたので、上記の制約はないが、とりあえずそのまま
    const categoryLen = category.length;
    for (let idx = 0; idx < categoryLen; idx++) {
      const cat = category[idx];
      const ids = await getAllPaginationIds(apiName, itemsPerPage, pagePath, {
        ...query,
        filters: `category[contains]${cat}`
      });
      ret = ret.concat(ids.map((id) => [cat, ...id]));
    }
    return ret;
  } catch (err) {
    console.error(`getAllPagesIdsPageCount error: ${err.name}`);
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
      const ids =
        // TODO: id='' のテスト
        params.id !== ''
          ? [globalPageId].concat(outerIds, params.id).join(',')
          : [globalPageId].concat(outerIds).join(',');
      const res = await client[apiName].get({
        query: {
          ids: ids,
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
    if (params.id !== '') {
      return res.body.contents.concat(
        await getPagesData(apiName, {
          params
        })
      );
    }
    return res.body.contents;
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
  options: PageDataGetOptions = {
    outerIds: [],
    itemsPerPage: 10
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
      options
    );
    const pageData: PageData = {
      id: rawPageDatas[0].id,
      updated: rawPageDatas[0].revisedAt || rawPageDatas[0].updatedAt,
      title: rawPageDatas[0].title,
      pageNo: options.pageNo !== undefined ? options.pageNo : 1,
      pageCount: -1, // あとで設定する
      description: rawPageDatas[0].description || '',
      mainImage: '',
      allCategory: [],
      category: [],
      curCategory: options.curCategory || '',
      header: await getSectionFromPages(
        rawPageDatas[0],
        'sectionHeader',
        options
      ),
      top: await getSectionFromPages(rawPageDatas[0], 'sectionTop', options),
      sections: await getSectionFromPages(
        rawPageDatas[0],
        'sectionContent',
        options
      ),
      bottom: await getSectionFromPages(
        rawPageDatas[0],
        'sectionBottom',
        options
      ),
      footer: await getSectionFromPages(
        rawPageDatas[0],
        'sectionFooter',
        options
      )
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
      const header = await getSectionFromPages(
        rawPageData,
        'sectionHeader',
        options
      );
      pageData.header = header.length > 0 ? header : pageData.header;
      const top = await getSectionFromPages(rawPageData, 'sectionTop', options);
      pageData.top = top.length > 0 ? top : pageData.top;
      const sections = await getSectionFromPages(
        rawPageData,
        'sectionContent',
        options
      );
      pageData.sections = sections.length > 0 ? sections : pageData.sections;
      const bottom = await getSectionFromPages(
        rawPageData,
        'sectionBottom',
        options
      );
      pageData.bottom = bottom.length > 0 ? bottom : pageData.bottom;
      const footer = await getSectionFromPages(
        rawPageData,
        'sectionFooter',
        options
      );
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
    pageData.pageCount =
      options.itemsPerPage !== undefined
        ? pageCountFromTotalCount(
            getPagePostsTotalCountFromSection(pageData.sections),
            options.itemsPerPage
          )
        : -1;
    return pageData;
  } catch (err) {
    console.error(`getPagesPageData error: ${err.name}`);
  }
  return blankPageData();
}
