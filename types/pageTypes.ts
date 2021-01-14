import { ArticleIndex } from './client/contentTypes';
// export type SectionKind = 'content' | 'posts';
type SectionArticleIndexPath = { path: string };
export type SectionArticleIndex = ArticleIndex & SectionArticleIndexPath;
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

export type Section = {
  title?: string;
  content: (SectionBlank | SectionContent | SectionPosts)[];
};

export type PageData = {
  title: string;
  description: string;
  mainImage: string;
  sections: Section[];
};

export const blankPageData = (): PageData => ({
  title: '',
  description: '',
  sections: [],
  mainImage: ''
});
