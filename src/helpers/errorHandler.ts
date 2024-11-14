import HttpException from '@/configs/HttpException';
import axios from 'axios';

export const errorHandler = (error: any) => {
  if (axios.isAxiosError(error)) {
    const response = error?.response;
    const request = error?.request;
    const code = error?.code;
    const config = error?.config;

    if (code === 'ECONNABORTED') {
      throw new Error('ERR/CONNECTION_TIMEOUT');
    }

    if (response) {
      var exceptionCode = response.data.exceptionCode;
      if (exceptionCode) {
        throw new HttpException(exceptionCode);
      }
    }
  }
};
