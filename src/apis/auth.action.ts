import { cleanApi, cleanClient } from '@/services/HttpClient';
import { AxiosRequestConfig } from 'axios';

const authAction = {
  async logIn() {
    const res = await cleanApi.get('/auth/login/customer');
    return res.config.headers.get('Location');
  },
  async decodeCookie<DecodedToken>(config?: AxiosRequestConfig) {
    const res = await cleanApi.get<DecodedToken>('/auth/decode', config);
    return res.data;
  },
};

export default authAction;
