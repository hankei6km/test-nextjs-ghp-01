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

//  mock から polymorph を扱う方法が不明だったのでとりあえず.
// mockMethods の return に polymorph を含めるても作用しなかった.
type MockMethods = {
  get: {
    query: GetTest1ItemQuery | GetIdsQuery;
    resBody: Test1List | Test1Ids;
  };
};

// mock も production のコードに残る?
export default mockMethods<MockMethods>({
  get: ({ query }) => {
    const mockDataTest1Ids = {
      ...mockDataTest1,
      contents: mockDataTest1.contents.map(({ id }) => ({ id }))
    };
    const mockDataTest1List = {
      ...mockDataTest1,
      contents: mockDataTest1.contents.map((v) => ({
        ...v,
        content: undefined
      }))
    };

    return {
      status: 200,
      resHeaders: {},
      resBody: (() => {
        switch (query.fields) {
          case 'id':
            return mockDataTest1Ids;
          case 'id,createdAt,updatedAt,publishedAt,revisedAt,title':
            return mockDataTest1List;
        }
        return mockDataTest1;
      })()
    };
  }
});
