import { PostsIndex } from './client/contentTypes';
// export type SectionKind = 'content' | 'posts';
export type SectionContent = {
  title: string;
  kind: 'content';
  contentHtml: string; // 変換済の html 、mmarkdonw もhtml に変換され統合される
};
export type SectionPosts = {
  title: string;
  kind: 'posts';
  contents: PostsIndex[];
  detail: boolean;
};

export type Section = SectionContent | SectionPosts;
