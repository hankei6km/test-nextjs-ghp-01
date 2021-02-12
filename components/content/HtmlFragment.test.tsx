import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import HtmlFragment from './HtmlFragment';

describe('HtmlFragment', () => {
  it('renders html fragment', () => {
    {
      const { getByText } = render(
        <HtmlFragment
          htmlChildren={[
            { tagName: 'div', style: {}, attrib: {}, html: 'test' }
          ]}
        />
      );
      expect(getByText('test')).toBeInTheDocument();
    }
    {
      const { getByText } = render(
        <HtmlFragment
          htmlChildren={[
            {
              tagName: 'div',
              style: {},
              attrib: {},
              html: '<div>test1</div><div>test2</div>'
            }
          ]}
        />
      );
      expect(getByText('test1')).toBeInTheDocument();
      expect(getByText('test2')).toBeInTheDocument();
    }
  });
  it('renders html fragment with style', () => {
    const { container } = render(
      <HtmlFragment
        htmlChildren={[
          { tagName: 'div', style: { width: '100%' }, attrib: {}, html: 'test' }
        ]}
      />
    );
    expect(
      container.querySelector('div[style="width: 100%;"]')
    ).toBeInTheDocument();
  });
  it('renders html fragment with attr', () => {
    const { container } = render(
      <HtmlFragment
        htmlChildren={[
          {
            tagName: 'div',
            style: {},
            attribs: { display: 'flex' },
            html: '<div>test1</div><div>test2</div>'
          }
        ]}
      />
    );
    expect(container.querySelector('div[display="flex"]')).toBeInTheDocument();
  });
  it('renders html fragments', () => {
    const { container } = render(
      <HtmlFragment
        htmlChildren={[
          {
            tagName: 'div',
            style: {},
            attribs: {},
            html: '<p>test1</p>'
          },
          {
            tagName: 'div',
            style: {},
            attribs: {},
            html: '<span>test2</span>'
          }
        ]}
      />
    );
    expect(container.querySelector('div > p').textContent).toEqual('test1');
    expect(container.querySelector('div > span').textContent).toEqual('test2');
  });
});
