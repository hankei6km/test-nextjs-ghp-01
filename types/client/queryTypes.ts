export type GetQuery = {
  draftKey?: string;
  limit?: number;
  offset?: number;
  orders?: string;
  q?: string;
  ids?: string;
  filters?: string;
  // 以下の 2 パラメーターはレスポンスの型が変わるので、
  // リテラル型である程度縛りをかけて定義(GetIdsQuery のような感じ).
  // レスポンスの型もそれにあわせて `Pick` `Omit` 等する.
  // fields?: string; //  ('id'|'title'|...)[] のようにしてパラメーターのシリアライズを手動とかでないと正しくないフィールド名を弾けない、かな?
  // depth?: number;
};

export type GetContentQuery = {
  draftKey?: string;
  fields: 'id,createdAt,updatedAt,publishedAt,revisedAt,title,kind,description,mainImage,category.id,category.title,sections';
  // fields?: string;
  // depth?: number;
};

export type GetFieldsIdQuery = {
  fields: 'id';
} & Omit<GetQuery, 'ids' | 'filters'>;

type GetPagesItemsWithLayoutId = string;
export type GetPagesItemsWithLayout = {
  // ids: `_layout,${GetPagesItemsWithLayoutId}`
  ids: GetPagesItemsWithLayoutId;
  fields: 'id,createdAt,updatedAt,publishedAt,revisedAt,title,kind,description,mainImage,category.id,category.title,sections';
};

export type GetPagesItemQuery = {
  // 型のリファクト?が面倒、、、
  fields: 'id,createdAt,updatedAt,publishedAt,revisedAt,title,category.id,category.title';
} & GetQuery;
