type ArticleContentHtml = {
  // markdown でも html に変換されているので markdown は定義していない
  kind: 'html';
  html: string;
};
type ArticleContent = ArticleContentHtml;
export type ArticlePost = {
  id: string;
  updated: string; // この段階では Date にはしない
  title: string;
  content: ArticleContent[]; // array になっているが意味的には１つのコンテントとして扱う(スキーマ等の要因から配列化)
  mainImage: string;
};

export const blankArticlePost = (): ArticlePost => ({
  id: '',
  updated: '',
  title: '',
  content: [],
  mainImage: ''
});
