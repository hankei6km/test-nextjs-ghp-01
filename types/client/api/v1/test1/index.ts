import { mockMethods } from 'aspida-mock';
import { Test1List, Test1Ids } from '../../../contentTypes';
import { GetIdsQuery, GetTest1ItemQuery } from '../../../queryTypes';
import { mockDataTest1 } from '../../../mockData';

export type Methods = {
  get: {
    resBody: Test1List;
    polymorph: [
      {
        query: GetIdsQuery;
        resBody: Test1Ids;
      },
      {
        query: GetTest1ItemQuery;
        resBody: Test1List;
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
    resBody: mockDataTest1
  })
});
