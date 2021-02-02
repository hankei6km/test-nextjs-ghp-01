import { PagesIndex, PagesCategory } from './client/contentTypes';
// export type SectionKind = 'content' | 'posts';
type SectionArticleIndexPath = { path: string };
export type SectionArticleIndex = PagesIndex & SectionArticleIndexPath;
export type SectionContentHtmlChildren = {
  tagName: string;
  attribs: { [name: string]: string };
  html: string;
};
export type SectionBlank = {
  kind: '';
};
export type SectionContent = {
  kind: 'html';
  // contentHtml: string; // 変換済の html 、mmarkdonw もhtml に変換され統合される
  // React で dangerouslySetInnerHTML を使うと他の element でラップされてしまうので、
  // children に分割して child の root でラップするようにする
  contentHtml: SectionContentHtmlChildren[];
};
export type SectionPosts = {
  kind: 'posts';
  contents: SectionArticleIndex[];
  detail: boolean;
  // 再利用することはなさそう、
  // title が保持できないときがある (getStaticProps では id のみわたされるので、
  // ページデータから取得する必要がある)
  // よって一旦削除。
  // category: PagesCategory[];
};
export type SectionImage = {
  kind: 'image';
  image: string;
  alt: string;
  link: string;
};

// 現時点では Parts>>> は外部からの定義はできない
export type SectionPartsSiteTitle = {
  kind: 'partsSiteTitle';
  link: string;
};
export type SectionPartsSiteLogo = {
  kind: 'partsSiteLogo';
  size: '' | 'small' | 'large';
  link: string;
};
export type SectionPartsPageTitle = {
  kind: 'partsPageTitle';
  link: string;
};
export type SectionPartsProfileImage = {
  kind: 'partsProfileImage';
  size: '' | 'small' | 'large';
  name: boolean;
  link: string;
};
export type SectionPartsUpdated = {
  kind: 'partsUpdated';
};
export type SectionPartsNavMain = {
  kind: 'partsNavMain';
};
export type SectionPartsNavBreadcrumbs = {
  kind: 'partsNavBreadcrumbs';
  lastBreadcrumb: string;
};
export type SectionPartsNavCategory = {
  kind: 'partsNavCategory';
  all: boolean;
  categoryPath: string;
};
export type SectionPartsNavPagination = {
  kind: 'partsNavPagination';
  href: string;
  baseAs: string;
  pagePath: string[];
  firstPageHref: string;
};

export type Section = {
  title?: string;
  content: (
    | SectionBlank
    | SectionContent
    | SectionPosts
    | SectionImage
    | SectionPartsSiteTitle
    | SectionPartsSiteLogo
    | SectionPartsPageTitle
    | SectionPartsProfileImage
    | SectionPartsUpdated
    | SectionPartsNavMain
    | SectionPartsNavBreadcrumbs
    | SectionPartsNavCategory
    | SectionPartsNavPagination
  )[];
};

export type PageData = {
  id: string;
  updated: string; // この段階では Date にはしない
  pageNo: number; // pagination 用、getStaticProps で付与される.
  pageCount: number; // pagination しないときは -1.
  title: string;
  description: string;
  mainImage: string;
  allCategory: PagesCategory[];
  category: PagesCategory[];
  curCategory: string; //  route 上で選択されているカテゴリ、getStaticProps で付与される.選択されていないときは ''.
  header: Section[];
  top: Section[];
  sections: Section[];
  bottom: Section[];
  footer: Section[];
};

export const blankPageData = (): PageData => ({
  id: '',
  updated: '',
  pageNo: 1,
  pageCount: -1,
  title: '',
  description: '',
  mainImage: '',
  allCategory: [],
  category: [],
  curCategory: '',
  header: [],
  top: [],
  sections: [],
  bottom: [],
  footer: []
});
