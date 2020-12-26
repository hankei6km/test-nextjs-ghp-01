// https://zenn.dev/ria/articles/0356a07280d8d153e5e5
type CommonItem = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

type CommonList<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};

type Test1 = {
  title: string;
  contents: string;
  mainImage?: string;
};
export type Test1Content = Test1 & CommonItem;
export type Test1List = CommonList<Test1Content>;
