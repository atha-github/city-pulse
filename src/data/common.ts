import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

import { getItem } from '../utils/syncStorage';

let __requestCounter = 0;

export const appConfig = {
  apiUrl: "https://app.ticketmaster.com",
  timeout: 5000,
  apiKey: 'ChxN45pxcQ8KSJVJFwb8x7N2bIzFkUJh'
};

export const api = axios.create({
  baseURL: appConfig.apiUrl,
  timeout: appConfig.timeout,
});

export const getDefaultHeaders = async (extra: Record<string, any> = {}) => {
  const token = await getItem('token');
  return {
    Authorization: token ? `Bearer ${token}` : '',
    ...extra,
  };
};

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const id = ++__requestCounter;
    (config as any).__requestId = id;
    (config as any).__startTime = Date.now();

    const headers = { ...(config.headers || {}) } as any;
    if (typeof headers.Authorization === 'string') {
      const parts = headers.Authorization.split(' ');
      headers.Authorization = parts.length ? `${parts[0]} ****` : '****';
    }

    console.log(`[API REQUEST] [#${id}]`, {
      url: config.url,
      method: config.method,
      headers,
      data: config.data,
      params: config.params,
    });
    return config;
  },
  (error: AxiosError) => {
    console.error('[API REQUEST ERROR]', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    const id = (response.config as any).__requestId || 'n/a';
    const start = (response.config as any).__startTime || Date.now();
    const duration = Date.now() - start;
    console.log(`[API RESPONSE] [#${id}] ${response.config.url} (${duration}ms)`, {
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error: AxiosError) => {
    const id = (error.config as any)?._requestId || (error.config as any)?.__requestId || 'n/a';
    const start = (error.config as any)?.__startTime || Date.now();
    const duration = Date.now() - start;
    if (error.response) {
      console.error(`[API RESPONSE ERROR] [#${id}] ${error.config?.url} (${duration}ms)`, {
        status: error.response.status,
        data: error.response.data,
      });
    } else {
      console.error(`[API RESPONSE ERROR] [#${id}]`, error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
