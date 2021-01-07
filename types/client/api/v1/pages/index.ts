import { mockMethods } from 'aspida-mock';
import { PagesList, PagesIds } from '../../../contentTypes';
import { GetIdsQuery, GetPagesItemQuery } from '../../../queryTypes';
import { mockDataPages } from '../../../mockData';

export type Methods = {
  get: {
    resBody: PagesList;
    polymorph: [
      {
        query: GetIdsQuery;
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
  get: () => ({
    status: 200,
    resHeaders: {},
    resBody: mockDataPages
  })
});
