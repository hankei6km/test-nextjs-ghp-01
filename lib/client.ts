import aspida from '@aspida/fetch';
import api from '../clientTypes/$api';
import mock from '../clientTypes/$mock';

export const fetchConfig = (() => {
  const getApiKey = process.env.GET_API_KEY || '';
  if (getApiKey === '') {
    console.error('$GET_API_KEY is not defined.');
  }
  return {
    headers: { 'X-API-KEY': getApiKey }
  };
})();

const clientV1 = (process.env.NODE_ENV === 'development'
  ? mock(
      aspida(fetch)
    )
  : api(
      aspida(fetch)
    )
).api.v1;

export default clientV1;
