import React from 'react';
import { render, fireEvent } from '@testing-library/react';
// https://stackoverflow.com/questions/56547215/react-testing-library-why-is-tobeinthedocument-not-a-function
import '@testing-library/jest-dom';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import { mockRouter } from '../../test/testUtils';
import SiteLogo from './SiteLogo';

describe('SiteLogo', () => {
  test('renders site logo', () => {
    const { getByRole, queryByRole } = render(<SiteLogo size="" />);
    const siteLogo = getByRole('img');
    expect(siteLogo).toBeInTheDocument();
    expect(siteLogo.getAttribute('alt')).toEqual('My Starter logo');
    expect(siteLogo.getAttribute('src')).toMatch(
      'my-starter-default-sitelogo1.png?w=80&h=80'
    );
    const a = queryByRole('link');
    expect(a).not.toBeInTheDocument();
  });
  test('renders site logo small', () => {
    const { getByRole } = render(<SiteLogo size="small" />);
    const siteLogo = getByRole('img');
    expect(siteLogo.getAttribute('src')).toMatch(
      'my-starter-default-sitelogo1.png?w=50&h=50'
    );
  });
  test('renders site logo with link', () => {
    const router = mockRouter();
    const { getByRole } = render(
      <RouterContext.Provider value={router}>
        <SiteLogo link="/site" />
      </RouterContext.Provider>
    );
    const a = getByRole('link');
    expect(a).toBeInTheDocument();
    expect(a.getAttribute('href')).toEqual('/site');
    fireEvent.click(a);
    expect(router.push).toHaveBeenCalledWith('/site', '/site', {
      locale: undefined,
      shallow: undefined
    });
  });
});
