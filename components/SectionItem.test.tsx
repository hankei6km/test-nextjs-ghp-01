import React from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import {
  mockRouter,
  mockImage,
  mockDataSectionArticleList
} from '../test/testUtils';

import SectionItem from './SectionItem';

// https://stackoverflow.com/questions/40449434/mocking-globals-in-jest
const orgImage = global.Image;
afterEach(() => {
  global.Image = orgImage;
});

describe('SectionItem', () => {
  it('should renders Section by List ', async () => {
    const addEventListener = jest.fn();
    global.Image = mockImage(jest.fn(), addEventListener);

    await act(async () => {
      const router = mockRouter();
      const { container } = render(
        <RouterContext.Provider value={router}>
          <SectionItem
            data={{
              title: 'posts',
              content: [
                {
                  kind: 'posts',
                  contents: mockDataSectionArticleList,
                  detail: true
                }
              ]
            }}
          />
        </RouterContext.Provider>
      );

      await new Promise<void>((resolve) => {
        setTimeout(() => {
          addEventListener.mock.calls.forEach((v) => {
            v[1]();
          });
          resolve();
        }, 10);
      });
      const titleOuter = container.querySelector(
        `[class*='ArticleDetail-root']`
      );
      expect(titleOuter).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });
  });
});
