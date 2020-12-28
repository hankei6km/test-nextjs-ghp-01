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

type Test1 = {
  title: string;
  content: string;
  mainImage?: string;
};
export type Test1Content = ContentBase & Test1;
export type Test1Index = Omit<Test1Content, 'content'>;
export type Test1Id = Pick<Test1Content, 'id'>;
export type Test1List = ContentList<Test1Index>;
export type Test1Ids = ContentList<Test1Id>;
