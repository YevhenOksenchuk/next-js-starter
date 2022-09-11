import axios from 'axios';
import { getCookie } from '../helpers/cookies';
import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const { NEXT_PUBLIC_BASE_URL } = process.env;

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  console.info(`[request] [${JSON.stringify(config)}]`);
  const accessToken = getCookie('token');

  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  console.info(`[response] [${JSON.stringify(response)}]`);
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[response error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}

// Possible to create more instance with different base urls
const template = axios.create({
                                baseURL: NEXT_PUBLIC_BASE_URL,
                              });

const instance = setupInterceptorsTo(template);

export default instance;