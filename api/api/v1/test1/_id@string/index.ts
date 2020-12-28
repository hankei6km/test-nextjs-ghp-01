import { Test1Content } from '../../../../common';

export type Methods = {
  get: {
    query?: {
      draftKey?: string;
      fields?: string;
      depth?: number;
    };
    resBody: Test1Content;
  };
};
