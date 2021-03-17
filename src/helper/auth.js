// 在真实环境中，如果使用firebase这种第三方auth服务的话，本文件不需要开发者开发,前端模拟登录/注册接口
 
import { message } from 'antd';

const apiUrl = process.env.REACT_APP_API_URL;

const localStorageKey = '__auth_provider_token__';

// 获取本地 user.token 操作
export const getToken = () => window.localStorage.getItem(localStorageKey);

// user.token 储存本地
export const handleUserResponse = ({ user }) => {
  window.localStorage.setItem(localStorageKey, user.token || '');
  return user;
};

// 登录 逻辑
export const login = (data) => {
  return fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      const error = await response.json();
      message.error(error.message || '登陆失败，稍后重试...');
      return Promise.reject(error);
    }
  });
};

// 注册 逻辑
export const register = (data) => {
  return fetch(`${apiUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      const error = await response.json();
      message.error(error.message || '登陆失败，稍后重试...');
      return Promise.reject(error);
    }
  });
};

// 登出 逻辑
export const logout = async () => window.localStorage.removeItem(localStorageKey);
