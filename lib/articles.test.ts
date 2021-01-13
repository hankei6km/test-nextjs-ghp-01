import {
  mockDataArticles,
  mockDataArticleList,
  mockDataArticleIds
} from '../types/client/mockData';
import { FetchMock } from 'jest-fetch-mock';
import {
  getSortedArticleList,
  getAllArticleIds,
  getArticleData
} from './articles';

// https://github.com/jefflau/jest-fetch-mock/issues/83
const fetchMock = fetch as FetchMock;
beforeEach(() => {
  fetchMock.resetMocks();
});
const testApiName = 'test1';

describe('getSortedArticleList()', () => {
  it('should returns contents array with out contet filed', async () => {
    // aspida-mock 使う?
    fetchMock.mockResponseOnce(JSON.stringify(mockDataArticleList));
    expect(await getSortedArticleList(testApiName)).toStrictEqual([
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
    ]);
  });
});

describe('getAllArticleIds()', () => {
  it('should returns all ids', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockDataArticleIds));
    expect(await getAllArticleIds(testApiName)).toStrictEqual([
      { params: { id: 'mmmmmmmmm' } },
      { params: { id: 'zzzzzzzzz' } },
      { params: { id: 'yyyyyy-da' } },
      { params: { id: 'xxxxxxxxx' } }
    ]);
  });
});

describe('getArticleData()', () => {
  it('should returns content data of "zzzzzzzzz"', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify(
        mockDataArticles.contents.find(({ id }) => id === 'zzzzzzzzz')
      )
    );
    expect(
      await getArticleData(testApiName, { params: { id: 'zzzzzzzzz' } })
    ).toStrictEqual({
      id: 'zzzzzzzzz',
      createdAt: '2020-12-27T04:04:30.107Z',
      updatedAt: '2020-12-27T04:04:30.107Z',
      publishedAt: '2020-12-27T04:04:30.107Z',
      revisedAt: '2020-12-27T04:04:30.107Z',
      title: 'title3',
      content: [
        {
          fieldId: 'contentHtml',
          html: '<p>content3</p>'
        }
      ]
    });
  });
});
