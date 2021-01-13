import { ArticleIndex } from './client/contentTypes';
// export type SectionKind = 'content' | 'posts';
export type SectionBlank = {
  kind: '';
};
export type SectionContent = {
  kind: 'html';
  contentHtml: string; // 変換済の html 、mmarkdonw もhtml に変換され統合される
};
export type SectionPosts = {
  kind: 'posts';
  contents: ArticleIndex[];
  detail: boolean;
};

export type Section = {
  title?: string;
  content: (SectionBlank | SectionContent | SectionPosts)[];
};
