import * as qs from 'qs';
import { auth } from './../helper';
import { useAuth } from '../context/auth-context';
import { message } from 'antd';
const APIURL = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}
export const http = (url: string, { data, token, headers, ...customConfig }: Config = {}) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : '',
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === 'GET') {
    url += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window.fetch(`${APIURL}${url}`, config).then(async (res) => {
    if (res.status === 401) {
      await auth.logout();
      return Promise.reject({ message: '请重新登录' });
    }
    const data = res.json();

    if (res.ok) {
      return data;
    } else {
      // 和 axios 不一样，不会处理服务器返回的非2xx的错误，需要手动抛出
      const error = await data;
      message.error(error.message || '接口出错');
      return Promise.reject(error);
    }
  });
};

export const useHttp = () => {
  const { user } = useAuth();
  // utility types
  return (...[url, config]: Parameters<typeof http>) => {
    return http(url, { ...config, token: user?.token || '' });
  };
};
