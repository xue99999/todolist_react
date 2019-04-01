import fetch from 'dva/fetch';
import qs from 'qs';
import https from 'https';
// import {Toast} from 'antd-mobile';

import { getToken } from './authority';
import config from '../config';

// const statusMessage = {
//   200: '服务器成功返回请求的数据。',
//   201: '新建或修改数据成功。',
//   202: '一个请求已经进入后台排队（异步任务）。',
//   204: '删除数据成功。',
//   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//   403: '用户得到授权，但是访问是被禁止的。',
//   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//   405: '请求参数错误。',
//   406: '发送短息异常。',
//   407: '调用服务异常。',
//   409: '用户登陆册异常。',
//   410: '请求的资源被永久删除，且不会再得到的。',
//   411: '用户没有权限（令牌、用户名、密码错误）。',
//   412: '查询数据为空',
//   422: '当创建一个对象时，发生一个验证错误。',
//   500: '服务器发生错误，请检查服务器。',
//   501: '服务器内部错误常。',
//   502: '网关错误。',
//   503: '服务不可用，服务器暂时过载或维护。',
//   504: '修改密码失败。',
//   505: '参数转换异常',
//   507: '导出错误',
// };

// 基础地址
let baseUrl;
// 获取基础url
export function getBaseUrl() {
  if (!baseUrl) {
    return config.url;
  }
  return baseUrl;
}

export function getImage(keyId){
  return `${getBaseUrl()}/getImage?keyId=${keyId}`
}

function getOptions() {
  const url = getBaseUrl();
  if (url.split(':')[0] === 'https') {
    return {
      agent: new https.Agent({ rejectUnauthorized: false }),
      mode: 'cors',
    };
  }
  return {
    mode: 'cors',
  };
}

// token转化成BaseAuth
function _getBasicAuth(str) {
  // basicAuth 'Basic ' + Base64(token:password) password在服务器端为空
  return str ? 'Basic ' + window.btoa(str+":"):null;
}

export function getHeaders() {
  const token = getToken()
  const auth = _getBasicAuth(token)
  
  const headers = {
    Authorization: auth,
  }
  return headers;
}

/** *
 * 删除空参数
 * @param {*}
 * @returns {*}
 */
function removeEmptyObject(obj) {
  if (!obj) {
    return;
  }

  const resultObj = {};
  for (const i in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, i)) {
      // 如果不是undefind
      if (typeof obj[i] !== 'undefined' && obj[i] !== '' && obj[i] !== null && obj[i] !== 'all') {
        resultObj[i] = obj[i];
      }
      if (i === 'type' && obj[i] === 0) {
        resultObj[i] = 0;
      }
    }

  }
  return resultObj;
}

function checkCode(response) {
  const { error_code } = response;
  // TOKEN_ISBLANK: 用户未登录, TOKEN_FAILED: 用户登录失效
  if (error_code === 1002) {
    // eslint-disable-next-line
    window.g_app._store.dispatch({
      type: 'login/logout',
    });
    return;
  }

  return response;
}

/*
 * 业务校验
 * @param response
async function checkCode(result) {

  const status = (result && result.code) || null;
  if (status === 411) {
    router.push('login/logout');
    return;
  }

  return result;
  // const error = new Error(result && result.msg);
  // throw error;
} */


/**
 * data转url格式
 * @param data
 * @return string  a=b&c=d
 */
export const formatUrl = (data = {}) => qs.stringify(data);

/**
 * 增加指定的拓展参数
 * @param data
 * @return {*}
 */
export const addExtendProps = data => {
  if (data) {
    return  Object.assign({ VERSION: '1.0.0', CLIENT: 'WEB' }, data);
  }
  return { VERSION: '1.0.0', CLIENT: 'WEB' };
};



/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }

  return fetch(url, newOptions)
    .then(response => {
      if (response.status === 401) {
        // eslint-disable-next-line
        window.g_app._store.dispatch({
          type: 'login/logout',
        });
        throw new Error('服务器异常');
      }
      
      if (response.status === 403) {
        throw new Error('禁止访问');
      }
      return response.json();
    })
    .then(checkCode)
    .catch(e => {
      // eslint-disable-next-line
      console.error(e, '异常')
    })
}



/** *
 * POST 提交
 * @param url
 * @param data
 * @returns {Promise.<Object>}
 */
export async function post(url, data) {
  const options = {
    ...getOptions(),
    headers: {...getHeaders()},
    method: 'POST',
    body: addExtendProps(data),
  };
  return request(`${getBaseUrl()}${url}`, options);
}

/** *
 * PUT 提交
 * @param url
 * @param data
 * @returns {Promise.<Object>}
 */
export async function put(url, data) {
  const options = {
    ...getOptions(),
    headers: {...getHeaders()},
    method: 'PUT',
    body: addExtendProps(data),
  };
  return request(`${getBaseUrl()}${url}`, options);
}

/** *
 * DELETE 提交
 * @param url
 * @param data
 * @returns {Promise.<Object>}
 */
export async function del(url, data) {
  const options = {
    ...getOptions(),
    headers: {...getHeaders()},
    method: 'DELETE',
  };
  return request(`${getBaseUrl()}${url}`, options);
}

/**
 *  Requests a URL, returning a promise.  method:get
 * @param url
 * @returns {Promise.<void>}
 */
export async function get(url = '', data) {
  const options = {
    ...getOptions(),
    headers: getHeaders(),
    method: 'GET',
  };

  // 去除空值
  const newData = addExtendProps(removeEmptyObject(data));
  const requestUrl = `${getBaseUrl()}${url}?${formatUrl(newData)}`;

  return request(requestUrl, options);
}

