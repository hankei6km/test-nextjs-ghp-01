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

type PagesContentHtml = {
  fieldId: 'contentHtml';
  html: string;
};
type PagesContentMarkdown = {
  fieldId: 'contentMarkdown';
  markdown: string;
};
type PagesContentArticles = {
  fieldId: 'contentArticles';
  apiName: string;
  detail?: boolean;
};
type PagesContentImage = {
  fieldId: 'contentImage';
  image: string;
  className?: string;
};
type PagesContentConfigLabel = {
  fieldId: 'contentConfigLabel';
  field: string;
};
type PagesContentConfigImage = {
  fieldId: 'contentConfigImage';
  field: string;
};
type PageContent =
  | PagesContentHtml
  | PagesContentMarkdown
  | PagesContentArticles
  | PagesContentImage
  | PagesContentConfigLabel
  | PagesContentConfigImage;
type PagesSectionContent = {
  fieldId: 'sectionContent';
  title?: string;
  content: PageContent[]; // array にしているが、API スキーマ等にあわせたもので、１つコンテントという認識(articlesはちょっと違うか)
};
type PagesSectionHeader = {
  fieldId: 'sectionHeader';
  title?: string;
  content: PageContent[];
};
type PagesSectionFooter = {
  fieldId: 'sectionFooter';
  title?: string;
  content: PageContent[];
};
type PagesSection =
  | PagesSectionContent
  | PagesSectionHeader
  | PagesSectionFooter;
export type PagesSectionKind = PagesSection['fieldId'];
type Pages = {
  title: string;
  kind: ['posts' | 'gallery' | 'page']; // 複数選択にしていない
  description?: string;
  mainImage?: string;
  sections: PagesSection[];
};
export type PagesContent = ContentBase & Pages;
export type PagesIndex = Omit<
  PagesContent,
  'kind' | 'description' | 'sections'
>;
export type PagesId = Pick<PagesContent, 'id'>;
export type PagesContents = ContentList<PagesContent>;
export type PagesIdsContents = Omit<PagesContents, 'offset' | 'limit'>;
export type PagesList = ContentList<PagesIndex>;
export type PagesIds = ContentList<PagesId>;

const contentBase: ContentBase = {
  id: '',
  createdAt: '',
  updatedAt: '',
  publishedAt: '',
  revisedAt: ''
};
// const pagesSection: PagesSection = {
//   title: '',
//   kind: 'content',
//   contentHtml: ''
// };

export const blankPageContent = (): PagesContent => ({
  ...contentBase,
  title: '',
  kind: ['page'],
  description: '',
  sections: []
});
