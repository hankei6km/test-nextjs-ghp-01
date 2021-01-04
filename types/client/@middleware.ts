import { mockMiddleware } from 'aspida-mock';
import { mockDataTest1 } from './mockData';

// polymorph 対応
export default mockMiddleware([
  (req, res, next) =>
    req.path === '/api/v1/test1' &&
    req.method === 'GET' &&
    req.query?.fields === 'id'
      ? res({
          status: 200,
          resBody: {
            ...mockDataTest1,
            contents: mockDataTest1.contents.map(({ id }) => ({
              id
            }))
          }
        })
      : next(),
  (req, res, next) =>
    req.path === '/api/v1/test1' &&
    req.method === 'GET' &&
    req.query?.fields === 'id,createdAt,updatedAt,publishedAt,revisedAt,title'
      ? res({
          status: 200,
          resBody: {
            ...mockDataTest1,
            contents: mockDataTest1.contents.map(
              ({
                id,
                createdAt,
                updatedAt,
                publishedAt,
                revisedAt,
                title
              }) => ({
                id,
                createdAt,
                updatedAt,
                publishedAt,
                revisedAt,
                title
              })
            )
          }
        })
      : next()
]);
