import { mockMiddleware } from 'aspida-mock';
import {
  mockDataPagesIds,
  mockDataPagesList,
  mockDataArticleIds,
  mockDataArticleList,
  mockDataPagesOuterHome,
  mockDataPagesOuterBlog
} from './mockData';

// polymorph 対応
export default mockMiddleware([
  (req, res, next) =>
    req.path === '/api/v1/pages' &&
    req.method === 'GET' &&
    req.query?.ids === '_layout,home'
      ? res({
          status: 200,
          resBody: mockDataPagesOuterHome
        })
      : next(),
  (req, res, next) =>
    req.path === '/api/v1/pages' &&
    req.method === 'GET' &&
    req.query?.ids === '_layout,blog'
      ? res({
          status: 200,
          resBody: mockDataPagesOuterBlog
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
    req.query?.fields === 'id,createdAt,updatedAt,publishedAt,revisedAt,title'
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
  (req, res, next) =>
    req.path === '/api/v1/posts' &&
    req.method === 'GET' &&
    req.query?.fields === 'id,createdAt,updatedAt,publishedAt,revisedAt,title'
      ? res({
          status: 200,
          resBody: mockDataArticleList
        })
      : next()
]);
