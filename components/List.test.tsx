import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import { mockRouter, mockImage } from '../test/testUtils';

import { mockDataTest1List } from '../types/client/mockData';
import List from './List';

// https://stackoverflow.com/questions/40449434/mocking-globals-in-jest
const orgImage = global.Image;
afterEach(() => {
  global.Image = orgImage;
});

describe('List', () => {
  it('should renders List', async () => {
    const addEventListener = jest.fn();
    global.Image = mockImage(jest.fn(), addEventListener);

    await act(async () => {
      const router = mockRouter();
      const { container } = render(
        <RouterContext.Provider value={router}>
          <List items={mockDataTest1List.contents} />
        </RouterContext.Provider>
      );

      await new Promise((resolve) => {
        setTimeout(() => {
          addEventListener.mock.calls.forEach((v) => {
            v[1]();
          });
          resolve();
        }, 10);
      });
      expect(container).toMatchSnapshot();
    });
  });
});
