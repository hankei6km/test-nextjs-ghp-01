import { mockMethods } from 'aspida-mock';
import { PostsList, PostsIds } from '../../../contentTypes';
import { GetIdsQuery, GetPostsItemQuery } from '../../../queryTypes';
import { mockDataPosts } from '../../../mockData';

export type Methods = {
  get: {
    resBody: PostsList;
    polymorph: [
      {
        query: GetIdsQuery;
        resBody: PostsIds;
      },
      {
        query: GetPostsItemQuery;
        resBody: PostsList;
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
    resBody: mockDataPosts
  })
});
