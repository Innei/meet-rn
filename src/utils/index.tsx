import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
/**
 * @see https://developer.hitokoto.cn/sentence/#%E8%AF%B7%E6%B1%82%E5%9C%B0%E5%9D%80
 */
const $http = axios.create({
  baseURL: 'https://v1.hitokoto.cn',
});

$http.interceptors.response.use((res) => {
  const data = { ...res.data };

  return camelcaseKeys(data);
});

export { $http };
