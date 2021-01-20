import { mockDataArticleList } from '../types/client/mockData';
import { FetchMock } from 'jest-fetch-mock';
import { getSectionFromPages } from './section';
import { PagesContent } from '../types/client/contentTypes';

// https://github.com/jefflau/jest-fetch-mock/issues/83
const fetchMock = fetch as FetchMock;
beforeEach(() => {
  fetchMock.resetMocks();
});

describe('getSectionFromPages()', () => {
  const mockBase: PagesContent = {
    id: 'home',
    createdAt: '2020-12-27T04:04:30.107Z',
    updatedAt: '2020-12-27T04:04:30.107Z',
    publishedAt: '2020-12-27T04:04:30.107Z',
    revisedAt: '2020-12-27T04:04:30.107Z',
    title: 'Home',
    kind: ['page'],
    description: 'my starter home page',
    sections: []
  };
  it('should returns sections that filtered kind', async () => {
    const mockData: PagesContent = {
      ...mockBase,
      sections: [
        {
          fieldId: 'sectionContent',
          title: 'content section',
          content: [
            {
              fieldId: 'contentHtml',
              html: '<p>content</p>'
            }
          ]
        },
        {
          fieldId: 'sectionTop',
          title: 'top section',
          content: [
            {
              fieldId: 'contentHtml',
              html: '<p>top</p>'
            }
          ]
        },
        {
          fieldId: 'sectionBottom',
          title: 'bottom section',
          content: [
            {
              fieldId: 'contentHtml',
              html: '<p>bottom</p>'
            }
          ]
        },
        {
          fieldId: 'sectionHeader',
          title: 'header section',
          content: [
            {
              fieldId: 'contentHtml',
              html: '<p>header</p>'
            }
          ]
        },
        {
          fieldId: 'sectionFooter',
          title: 'footer section',
          content: [
            {
              fieldId: 'contentHtml',
              html: '<p>footer</p>'
            }
          ]
        }
      ]
    };
    expect(await getSectionFromPages(mockData, 'sectionContent')).toStrictEqual(
      [
        {
          title: 'content section',
          content: [
            {
              kind: 'html',
              contentHtml: '<p>content</p>'
            }
          ]
        }
      ]
    );
    expect(await getSectionFromPages(mockData, 'sectionTop')).toStrictEqual([
      {
        title: 'top section',
        content: [
          {
            kind: 'html',
            contentHtml: '<p>top</p>'
          }
        ]
      }
    ]);
    expect(await getSectionFromPages(mockData, 'sectionBottom')).toStrictEqual([
      {
        title: 'bottom section',
        content: [
          {
            kind: 'html',
            contentHtml: '<p>bottom</p>'
          }
        ]
      }
    ]);
    expect(await getSectionFromPages(mockData, 'sectionHeader')).toStrictEqual([
      {
        title: 'header section',
        content: [
          {
            kind: 'html',
            contentHtml: '<p>header</p>'
          }
        ]
      }
    ]);
    expect(await getSectionFromPages(mockData, 'sectionFooter')).toStrictEqual([
      {
        title: 'footer section',
        content: [
          {
            kind: 'html',
            contentHtml: '<p>footer</p>'
          }
        ]
      }
    ]);
  });
  it('should returns content sections from markdown', async () => {
    const mockData: PagesContent = {
      ...mockBase,
      sections: [
        {
          fieldId: 'sectionContent',
          title: '',
          content: [
            {
              fieldId: 'contentMarkdown',
              markdown: 'content'
            }
          ]
        }
      ]
    };
    expect(await getSectionFromPages(mockData, 'sectionContent')).toStrictEqual(
      [
        {
          title: '',
          content: [
            {
              kind: 'html',
              contentHtml: '<p>content</p>'
            }
          ]
        }
      ]
    );
  });
  it('should returns posts sections', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        ...mockDataArticleList,
        contents: mockDataArticleList.contents.slice(0, 1)
      })
    );
    const mockData: PagesContent = {
      ...mockBase,
      sections: [
        {
          fieldId: 'sectionContent',
          title: '',
          content: [
            {
              fieldId: 'contentArticles',
              apiName: 'posts',
              detail: true
            }
          ]
        }
      ]
    };
    expect(await getSectionFromPages(mockData, 'sectionContent')).toStrictEqual(
      [
        {
          title: '',
          content: [
            {
              kind: 'posts',
              contents: [
                {
                  id: 'mmmmmmmmm',
                  createdAt: '2021-01-13T05:12.157Z',
                  updatedAt: '2021-01-13T05:12.157Z',
                  publishedAt: '2021-01-13T05:12.157Z',
                  revisedAt: '2021-01-13T05:12.157Z',
                  title: 'title4',
                  path: '/posts'
                }
              ],
              detail: true
            }
          ]
        }
      ]
    );
  });
});
