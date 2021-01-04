import { Test1Contents } from './contentTypes';

export const mockDataTest1: Test1Contents = {
  contents: [
    {
      id: 'zzzzzzzzz',
      createdAt: '2020-12-27T04:04:30.107Z',
      updatedAt: '2020-12-27T04:04:30.107Z',
      publishedAt: '2020-12-27T04:04:30.107Z',
      revisedAt: '2020-12-27T04:04:30.107Z',
      title: 'title3',
      content: '<p>content3</p>'
    },
    {
      id: 'yyyyyy-da',
      createdAt: '2020-12-26T15:29:14.476Z',
      updatedAt: '2020-12-26T15:29:14.476Z',
      publishedAt: '2020-12-26T15:29:14.476Z',
      revisedAt: '2020-12-26T15:29:14.476Z',
      title: 'title2',
      content: '<p>content2</p>'
    },
    {
      id: 'xxxxxxxxx',
      createdAt: '2020-12-26T12:25:43.532Z',
      updatedAt: '2020-12-26T12:27:22.533Z',
      publishedAt: '2020-12-26T12:27:22.533Z',
      revisedAt: '2020-12-26T12:27:22.533Z',
      title: 'title1',
      content: '<p>content1</p>'
    }
  ],
  totalCount: 3,
  offset: 0,
  limit: 10
};

export const mockDataTest1List = {
  ...mockDataTest1,
  contents: mockDataTest1.contents.map((v) => ({
    ...v,
    content: undefined
  }))
};

export const mockDataTest1Ids = {
  ...mockDataTest1,
  contents: mockDataTest1.contents.map(({ id }) => ({ id }))
};
