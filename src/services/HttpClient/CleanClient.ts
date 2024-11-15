import ENV from '@/configs/ENV';
import { errorHandler } from '@/helpers';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    raw?: boolean;
    silent?: boolean;
  }
}

export default class CleanClient {
  static httpInstance?: CleanClient;

  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: ENV.API_BASE_URL,
      timeout: 15000,
      withCredentials: true,
    });

    this.axiosInstance.interceptors.response.use(this.responseErrorHandler);
  }

  public static getInstance(): CleanClient {
    if (!CleanClient.httpInstance) {
      CleanClient.httpInstance = new CleanClient();
    }

    return CleanClient.httpInstance;
  }

  private responseErrorHandler(response: any) {
    if (response.status >= 200 && response.status <= 300) {
      return response;
    }

    const config = response.config;
    if (config.raw) {
      return response;
    }

    return errorHandler(response);
  }

  public getClient() {
    return this.axiosInstance;
  }
}
