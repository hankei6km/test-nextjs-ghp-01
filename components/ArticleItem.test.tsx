import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import { mockRouter, mockImage } from '../test/testUtils';

import { mockDataArticles } from '../types/client/mockData';
import ArticleItem from './ArticleItem';

// https://stackoverflow.com/questions/40449434/mocking-globals-in-jest
const orgImage = global.Image;
afterEach(() => {
  global.Image = orgImage;
});

describe('ArticleItem', () => {
  it('should renders ArticleItems', async () => {
    const srcSetter = jest.fn();
    const addEventListener = jest.fn();
    global.Image = mockImage(srcSetter, addEventListener);

    await act(async () => {
      const router = mockRouter();
      const { container, getByText, getByRole, queryByText } = render(
        <RouterContext.Provider value={router}>
          <ArticleItem data={mockDataArticles.contents[0]} />
        </RouterContext.Provider>
      );
      const img = container.querySelector('img');
      expect(img).toEqual(null);
      const updated = queryByText(/^2020-12-27$/);
      expect(updated).toEqual(null);

      await new Promise((resolve) => {
        setTimeout(() => {
          expect(srcSetter).toHaveBeenLastCalledWith(
            'https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/hankei6km-pages/media/my-starter-default-main-image.png?w=100&h=60&fit=crop'
          );

          addEventListener.mock.calls[0][1]();
          const img = getByRole('img');
          expect(img).toBeInTheDocument();
          const updated = queryByText(/^2020-12-27$/);
          expect(updated).toBeInTheDocument();
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
          resolve();
        }, 10);
      });
    });
  });
});
