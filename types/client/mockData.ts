import { PagesContents, ArticleContents } from './contentTypes';

export const mockDataPages: PagesContents = {
  contents: [
    {
      id: 'home',
      createdAt: '2020-12-27T04:04:30.107Z',
      updatedAt: '2020-12-27T04:04:30.107Z',
      publishedAt: '2020-12-27T04:04:30.107Z',
      revisedAt: '2020-12-27T04:04:30.107Z',
      title: 'Home',
      kind: ['page'],
      sections: [
        {
          title: 'intro',
          kind: ['content'],
          contentHtml: '<p>index page</p>'
        },
        {
          title: 'test1 posts',
          kind: ['posts'],
          posts: 'test1'
        }
      ]
    },
    {
      id: 'test1',
      createdAt: '2020-12-26T15:29:14.476Z',
      updatedAt: '2020-12-26T15:29:14.476Z',
      publishedAt: '2020-12-26T15:29:14.476Z',
      revisedAt: '2020-12-26T15:29:14.476Z',
      title: 'Test1',
      kind: ['posts'],
      descriptionHtml: '<p>test1 posts</p>',
      sections: [
        {
          title: 'test1 posts',
          kind: ['posts'],
          posts: 'test1',
          postsDetail: true
        }
      ]
    }
  ],
  totalCount: 2,
  offset: 0,
  limit: 10
};

export const mockDataPagesList = {
  ...mockDataPages,
  contents: mockDataPages.contents.map((v) => ({
    ...v,
    kind: undefined,
    descriptionHtml: undefined,
    descriptionMarkdown: undefined,
    sections: undefined
  }))
};

export const mockDataPagesIds = {
  ...mockDataPages,
  contents: mockDataPages.contents.map(({ id }) => ({ id }))
};

export const mockDataArticles: ArticleContents = {
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

export const mockDataArticleList = {
  ...mockDataArticles,
  contents: mockDataArticles.contents.map((v) => ({
    ...v,
    content: undefined
  }))
};

export const mockDataArticleIds = {
  ...mockDataArticles,
  contents: mockDataArticles.contents.map(({ id }) => ({ id }))
};
