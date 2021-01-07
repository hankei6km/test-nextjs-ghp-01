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

type Test1 = {
  title: string;
  content: string;
  mainImage?: string;
};
export type Test1Content = ContentBase & Test1;
export type Test1Index = Omit<Test1Content, 'content'>;
export type Test1Id = Pick<Test1Content, 'id'>;
export type Test1Contents = ContentList<Test1Content>;
export type Test1List = ContentList<Test1Index>;
export type Test1Ids = ContentList<Test1Id>;
