type ContentBase = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt?: string; // 古いcontentにはついていないのでオプショナル.
};

type ContentList<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};

type Pages = {
  title: string;
  kind: 'home' | 'posts' | 'gallery' | 'history' | 'about';
  descriptionHtml?: string;
  descriptionMarkdown?: string;
};
export type PagesContent = ContentBase & Pages;
export type PagesIndex = Omit<
  PagesContent,
  'kind' | 'descriptionHtml' | 'descriptionMarkdown'
>;
export type PagesId = Pick<PagesContent, 'id'>;
export type PagesContents = ContentList<PagesContent>;
export type PagesList = ContentList<PagesIndex>;
export type PagesIds = ContentList<PagesId>;

type Posts = {
  title: string;
  content: string;
  mainImage?: string;
};
export type PostsContent = ContentBase & Posts;
export type PostsIndex = Omit<PostsContent, 'content'>;
export type PostsId = Pick<PostsContent, 'id'>;
export type PostsContents = ContentList<PostsContent>;
export type PostsList = ContentList<PostsIndex>;
export type PostsIds = ContentList<PostsId>;
