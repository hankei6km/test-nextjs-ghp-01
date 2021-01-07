import {
  mockDataTest1,
  mockDataTest1List,
  mockDataTest1Ids
} from '../types/client/mockData';
import { FetchMock } from 'jest-fetch-mock';
import { getSortedTest1Data, getAllTest1Ids, getTest1Data } from './test1';

// https://github.com/jefflau/jest-fetch-mock/issues/83
const fetchMock = fetch as FetchMock;
beforeEach(() => {
  fetchMock.resetMocks();
});

describe('getSortedTest1Data()', () => {
  it('should returns contents array with out contet filed', async () => {
    // aspida-mock 使う?
    fetchMock.mockResponseOnce(JSON.stringify(mockDataTest1List));
    expect(await getSortedTest1Data()).toStrictEqual([
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

describe('getAllTest1Ids()', () => {
  it('should returns all ids', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockDataTest1Ids));
    expect(await getAllTest1Ids()).toStrictEqual([
      { params: { id: 'zzzzzzzzz' } },
      { params: { id: 'yyyyyy-da' } },
      { params: { id: 'xxxxxxxxx' } }
    ]);
  });
});

describe('getTest1Data()', () => {
  it('should returns content data of "zzzzzzzzz"', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify(
        mockDataTest1.contents.find(({ id }) => id === 'zzzzzzzzz')
      )
    );
    expect(await getTest1Data({ params: { id: 'zzzzzzzzz' } })).toStrictEqual({
      id: 'zzzzzzzzz',
      createdAt: '2020-12-27T04:04:30.107Z',
      updatedAt: '2020-12-27T04:04:30.107Z',
      publishedAt: '2020-12-27T04:04:30.107Z',
      revisedAt: '2020-12-27T04:04:30.107Z',
      title: 'title3',
      content: '<p>content3</p>'
    });
  });
});
