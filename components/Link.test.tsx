import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NextRouter } from 'next/router';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import Button from '@material-ui/core/Button';

import Link from './Link';

function mockRouter(): NextRouter {
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

describe('Link', () => {
  it('renders link', () => {
    const router = mockRouter();
    const { getByRole } = render(
      <RouterContext.Provider value={router}>
        <Link href="/test1/[id]" as="/test1/xxxxxx">
          test
        </Link>
      </RouterContext.Provider>
    );
    const a = getByRole('link');
    expect(a).toBeInTheDocument();
    expect(a.getAttribute('href')).toEqual('/test1/xxxxxx');
    fireEvent.click(a);
    expect(router.push).toHaveBeenCalledWith('/test1/[id]', '/test1/xxxxxx', {
      locale: undefined,
      shallow: undefined
    });
  });
  it('works in another component', () => {
    const router = mockRouter();
    const { getByRole } = render(
      <RouterContext.Provider value={router}>
        <Button component={Link} href="/test1/[id]" as="/test1/xxxxxx">
          test
        </Button>
      </RouterContext.Provider>
    );
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(router.push).toHaveBeenCalledWith('/test1/[id]', '/test1/xxxxxx', {
      locale: undefined,
      shallow: undefined
    });
  });
});
