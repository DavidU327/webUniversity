import axios from 'axios';
import { getItem } from '../../utility/localStorageControl';

class DataService {

  static get(path = '', baseURL) {
    return axios.get(path, {
      baseURL,
      headers: {
        Authorization: `Bearer ${getItem('access_token')}`,
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
        Authorization: `Bearer ${getItem('access_token')}`,
      },
    });
  }

  static postFormData(path = '', formData, baseURL) {
    return axios.post(path, formData, {
      baseURL,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getItem('access_token')}`,
      },
    });
  }

  static patch(path = '', data = {}, baseURL) {
    return axios.patch(path, data, {
      baseURL,
      headers: {
        Authorization: `Bearer ${getItem('access_token')}`,
      },
    });
  }


  static delete(path = '', data = {}, baseURL) {
    return axios.delete(path, {
      baseURL,
      data,
      headers: {
        Authorization: `Bearer ${getItem('access_token')}`,
      },
    });
  }

  static put(path = '', data = {}, baseURL) {
    return axios.put(path, data, {
      baseURL,
      headers: {
        Authorization: `Bearer ${getItem('access_token')}`,
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
        console.error('Token expirado o no autorizado');
        // Aquí podrías hacer logout o refresh de token
      }
      if (response.status === 500) {
        console.error('Error 500 en el servidor');
      }
    }
    return Promise.reject(error);
  }
);

export { DataService };
