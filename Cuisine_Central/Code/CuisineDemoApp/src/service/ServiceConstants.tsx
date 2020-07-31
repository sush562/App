import axios, {AxiosAdapter} from 'axios';
import {cacheAdapterEnhancer} from 'axios-extensions';

const baseUrl: string = 'https://developers.zomato.com/api/v2.1';
const userKey: string = 'Your_Key';
const acceptParam: string = 'application/json';

export const axiosClient = axios.create({
  baseURL: baseUrl,
  headers: {
    'Cache-Control': 'no-cache',
    'user-key': userKey,
    Accept: acceptParam,
  },
  adapter: cacheAdapterEnhancer(axios.defaults.adapter as AxiosAdapter, {
    enabledByDefault: false,
  }),
});

axiosClient.interceptors.request.use(
  function (config) {
    console.log(config);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    //console.log(response);
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);
