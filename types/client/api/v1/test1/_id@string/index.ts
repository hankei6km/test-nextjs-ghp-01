import { PostsContent } from '../../../../contentTypes';
import { GetContentQuery } from '../../../../queryTypes';
import { mockMethods } from 'aspida-mock';
import { mockDataPosts } from '../../../../mockData';

export type Methods = {
  get: {
    query?: GetContentQuery;
    resBody: PostsContent;
  };
};

export default mockMethods<Methods>({
  get: ({ values }) => {
    const contents = mockDataPosts.contents;
    // stub 使いたいが、どの辺が production に残るかわからないので
    // とりあえずコードを書く.
    const idx = contents.findIndex(({ id }) => id === values.id);
    return idx >= 0
      ? {
          status: 200,
          resHeaders: {},
          resBody: contents[idx]
        }
      : {
          status: 404,
          resHeaders: {},
          resBody: {}
        };
  }
});
