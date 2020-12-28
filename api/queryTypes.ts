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
  // fields?: string;
  // depth?: number;
};

export type GetIdsQuery = {
  fields: 'id';
} & Omit<GetQuery, 'ids' | 'filters'>;

export type GetTest1ItemQuery = { fields: 'id,title' } & GetQuery;
