import React from 'react';
import { render } from '@testing-library/react';
// https://stackoverflow.com/questions/56547215/react-testing-library-why-is-tobeinthedocument-not-a-function
import '@testing-library/jest-dom';
import DateUpdated from './DateUpdated';
import { blankPageData } from '../../types/pageTypes';
import PageContext from '../PageContext';

describe('Date', () => {
  test('renders formatted datetime from pageData.updated', () => {
    const pageData = blankPageData();
    pageData.updated = '2020-12-26T15:29:14.476Z';
    const { container, getByText } = render(
      <PageContext.Provider value={pageData}>
        <DateUpdated />
      </PageContext.Provider>
    );

    const formatted = getByText(/^2020-12-26$/);
    const icon = container.querySelector('svg');
    expect(formatted).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });
  test('renders formatted datetime from passed updated', () => {
    const { container, getByText } = render(
      <DateUpdated updated="2020-12-26T15:29:14.476Z" />
    );

    const formatted = getByText(/^2020-12-26$/);
    const icon = container.querySelector('svg');
    expect(formatted).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });
});
