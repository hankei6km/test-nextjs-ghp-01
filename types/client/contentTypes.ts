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

export type PagesSectionKind = 'content' | 'posts';

type PagesSection = {
  title: string;
  kind: PagesSectionKind;
  contentHtml?: string;
  contentMarkdown?: string;
  posts?: string;
  postsDetail?: boolean;
};

type Pages = {
  title: string;
  kind: 'posts' | 'gallery' | 'page';
  descriptionHtml?: string;
  descriptionMarkdown?: string;
  sections: PagesSection[];
};
export type PagesContent = ContentBase & Pages;
export type PagesIndex = Omit<
  PagesContent,
  'kind' | 'descriptionHtml' | 'descriptionMarkdown' | 'sections'
>;
export type PagesId = Pick<PagesContent, 'id'>;
export type PagesContents = ContentList<PagesContent>;
export type PagesList = ContentList<PagesIndex>;
export type PagesIds = ContentList<PagesId>;

type Article = {
  title: string;
  content: string;
  mainImage?: string;
};
export type ArticleContent = ContentBase & Article;
export type ArticleIndex = Omit<ArticleContent, 'content'>;
export type ArticleId = Pick<ArticleContent, 'id'>;
export type ArticleContents = ContentList<ArticleContent>;
export type ArticleList = ContentList<ArticleIndex>;
export type ArticleIds = ContentList<ArticleId>;
