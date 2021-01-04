const baseURL = () => {
  const apiBaseURL = process.env.API_BASE_URL || '';
  if (apiBaseURL === '') {
    console.error('$API_BASE_URL is not defined.');
  }
  return apiBaseURL;
};
module.exports = { input: 'types/client', baseURL: baseURL() };
