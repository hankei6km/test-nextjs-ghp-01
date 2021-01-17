import {
  mockDataPages,
  mockDataArticles,
  mockDataArticleList,
  mockDataArticleIds
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
const testApiName = 'posts';

describe('getSortedPagesData()', () => {
  it('should returns contents array with out contet filed', async () => {
    // aspida-mock 使う?
    fetchMock.mockResponseOnce(JSON.stringify(mockDataArticleList));
    expect(await getSortedPagesData(testApiName)).toStrictEqual([
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

describe('getAllPagesIds()', () => {
  it('should returns all ids', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockDataArticleIds));
    expect(await getAllPagesIds(testApiName)).toStrictEqual([
      { params: { id: 'mmmmmmmmm' } },
      { params: { id: 'zzzzzzzzz' } },
      { params: { id: 'yyyyyy-da' } },
      { params: { id: 'xxxxxxxxx' } }
    ]);
  });
});

describe('getPagesData()', () => {
  it('should returns content data of "zzzzzzzzz"', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify(
        mockDataArticles.contents.find(({ id }) => id === 'zzzzzzzzz')
      )
    );
    expect(
      await getPagesData(testApiName, { params: { id: 'zzzzzzzzz' } })
    ).toStrictEqual({
      id: 'zzzzzzzzz',
      createdAt: '2020-12-27T04:04:30.107Z',
      updatedAt: '2020-12-27T04:04:30.107Z',
      publishedAt: '2020-12-27T04:04:30.107Z',
      revisedAt: '2020-12-27T04:04:30.107Z',
      title: 'title3',
      kind: ['page'],
      sections: [
        {
          fieldId: 'sectionContent',
          content: [
            {
              fieldId: 'contentHtml',
              html: '<p>content3</p>'
            }
          ]
        }
      ]
    });
  });
});

describe('getPagesPageData()', () => {
  it('should returns post data of "zzzzzzzzz"', async () => {
    fetchMock
      .mockResponseOnce(
        JSON.stringify(
          mockDataPages.contents.find(({ id }) => id === '_layout')
        )
      )
      .mockResponseOnce(
        JSON.stringify(
          mockDataArticles.contents.find(({ id }) => id === 'zzzzzzzzz')
        )
      );
    expect(
      await getPagesPageData(testApiName, { params: { id: 'zzzzzzzzz' } })
    ).toStrictEqual({
      id: 'zzzzzzzzz',
      updated: '2020-12-27T04:04:30.107Z',
      title: 'title3',
      description: 'my starter home page',
      mainImage: '',
      header: [
        {
          title: '',
          content: [
            {
              kind: 'configImage',
              field: 'profileImageSmall'
            }
          ]
        }
      ],
      sections: [
        {
          title: '',
          content: [
            {
              kind: 'html',
              contentHtml: '<p>content3</p>'
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
  it('should returns post data of "mmmmmmmmm" (markdown)', async () => {
    fetchMock
      .mockResponseOnce(
        JSON.stringify(
          mockDataPages.contents.find(({ id }) => id === '_layout')
        )
      )
      .mockResponseOnce(
        JSON.stringify(
          mockDataArticles.contents.find(({ id }) => id === 'mmmmmmmmm')
        )
      );
    expect(
      await getPagesPageData(testApiName, { params: { id: 'mmmmmmmmm' } })
    ).toStrictEqual({
      id: 'mmmmmmmmm',
      updated: '2021-01-13T05:12.157Z',
      title: 'title4',
      description: 'my starter home page',
      mainImage: '',
      header: [
        {
          title: '',
          content: [
            {
              kind: 'configImage',
              field: 'profileImageSmall'
            }
          ]
        }
      ],
      sections: [
        {
          title: '',
          content: [
            {
              kind: 'html',
              contentHtml: '<p>markdown content</p>'
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
