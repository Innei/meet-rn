import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import { JSONParseWithDate } from './json-parser';
/**
 * @see https://developer.hitokoto.cn/sentence/#%E8%AF%B7%E6%B1%82%E5%9C%B0%E5%9D%80
 */
export const $http = axios.create({
  baseURL: 'http://127.0.0.1:3000/v1',
  transformResponse: (res) => {
    return JSONParseWithDate(res);
  },
});

$http.interceptors.response.use((res) => {
  const data = { ...res.data };

  return camelcaseKeys(data);
});
