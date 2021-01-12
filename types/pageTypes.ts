import { ArticleIndex } from './client/contentTypes';
// export type SectionKind = 'content' | 'posts';
export type SectionBlank = {
  title?: string;
  kind: '';
};
export type SectionContent = {
  title?: string;
  kind: 'content';
  contentHtml: string; // 変換済の html 、mmarkdonw もhtml に変換され統合される
};
export type SectionPosts = {
  title?: string;
  kind: 'posts';
  contents: ArticleIndex[];
  detail: boolean;
};

export type Section = SectionBlank | SectionContent | SectionPosts;
