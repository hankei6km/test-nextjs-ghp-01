import { mockMethods } from 'aspida-mock';
import {
  PagesContents,
  PagesIdsContents,
  PagesList,
  PagesIds
} from '../../../contentTypes';
import {
  GetPagesItemsWithLayout,
  GetFieldsIdQuery,
  GetPagesItemQuery
} from '../../../queryTypes';
import { mockDataArticles } from '../../../mockData';

export type Methods = {
  get: {
    resBody: PagesContents;
    polymorph: [
      {
        query: GetPagesItemsWithLayout;
        resBody: PagesIdsContents;
      },
      {
        query: GetFieldsIdQuery;
        resBody: PagesIds;
      },
      {
        query: GetPagesItemQuery;
        resBody: PagesList;
      }
    ];
  };
};

// mock も production のコードに残る?
// polymoprh 用のデータは middleware に記述
export default mockMethods<Methods>({
  get: () => {
    // GetPagesItemsWithLayout はここで扱おうと思ったが、やめておく
    return {
      status: 200,
      resHeaders: {},
      resBody: mockDataArticles
    };
  }
});
