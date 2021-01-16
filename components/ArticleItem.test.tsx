import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
// 'next-router-provider' の RouterContext をつかうと
// ./Link.tsx の useRouter が null になる.
// 上で import している RouterContext に createMockRouter のインスタンスだと
// 以下のエラーとる
//   console.error
// Error: Not implemented: window.scrollTo
// at module.exports (/sandbox/node_modules/jsdom/lib/jsdom/browser/not-implemented.js:9:17)
// import { RouterContext, createMockRouter } from 'next-router-provider';
import {
  mockRouter,
  mockImage,
  mockDataSectionArticleList
} from '../test/testUtils';

import SectionContext, { sectionContextDefault } from './SectionContext';
import ArticleItem from './ArticleItem';

// https://stackoverflow.com/questions/40449434/mocking-globals-in-jest
const orgImage = global.Image;
afterEach(() => {
  global.Image = orgImage;
});

describe('ArticleItem', () => {
  it('should renders ArticleItems', async () => {
    const srcSetter = jest.fn();
    const srcValue = new Promise<void>((resolve) => {
      srcSetter.mockImplementation((v) => {
        resolve(v);
      });
    });
    const addEventListener = jest.fn();
    global.Image = mockImage(srcSetter, addEventListener);

    await act(async () => {
      const router = mockRouter();
      const sectionArticleData = mockDataSectionArticleList[1]; // id: 'zzzzzzzzz'
      const { container, getByText, getByRole, queryByText } = render(
        <RouterContext.Provider value={router}>
          <SectionContext.Provider value={sectionContextDefault}>
            <ArticleItem data={sectionArticleData} />
          </SectionContext.Provider>
        </RouterContext.Provider>
      );
      const h3 = container.querySelector('h3');
      expect(h3).not.toBeInTheDocument();
      const article = container.querySelector('article');
      expect(article).not.toBeInTheDocument();

      expect(container.querySelector('img')).toEqual(null);
      expect(queryByText(/^2020-12-27$/)).toEqual(null);

      expect(await srcValue).toEqual(
        'https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/hankei6km-pages/media/my-starter-default-main-image.png?w=100&h=60&fit=crop'
      );
      // expect(srcSetter).toHaveBeenLastCalledWith(
      //   'https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/hankei6km-pages/media/my-starter-default-main-image.png?w=100&h=60&fit=crop'
      // );

      addEventListener.mock.calls[0][1]();
      const img = getByRole('img');
      expect(img).toBeInTheDocument();
      const updated = queryByText(/^2020-12-27$/);
      expect(updated).toBeInTheDocument();
      const title = getByText(/^title3$/);
      expect(title).toBeInTheDocument();

      fireEvent.click(img);
      expect(router.push).toHaveBeenCalledTimes(1);
      expect(router.push).toHaveBeenLastCalledWith(
        '/posts/[id]',
        '/posts/zzzzzzzzz',
        {
          locale: undefined,
          shallow: undefined
        }
      );

      fireEvent.click(title);
      expect(router.push).toHaveBeenCalledTimes(2);
      expect(router.push).toHaveBeenLastCalledWith(
        '/posts/[id]',
        '/posts/zzzzzzzzz',
        {
          locale: undefined,
          shallow: undefined
        }
      );
    });
  });

  it('should renders with specify components', async () => {
    global.Image = mockImage();

    await act(async () => {
      const router = mockRouter();
      const sectionArticleData = mockDataSectionArticleList[1]; // id: 'zzzzzzzzz'
      const { container } = render(
        <RouterContext.Provider value={router}>
          <SectionContext.Provider
            value={{
              ...sectionContextDefault,
              component: {
                ...sectionContextDefault.component,
                articleItemComponent: 'article',
                articleItemTitleComponent: 'h3'
              }
            }}
          >
            <ArticleItem data={sectionArticleData} />
          </SectionContext.Provider>
        </RouterContext.Provider>
      );
      const h3 = container.querySelector('h3');
      expect(h3).toBeInTheDocument();
      const article = container.querySelector('article');
      expect(article).toBeInTheDocument();
    });
  });
});
