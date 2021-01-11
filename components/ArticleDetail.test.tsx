import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RouterContext } from 'next/dist/next-server/lib/router-context';

import SectionContext, { sectionContextDefault } from './SectionContext';
import { mockRouter, mockImage } from '../test/testUtils';
import { mockDataArticles } from '../types/client/mockData';
import ArticleDetail from './ArticleDetail';

// https://stackoverflow.com/questions/40449434/mocking-globals-in-jest
const orgImage = global.Image;
afterEach(() => {
  global.Image = orgImage;
});

describe('ArticleDetail', () => {
  it('should renders ArticleDetails', async () => {
    const srcSetter = jest.fn();
    const srcValue = new Promise((resolve) => {
      srcSetter.mockImplementation((v) => {
        resolve(v);
      });
    });
    const addEventListener = jest.fn();
    global.Image = mockImage(srcSetter, addEventListener);

    await act(async () => {
      const router = mockRouter();
      const { container, getByText, getByRole, queryByText } = render(
        <RouterContext.Provider value={router}>
          <SectionContext.Provider value={sectionContextDefault}>
            <ArticleDetail data={mockDataArticles.contents[0]} />
          </SectionContext.Provider>
        </RouterContext.Provider>
      );
      const article = container.querySelector('article');
      expect(article).toBeInTheDocument();

      expect(container.querySelector('img')).toEqual(null);
      expect(queryByText(/^2020-12-27$/)).toEqual(null);
      const button = getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button.children[0].innerHTML).toEqual('read more');

      expect(await srcValue).toEqual(
        'https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/hankei6km-pages/media/my-starter-default-main-image.png?w=250&h=150&fit=crop'
      );

      addEventListener.mock.calls[0][1]();
      const img = getByRole('img');
      expect(img).toBeInTheDocument();
      expect(queryByText(/^2020-12-27$/)).toBeInTheDocument();
      const title = getByText(/^title3$/);
      expect(title).toBeInTheDocument();

      fireEvent.click(img);
      expect(router.push).toHaveBeenLastCalledWith(
        '/test1/[id]',
        '/test1/zzzzzzzzz',
        {
          locale: undefined,
          shallow: undefined
        }
      );
      fireEvent.click(title);
      expect(router.push).toHaveBeenLastCalledWith(
        '/test1/[id]',
        '/test1/zzzzzzzzz',
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
      const { container } = render(
        <RouterContext.Provider value={router}>
          <SectionContext.Provider
            value={{
              ...sectionContextDefault,
              component: {
                ...sectionContextDefault.component,
                articleDetailComponent: 'li',
                articleDetailTitleComponent: 'h5'
              }
            }}
          >
            <ArticleDetail data={mockDataArticles.contents[0]} />
          </SectionContext.Provider>
        </RouterContext.Provider>
      );
      const h5 = container.querySelector('h5');
      expect(h5).toBeInTheDocument();
      const li = container.querySelector('li');
      expect(li).toBeInTheDocument();
    });
  });
});
