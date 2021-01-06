import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import { mockRouter, mockImage } from '../test/testUtils';

import { mockDataTest1 } from '../types/client/mockData';
import ListDetail from './ListDetail';

// https://stackoverflow.com/questions/40449434/mocking-globals-in-jest
const orgImage = global.Image;
afterEach(() => {
  global.Image = orgImage;
});

describe('ListItem', () => {
  it('should renders ListItems', async () => {
    const srcSetter = jest.fn();
    const addEventListener = jest.fn();
    global.Image = mockImage(srcSetter, addEventListener);

    await act(async () => {
      const router = mockRouter();
      const { container, getByText, getByRole, queryByText } = render(
        <RouterContext.Provider value={router}>
          <ListDetail data={mockDataTest1.contents[0]} />
        </RouterContext.Provider>
      );
      const img = container.querySelector('img');
      expect(img).toEqual(null);
      const updated = queryByText(/^2020-12-27$/);
      expect(updated).toEqual(null);
      const button = getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button.children[0].innerHTML).toEqual('read more');

      fireEvent.click(button);
      expect(router.push).toHaveBeenLastCalledWith(
        '/test1/[id]',
        '/test1/zzzzzzzzz',
        {
          locale: undefined,
          shallow: undefined
        }
      );

      await new Promise((resolve) => {
        setTimeout(() => {
          expect(srcSetter).toHaveBeenLastCalledWith(
            'https://images.microcms-assets.io/protected/ap-northeast-1:9063452c-019d-4ffe-a96f-1a4524853eda/service/hankei6km-pages/media/my-starter-default-main-image.png?w=250&h=150&fit=crop'
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
