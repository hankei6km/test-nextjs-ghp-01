import { NextRouter } from 'next/router';
import { mockDataArticleList } from './testMockData';
// import { CreateMockRouterOptions } from 'next-router-provider';

export const mockDataSectionArticleList = mockDataArticleList.contents.map(
  (content) => ({
    ...content,
    path: '/posts'
  })
);

export function mockRouter(): NextRouter {
  // https://github.com/vercel/next.js/issues/16864
  return {
    basePath: '',
    pathname: '/',
    route: '/',
    asPath: '/',
    query: {},
    // push: jest.fn(),
    push: jest.fn().mockImplementation(() => Promise.resolve()),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined), // This one fixed it for me
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn()
    },
    isFallback: false
  };
}

export function mockImage(srcSetter = jest.fn(), addEventListener = jest.fn()) {
  const orgImage = global.Image;
  return jest.fn().mockImplementation((w: number, h: number) => {
    const image = new orgImage(w, h);
    Object.defineProperty(image, 'src', {
      set: srcSetter,
      get: () => undefined
    });
    image.addEventListener = addEventListener;
    return image;
  });
}
