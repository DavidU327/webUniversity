import axios from 'axios';
import Cookies from 'js-cookie';
import { getItem, removeItem } from '../../utility/localStorageControl';
import { COOKIE_WEB, TOKEN_WEB } from '../variable/variable';

class DataService {

  static get(path = '', baseURL) {
    return axios.get(path, {
      baseURL,
      headers: {
        Authorization: `Bearer ${getItem(TOKEN_WEB)}`,
      },
    });
  }

  static postAuth(path = '', data = {}, baseURL) {
    return axios.post(path, data, {
      baseURL,
      headers: {
        'Content-Type': 'application/json'
      },
    });
  }

  static post(path = '', data = {}, baseURL) {
    return axios.post(path, data, {
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getItem(TOKEN_WEB)}`,
      },
    });
  }

  static postFormData(path = '', formData, baseURL) {
    return axios.post(path, formData, {
      baseURL,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getItem(TOKEN_WEB)}`,
      },
    });
  }

  static patch(path = '', data = {}, baseURL) {
    return axios.patch(path, data, {
      baseURL,
      headers: {
        Authorization: `Bearer ${getItem(TOKEN_WEB)}`,
      },
    });
  }

  static delete(path = '', data = {}, baseURL) {
    return axios.delete(path, {
      baseURL,
      data,
      headers: {
        Authorization: `Bearer ${getItem(TOKEN_WEB)}`,
      },
    });
  }

  static put(path = '', data = {}, baseURL) {
    return axios.put(path, data, {
      baseURL,
      headers: {
        Authorization: `Bearer ${getItem(TOKEN_WEB)}`,
      },
    });
  }
}

axios.interceptors.response.use(
  response => response,
  error => {
    const { response } = error;
    if (response) {
      if (response.status === 401) {
        removeItem(TOKEN_WEB);
        Cookies.remove(COOKIE_WEB);
        window.location.href = '/';
      }
      if (response.status === 500) {
        console.error('Error 500 en el servidor');
      }
    }
    return Promise.reject(error);
  }
);

export { DataService };
