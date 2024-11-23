import ENV from '@/configs/env';
import { errorHandler } from '@/helpers';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

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

    this.axiosInstance.interceptors.response.use(
      (response) => this.handleSuccessResponse(response),
      (error) => this.handleErrorResponse(error)
    );
  }

  public static getInstance(): CleanClient {
    if (!CleanClient.httpInstance) {
      CleanClient.httpInstance = new CleanClient();
    }

    return CleanClient.httpInstance;
  }

  private handleSuccessResponse(response: AxiosResponse) {
    return response;
  }

  private handleErrorResponse(error: AxiosError) {
    const config = (error.config as AxiosRequestConfig) || {};

    if (config.raw) {
      return Promise.reject(error);
    }

    return Promise.reject(errorHandler(error));
  }

  public getClient() {
    return this.axiosInstance;
  }
}
