import { PagesIndex } from './client/contentTypes';
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
  )[];
};

export type PageData = {
  id: string;
  updated: string; // この段階では Date にはしない
  title: string;
  description: string;
  mainImage: string;
  header: Section[];
  top: Section[];
  sections: Section[];
  bottom: Section[];
  footer: Section[];
};

export const blankPageData = (): PageData => ({
  id: '',
  updated: '',
  title: '',
  description: '',
  header: [],
  top: [],
  sections: [],
  bottom: [],
  footer: [],
  mainImage: ''
});
