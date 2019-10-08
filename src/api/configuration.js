import axios from './axiosConfig';

export const getConfiguration = (apiKey, success, fail, after = () => {}) => axios
  .get('/configuration', { params: { api_key: apiKey } })
  .then(response => success(response))
  .catch(error => fail(error))
  .finally(() => after());
