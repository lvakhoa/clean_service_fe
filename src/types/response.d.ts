type CleanSuccessResponseWrapper<T = null> = {
  statusCode: number;
  message: string;
  data?: T;
};

type CleanErrorResponseWrapper = {
  statusCode: number;
  message: string;
  exceptionCode: string;
  errors?: string[];
};
