import aspida from '@aspida/fetch';
import api from '../types/client/$api';
import mock from '../types/client/$mock';

export const fetchConfig = (() => {
  const getApiKey = process.env.GET_API_KEY || '';
  if (getApiKey === '' && process.env.NODE_ENV !== 'test') {
    console.error('$GET_API_KEY is not defined.');
  }
  return {
    headers: { 'X-API-KEY': getApiKey }
  };
})();

// aspida の client.xxx の xxx 部分。
// 今回は api.vi[apiName]
export type ApiNameArticle = 'test1';

const clientV1 = (process.env.NODE_ENV === 'development'
  ? mock(aspida(fetch))
  : api(aspida(fetch))
).api.v1;

export default clientV1;
