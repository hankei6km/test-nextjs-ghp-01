import React from 'react';
import { render, fireEvent } from '@testing-library/react';
// https://stackoverflow.com/questions/56547215/react-testing-library-why-is-tobeinthedocument-not-a-function
import '@testing-library/jest-dom';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import { mockRouter } from '../../test/testUtils';
import SiteTitle from './SiteTitle';

describe('SiteTitle', () => {
  test('renders site title', () => {
    const { getByText, queryByRole } = render(<SiteTitle />);
    const siteTitle = getByText('My Starter');
    expect(siteTitle).toBeInTheDocument();
    const a = queryByRole('link');
    expect(a).not.toBeInTheDocument();
  });
  test('renders site title with link', () => {
    const router = mockRouter();
    const { getByRole } = render(
      <RouterContext.Provider value={router}>
        <SiteTitle link="/site" />
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
