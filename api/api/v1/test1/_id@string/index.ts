import { Test1Content } from '../../../../contentTypes';
import { GetContentQuery } from '../../../../queryTypes';

export type Methods = {
  get: {
    query?: GetContentQuery;
    resBody: Test1Content;
  };
};
