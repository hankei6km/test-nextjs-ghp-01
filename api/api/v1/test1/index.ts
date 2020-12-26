import { Test1List } from '../../../common';

export type Methods = {
  get: {
    query?: {
      draftKey?: string;
      limit?: number;
      offset?: number;
      orders?: string;
      q?: string;
      fields?: string; //  ('id'|'title'|...)[] のようにしてパラメーターのシリアライズを手動とかでないと正しくないフィールド名を弾けない、かな?
      ids?: string;
      filters?: string;
      depth?: number;
    };
    resBody: Test1List;
  };
};
