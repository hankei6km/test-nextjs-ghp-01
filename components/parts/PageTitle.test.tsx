import React from 'react';
import { render, fireEvent } from '@testing-library/react';
// https://stackoverflow.com/questions/56547215/react-testing-library-why-is-tobeinthedocument-not-a-function
import '@testing-library/jest-dom';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import { mockRouter } from '../../test/testUtils';
import PageTitle from './PageTitle';

describe('PageTitle', () => {
  test('renders site title', () => {
    const { getByText, queryByRole } = render(<PageTitle title="page1" />);
    const pageTitle = getByText('page1');
    expect(pageTitle).toBeInTheDocument();
    const a = queryByRole('link');
    expect(a).not.toBeInTheDocument();
  });
  test('renders site title with link', () => {
    const router = mockRouter();
    const { getByRole } = render(
      <RouterContext.Provider value={router}>
        <PageTitle title="page1" link="/page1" />
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
