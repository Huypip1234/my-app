import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

// interceptors: Nhu middleware, dung de xu ly request truoc khi no di ra ngoai hoac response truoc khi no tra ve

// request interceptor
export const requestInterceptorToken = axiosClient.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`; // them token vao header cho moi request
    return config;
  },
  (error) => {
    // eslint-disable-next-line no-undef
    return Promise.reject(error);
  }
);

// response interceptor
export const responseInterceptorData = axiosClient.interceptors.response.use(
  (response) => {
    return response.data; // nhan ve response.data cho moi response
  },
  (error) => {
    if (error.response.status === 401) {
    }
    // eslint-disable-next-line no-undef
    return Promise.reject(error);
  }
);
