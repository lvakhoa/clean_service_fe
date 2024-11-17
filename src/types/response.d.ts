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

type CleanSuccessGetAllResponseWrapper<T> = {
  statusCode: number;
  message: string;
  total: number;
  data: {
    results: T[];
    currentPage: number;
    nextPage: number | null;
    previousPage: number | null;
    totalItems: number;
    totalPages: number;
  };
};
