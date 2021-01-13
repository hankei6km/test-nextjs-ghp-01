import {
  mockDataPages,
  mockDataPagesList,
  mockDataPagesIds,
  mockDataArticleList
} from '../types/client/mockData';
import { FetchMock } from 'jest-fetch-mock';
import {
  getSortedPagesData,
  getAllPagesIds,
  getPagesData,
  getPagesSectionsData
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
    expect(await getSortedPagesData()).toStrictEqual([
      {
        id: 'home',
        createdAt: '2020-12-27T04:04:30.107Z',
        updatedAt: '2020-12-27T04:04:30.107Z',
        publishedAt: '2020-12-27T04:04:30.107Z',
        revisedAt: '2020-12-27T04:04:30.107Z',
        title: 'Home'
      },
      {
        id: 'test1',
        createdAt: '2020-12-26T15:29:14.476Z',
        updatedAt: '2020-12-26T15:29:14.476Z',
        publishedAt: '2020-12-26T15:29:14.476Z',
        revisedAt: '2020-12-26T15:29:14.476Z',
        title: 'Test1'
      }
    ]);
  });
});

describe('getAllPagesIds()', () => {
  it('should returns all ids', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockDataPagesIds));
    expect(await getAllPagesIds()).toStrictEqual([
      { params: { id: 'home' } },
      { params: { id: 'test1' } }
    ]);
  });
});

describe('getPagesData()', () => {
  it('should returns content data of "home"', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify(mockDataPages.contents.find(({ id }) => id === 'home'))
    );
    expect(await getPagesData({ params: { id: 'home' } })).toStrictEqual({
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
              fieldId: 'contentArticles',
              apiName: 'test1'
            }
          ]
        }
      ]
    });
  });
});
describe('getPagesSectionsData()', () => {
  it('should returns Sections', async () => {
    fetchMock
      .mockResponseOnce(
        JSON.stringify(mockDataPages.contents.find(({ id }) => id === 'home'))
      )
      .mockResponseOnce(JSON.stringify(mockDataArticleList));
    expect(
      await getPagesSectionsData({ params: { id: 'home' } })
    ).toStrictEqual([
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
            kind: 'posts',
            contents: [
              {
                id: 'mmmmmmmmm',
                createdAt: '2021-01-13T05:12.157Z',
                updatedAt: '2021-01-13T05:12.157Z',
                publishedAt: '2021-01-13T05:12.157Z',
                revisedAt: '2021-01-13T05:12.157Z',
                title: 'title4'
              },
              {
                id: 'zzzzzzzzz',
                createdAt: '2020-12-27T04:04:30.107Z',
                updatedAt: '2020-12-27T04:04:30.107Z',
                publishedAt: '2020-12-27T04:04:30.107Z',
                revisedAt: '2020-12-27T04:04:30.107Z',
                title: 'title3'
              },
              {
                id: 'yyyyyy-da',
                createdAt: '2020-12-26T15:29:14.476Z',
                updatedAt: '2020-12-26T15:29:14.476Z',
                publishedAt: '2020-12-26T15:29:14.476Z',
                revisedAt: '2020-12-26T15:29:14.476Z',
                title: 'title2'
              },
              {
                id: 'xxxxxxxxx',
                createdAt: '2020-12-26T12:25:43.532Z',
                updatedAt: '2020-12-26T12:27:22.533Z',
                publishedAt: '2020-12-26T12:27:22.533Z',
                revisedAt: '2020-12-26T12:27:22.533Z',
                title: 'title1'
              }
            ],
            detail: false
          }
        ]
      }
    ]);
  });
});
