import { PagesIndex } from './client/contentTypes';
// export type SectionKind = 'content' | 'posts';
type SectionArticleIndexPath = { path: string };
export type SectionArticleIndex = PagesIndex & SectionArticleIndexPath;
export type SectionBlank = {
  kind: '';
};
export type SectionContent = {
  kind: 'html';
  contentHtml: string; // 変換済の html 、mmarkdonw もhtml に変換され統合される
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
export type SectionConfigLabel = {
  kind: 'configLabel';
  field: string;
  link: string;
};
export type SectionConfigImage = {
  kind: 'configImage';
  field: string;
  alt: string;
  link: string;
};

export type Section = {
  title?: string;
  content: (
    | SectionBlank
    | SectionContent
    | SectionPosts
    | SectionImage
    | SectionConfigLabel
    | SectionConfigImage
  )[];
};

export type PageData = {
  id: string;
  updated: string; // この段階では Date にはしない
  title: string;
  description: string;
  mainImage: string;
  header: Section[];
  sections: Section[];
  footer: Section[];
};

export const blankPageData = (): PageData => ({
  id: '',
  updated: '',
  title: '',
  description: '',
  header: [],
  sections: [],
  footer: [],
  mainImage: ''
});
