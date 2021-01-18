import {
  mockDataPages,
  mockDataPagesLayoutHome,
  mockDataPagesList,
  mockDataPagesIds,
  mockDataArticleList
} from '../types/client/mockData';
import { FetchMock } from 'jest-fetch-mock';
import {
  getSortedPagesData,
  getAllPagesIds,
  getPagesData,
  getPagesPageData
} from './pages';

// https://github.com/jefflau/jest-fetch-mock/issues/83
const fetchMock = fetch as FetchMock;
beforeEach(() => {
  fetchMock.resetMocks();
});

describe('getSortedPagesData()', () => {
  it('should returns contents array with out contet filed', async () => {
    // aspida-mock 使う?
    fetchMock.mockResponseOnce(JSON.stringify(mockDataPagesList));
    expect(await getSortedPagesData('pages')).toStrictEqual([
      {
        id: '_layout',
        createdAt: '2020-12-27T04:04:30.107Z',
        updatedAt: '2020-12-27T04:04:30.107Z',
        publishedAt: '2020-12-27T04:04:30.107Z',
        revisedAt: '2020-12-27T04:04:30.107Z',
        title: 'My Starter MOCK'
      },
      {
        id: 'home',
        createdAt: '2020-12-27T04:04:30.107Z',
        updatedAt: '2020-12-27T04:04:30.107Z',
        publishedAt: '2020-12-27T04:04:30.107Z',
        revisedAt: '2020-12-27T04:04:30.107Z',
        title: 'Home'
      },
      {
        id: 'blog',
        createdAt: '2020-12-26T15:29:14.476Z',
        updatedAt: '2020-12-26T15:29:14.476Z',
        publishedAt: '2020-12-26T15:29:14.476Z',
        revisedAt: '2020-12-26T15:29:14.476Z',
        title: 'Blog'
      }
    ]);
  });
});

describe('getAllPagesIds()', () => {
  it('should returns all ids', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockDataPagesIds));
    expect(await getAllPagesIds('pages')).toStrictEqual([
      { params: { id: '_layout' } },
      { params: { id: 'home' } },
      { params: { id: 'blog' } }
    ]);
  });
});

describe('getPagesData()', () => {
  it('should returns content data of "home"', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify(mockDataPages.contents.find(({ id }) => id === 'home'))
    );
    expect(
      await getPagesData('pages', { params: { id: 'home' } })
    ).toStrictEqual({
      id: 'home',
      createdAt: '2020-12-27T04:04:30.107Z',
      updatedAt: '2020-12-27T04:04:30.107Z',
      publishedAt: '2020-12-27T04:04:30.107Z',
      revisedAt: '2020-12-27T04:04:30.107Z',
      title: 'Home',
      kind: ['page'],
      description: 'my starter home page',
      sections: [
        {
          fieldId: 'sectionHeader',
          content: [
            {
              fieldId: 'contentConfigImage',
              field: 'profileImage',
              alt: 'profile image'
            },
            {
              fieldId: 'contentConfigLabel',
              field: 'profileName'
            }
          ]
        },
        {
          fieldId: 'sectionContent',
          title: 'intro',
          content: [
            {
              fieldId: 'contentHtml',
              html: '<p>index page</p>'
            },
            {
              fieldId: 'contentMarkdown',
              markdown: '## markdown\ndescribed by using markdown'
            },
            {
              fieldId: 'contentMarkdown',
              markdown: '## blog'
            },
            {
              fieldId: 'contentArticles',
              apiName: 'posts'
            }
          ]
        }
      ]
    });
  });
});
describe('getPagesPageData()', () => {
  it('should returns PageData', async () => {
    fetchMock
      .mockResponseOnce(JSON.stringify(mockDataPagesLayoutHome))
      .mockResponseOnce(JSON.stringify(mockDataArticleList));
    expect(
      await getPagesPageData('pages', { params: { id: 'home' } })
    ).toStrictEqual({
      id: 'home',
      updated: '2020-12-27T04:04:30.107Z',
      title: 'Home',
      description: 'my starter home page',
      mainImage: '',
      header: [
        {
          title: '',
          content: [
            {
              kind: 'configImage',
              field: 'profileImage',
              alt: 'profile image',
              link: ''
            },
            {
              kind: 'configLabel',
              field: 'profileName',
              link: ''
            }
          ]
        }
      ],
      sections: [
        {
          title: 'intro',
          content: [
            {
              kind: 'html',
              contentHtml: '<p>index page</p>'
            },
            {
              kind: 'html',
              contentHtml: '<h2>markdown</h2><p>described by using markdown</p>'
            },
            {
              kind: 'html',
              contentHtml: '<h2>blog</h2>'
            },
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
                },
                {
                  id: 'zzzzzzzzz',
                  createdAt: '2020-12-27T04:04:30.107Z',
                  updatedAt: '2020-12-27T04:04:30.107Z',
                  publishedAt: '2020-12-27T04:04:30.107Z',
                  revisedAt: '2020-12-27T04:04:30.107Z',
                  title: 'title3',
                  path: '/posts'
                },
                {
                  id: 'yyyyyy-da',
                  createdAt: '2020-12-26T15:29:14.476Z',
                  updatedAt: '2020-12-26T15:29:14.476Z',
                  publishedAt: '2020-12-26T15:29:14.476Z',
                  revisedAt: '2020-12-26T15:29:14.476Z',
                  title: 'title2',
                  path: '/posts'
                },
                {
                  id: 'xxxxxxxxx',
                  createdAt: '2020-12-26T12:25:43.532Z',
                  updatedAt: '2020-12-26T12:27:22.533Z',
                  publishedAt: '2020-12-26T12:27:22.533Z',
                  revisedAt: '2020-12-26T12:27:22.533Z',
                  title: 'title1',
                  path: '/posts'
                }
              ],
              detail: false
            }
          ]
        }
      ],
      footer: [
        {
          title: 'language & library',
          content: [
            {
              kind: 'html',
              contentHtml:
                '<ul><li>Next.js</li><li>Material-UI</li><li>Typescript</li><li>aspida</li><li>and more</li></ul>'
            }
          ]
        },
        {
          title: 'environment',
          content: [
            {
              kind: 'html',
              contentHtml: '<ul><li>hot mock</li></ul>'
            }
          ]
        },
        {
          title: '',
          content: [
            {
              kind: 'html',
              contentHtml: '<hr><p>My Starter</p>'
            }
          ]
        }
      ]
    });
  });
});
