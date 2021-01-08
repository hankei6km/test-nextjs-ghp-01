import { mockMethods } from 'aspida-mock';
import { ArticleList, ArticleIds } from '../../../contentTypes';
import { GetIdsQuery, GetPostsItemQuery } from '../../../queryTypes';
import { mockDataArticles } from '../../../mockData';

export type Methods = {
  get: {
    resBody: ArticleList;
    polymorph: [
      {
        query: GetIdsQuery;
        resBody: ArticleIds;
      },
      {
        query: GetPostsItemQuery;
        resBody: ArticleList;
      }
    ];
  };
};

// mock も production のコードに残る?
// polymoprh 用のデータは middleware に記述
export default mockMethods<Methods>({
  get: () => ({
    status: 200,
    resHeaders: {},
    resBody: mockDataArticles
  })
});
