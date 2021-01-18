import React from 'react';
import { render, fireEvent } from '@testing-library/react';
// https://stackoverflow.com/questions/56547215/react-testing-library-why-is-tobeinthedocument-not-a-function
import '@testing-library/jest-dom';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import { mockRouter } from '../../test/testUtils';
import PageContext from '../../components/PageContext';
import PageTitle from './PageTitle';
import { blankPageData } from '../../types/pageTypes';

describe('PageTitle', () => {
  test('renders site title', () => {
    const pageData = blankPageData();
    pageData.title = 'page1';
    const { getByText, queryByRole } = render(
      <PageContext.Provider value={pageData}>
        <PageTitle />
      </PageContext.Provider>
    );
    const pageTitle = getByText('page1');
    expect(pageTitle).toBeInTheDocument();
    const a = queryByRole('link');
    expect(a).not.toBeInTheDocument();
  });
  test('renders site title with link', () => {
    const router = mockRouter();
    const pageData = blankPageData();
    pageData.title = 'page1';
    const { getByRole } = render(
      <RouterContext.Provider value={router}>
        <PageContext.Provider value={pageData}>
          <PageTitle link="/page1" />
        </PageContext.Provider>
      </RouterContext.Provider>
    );
    const a = getByRole('link');
    expect(a).toBeInTheDocument();
    expect(a.getAttribute('href')).toEqual('/page1');
    fireEvent.click(a);
    expect(router.push).toHaveBeenCalledWith('/page1', '/page1', {
      locale: undefined,
      shallow: undefined
    });
  });
});
