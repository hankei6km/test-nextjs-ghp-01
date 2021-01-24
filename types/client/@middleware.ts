import { mockMiddleware } from 'aspida-mock';
import {
  mockDataPagesIds,
  mockDataPagesList,
  mockDataArticleIds,
  mockDataArticleList,
  mockDataPagesOuterHome,
  mockDataPagesOuterBlog,
  mockDataPagesOuterPosts,
  mockDataCategoryIds,
  mockDataCategoryList
} from './mockData';
import { mockDataPagesOuterCategory } from '../../test/testMockData';

// polymorph 対応
export default mockMiddleware([
  (req, res, next) =>
    req.path === '/api/v1/pages' &&
    req.method === 'GET' &&
    req.query?.ids === '_global,home'
      ? res({
          status: 200,
          resBody: mockDataPagesOuterHome
        })
      : next(),
  (req, res, next) =>
    req.path === '/api/v1/pages' &&
    req.method === 'GET' &&
    req.query?.ids === '_global,blog'
      ? res({
          status: 200,
          resBody: mockDataPagesOuterBlog
        })
      : next(),
  (req, res, next) =>
    req.path === '/api/v1/pages' &&
    req.method === 'GET' &&
    req.query?.ids === '_global,blog-posts'
      ? res({
          status: 200,
          resBody: mockDataPagesOuterPosts
        })
      : next(),
  (req, res, next) =>
    req.path === '/api/v1/pages' &&
    req.method === 'GET' &&
    req.query?.ids === '_global,blog-category'
      ? res({
          status: 200,
          resBody: mockDataPagesOuterCategory
        })
      : next(),
  (req, res, next) =>
    req.path === '/api/v1/pages' &&
    req.method === 'GET' &&
    req.query?.fields === 'id'
      ? res({
          status: 200,
          resBody: mockDataPagesIds
        })
      : next(),
  (req, res, next) =>
    req.path === '/api/v1/pages' &&
    req.method === 'GET' &&
    req.query?.fields ===
      'id,createdAt,updatedAt,publishedAt,revisedAt,title,category.id,category.title'
      ? res({
          status: 200,
          resBody: mockDataPagesList
        })
      : next(),
  (req, res, next) =>
    req.path === '/api/v1/posts' &&
    req.method === 'GET' &&
    req.query?.fields === 'id'
      ? res({
          status: 200,
          resBody: mockDataArticleIds
        })
      : next(),
  (req, res, next) => {
    if (
      req.path === '/api/v1/posts' &&
      req.method === 'GET' &&
      req.query?.fields ===
        'id,createdAt,updatedAt,publishedAt,revisedAt,title,category.id,category.title'
    ) {
      const m = (req.query.filters || '').match(/category\[contains\](.+)$/);
      if (m) {
        res({
          status: 200,
          resBody: {
            ...mockDataArticleList,
            contents: mockDataArticleList.contents.filter(({ category }) =>
              category.some(({ id }) => id === m[1])
            )
          }
        });
        return;
      } else {
        res({ status: 200, resBody: mockDataArticleList });
        return;
      }
    }
    next();
  },
  // category でリスト系は実行されないはずだが、とりあえず
  (req, res, next) =>
    req.path === '/api/v1/category' &&
    req.method === 'GET' &&
    req.query?.fields === 'id'
      ? res({
          status: 200,
          resBody: mockDataCategoryIds
        })
      : next(),
  (req, res, next) =>
    req.path === '/api/v1/category' &&
    req.method === 'GET' &&
    req.query?.fields ===
      'id,createdAt,updatedAt,publishedAt,revisedAt,title,category.id,category.title'
      ? res({
          status: 200,
          resBody: mockDataCategoryList
        })
      : next()
]);
