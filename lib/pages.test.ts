import {
  mockDataPages,
  mockDataPagesList,
  mockDataPagesIds
} from '../types/client/mockData';
import { FetchMock } from 'jest-fetch-mock';
import { getSortedPagesData, getAllPagesIds, getPagesData } from './pages';

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
      kind: 'page',
      section: [
        {
          title: 'intro',
          kind: 'content',
          contentHtml: '<p>index page</p>'
        }
      ]
    });
  });
  it('should returns content data of "test1" that is contained descriptionHtml', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify(mockDataPages.contents.find(({ id }) => id === 'test1'))
    );
    expect(await getPagesData({ params: { id: 'test1' } })).toStrictEqual({
      id: 'test1',
      createdAt: '2020-12-26T15:29:14.476Z',
      updatedAt: '2020-12-26T15:29:14.476Z',
      publishedAt: '2020-12-26T15:29:14.476Z',
      revisedAt: '2020-12-26T15:29:14.476Z',
      title: 'Test1',
      kind: 'posts',
      descriptionHtml: '<p>test1 posts</p>',
      section: [
        {
          title: 'test1 posts',
          kind: 'posts',
          posts: 'test1',
          postsDetail: true
        }
      ]
    });
  });
});
