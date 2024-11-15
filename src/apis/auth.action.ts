import { cleanApi, cleanClient } from '@/services/HttpClient';
import { AxiosRequestConfig } from 'axios';

const authAction = {
  async logOut(config?: AxiosRequestConfig) {
    const res = await cleanApi.delete<CleanSuccessResponseWrapper>(
      '/auth/logout',
      config
    );
    return res.data;
  },
  async decodeCookie(config?: AxiosRequestConfig) {
    const res = await cleanApi.post<CleanSuccessResponseWrapper<DecodedToken>>(
      '/auth/decode',
      {},
      config
    );
    return res.data;
  },
};

export default authAction;
