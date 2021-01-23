import { PagesContents } from '../types/client/contentTypes';

export const mockDataPages: PagesContents = {
  contents: [
    {
      id: '_global',
      createdAt: '2020-12-27T04:04:30.107Z',
      updatedAt: '2020-12-27T04:04:30.107Z',
      publishedAt: '2020-12-27T04:04:30.107Z',
      revisedAt: '2020-12-27T04:04:30.107Z',
      title: 'My Starter MOCK',
      kind: ['page'],
      description: 'my starter home page',
      category: [],
      sections: [
        {
          fieldId: 'sectionFooter',
          title: 'language & library',
          content: [
            {
              fieldId: 'contentMarkdown',
              markdown:
                '- Next.js\n- Material-UI\n- Typescript\n- aspida\n- and more'
            }
          ]
        },
        {
          fieldId: 'sectionFooter',
          title: 'environment',
          content: [
            {
              fieldId: 'contentMarkdown',
              markdown: '- hot mock'
            }
          ]
        },
        {
          fieldId: 'sectionFooter',
          content: [
            {
              fieldId: 'contentMarkdown',
              markdown: '---\n\nMy Starter'
            }
          ]
        }
      ]
    },
    {
      id: 'home',
      createdAt: '2020-12-27T04:04:30.107Z',
      updatedAt: '2020-12-27T04:04:30.107Z',
      publishedAt: '2020-12-27T04:04:30.107Z',
      revisedAt: '2020-12-27T04:04:30.107Z',
      title: 'Home',
      kind: ['page'],
      description: 'my starter home page',
      category: [],
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
              fieldId: 'contentMarkdown',
              markdown: '## blog'
            },
            {
              fieldId: 'contentArticles',
              apiName: 'posts',
              category: []
            }
          ]
        }
      ]
    },
    {
      id: 'blog',
      createdAt: '2020-12-26T15:29:14.476Z',
      updatedAt: '2020-12-26T15:29:14.476Z',
      publishedAt: '2020-12-26T15:29:14.476Z',
      revisedAt: '2020-12-26T15:29:14.476Z',
      title: 'Blog',
      kind: ['posts'],
      category: [
        { id: 'cat1', title: 'Category1' },
        { id: 'cat2', title: 'Category2' },
        { id: 'cat3', title: 'Category3' }
      ],
      sections: [
        {
          fieldId: 'sectionContent',
          title: 'all posts',
          content: [
            {
              fieldId: 'contentArticles',
              apiName: 'posts',
              detail: true,
              category: []
            }
          ]
        }
      ]
    },
    {
      id: 'blog-posts',
      createdAt: '2020-12-26T15:29:14.476Z',
      updatedAt: '2020-12-26T15:29:14.476Z',
      publishedAt: '2020-12-26T15:29:14.476Z',
      revisedAt: '2020-12-26T15:29:14.476Z',
      title: 'Blog',
      kind: ['posts'],
      category: [],
      sections: [
        {
          fieldId: 'sectionTop',
          content: [
            {
              fieldId: 'contentMarkdown',
              markdown: 'post top\n\n---'
            }
          ]
        },
        {
          fieldId: 'sectionBottom',
          content: [
            {
              fieldId: 'contentMarkdown',
              markdown: '---\n\npost bottom'
            }
          ]
        }
      ]
    }
  ],
  totalCount: 2,
  offset: 0,
  limit: 10
};

export const mockDataPagesOuterHome = {
  ...mockDataPages,
  contents: [mockDataPages.contents[0], mockDataPages.contents[1]]
};

export const mockDataPagesOuterBlog = {
  ...mockDataPages,
  contents: [mockDataPages.contents[0], mockDataPages.contents[2]]
};

export const mockDataPagesOuter = {
  ...mockDataPages,
  contents: [mockDataPages.contents[0]]
};

export const mockDataPagesOuterPosts = {
  ...mockDataPages,
  contents: [mockDataPages.contents[0], mockDataPages.contents[3]]
};

export const mockDataPagesList = {
  ...mockDataPages,
  contents: mockDataPages.contents.map((v) => ({
    ...v,
    kind: undefined,
    description: undefined,
    sections: undefined
  }))
};

export const mockDataPagesIds = {
  ...mockDataPages,
  contents: mockDataPages.contents.map(({ id }) => ({ id }))
};

export const mockDataArticles: PagesContents = {
  contents: [
    {
      id: 'mmmmmmmmm',
      createdAt: '2021-01-13T05:12.157Z',
      updatedAt: '2021-01-13T05:12.157Z',
      publishedAt: '2021-01-13T05:12.157Z',
      revisedAt: '2021-01-13T05:12.157Z',
      title: 'title4',
      kind: ['page'],
      category: [],
      sections: [
        {
          fieldId: 'sectionContent',
          content: [
            {
              fieldId: 'contentMarkdown',
              markdown: 'markdown content'
            }
          ]
        }
      ]
    },
    {
      id: 'zzzzzzzzz',
      createdAt: '2020-12-27T04:04:30.107Z',
      updatedAt: '2020-12-27T04:04:30.107Z',
      publishedAt: '2020-12-27T04:04:30.107Z',
      revisedAt: '2020-12-27T04:04:30.107Z',
      title: 'title3',
      kind: ['page'],
      category: [],
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
    },
    {
      id: 'yyyyyy-da',
      createdAt: '2020-12-26T15:29:14.476Z',
      updatedAt: '2020-12-26T15:29:14.476Z',
      publishedAt: '2020-12-26T15:29:14.476Z',
      revisedAt: '2020-12-26T15:29:14.476Z',
      title: 'title2',
      kind: ['page'],
      category: [],
      sections: [
        {
          fieldId: 'sectionContent',
          content: [
            {
              fieldId: 'contentHtml',
              html: '<p>content2</p>'
            }
          ]
        }
      ]
    },
    {
      id: 'xxxxxxxxx',
      createdAt: '2020-12-26T12:25:43.532Z',
      updatedAt: '2020-12-26T12:27:22.533Z',
      publishedAt: '2020-12-26T12:27:22.533Z',
      revisedAt: '2020-12-26T12:27:22.533Z',
      title: 'title1',
      kind: ['page'],
      category: [],
      sections: [
        {
          fieldId: 'sectionContent',
          content: [
            {
              fieldId: 'contentHtml',
              html: '<p>content1</p>'
            }
          ]
        }
      ]
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
    kind: undefined,
    description: undefined,
    sections: undefined
  }))
};

export const mockDataArticleIds = {
  ...mockDataArticles,
  contents: mockDataArticles.contents.map(({ id }) => ({ id }))
};
