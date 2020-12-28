import { Test1List, Test1Ids } from '../../../contentTypes';
import { GetIdsQuery, GetTest1ItemQuery } from '../../../queryTypes';

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
