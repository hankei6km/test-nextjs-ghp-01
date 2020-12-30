import aspida from '@aspida/fetch';
import api from '../clientTypes/$api';
import mock from '../clientTypes/$mock';

export const fetchBaseURL = (): string => {
  const apiBaseURL = process.env.API_BASE_URL || '';
  if (apiBaseURL === '') {
    console.error('$API_BASE_URL is not defined.');
  }
  return apiBaseURL;
};
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
      aspida(fetch, {
        baseURL: fetchBaseURL()
      })
    )
  : api(
      aspida(fetch, {
        baseURL: fetchBaseURL()
      })
    )
).api.v1;

export default clientV1;
