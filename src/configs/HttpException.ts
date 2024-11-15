class HttpException extends Error {
  constructor(exceptionCode: string) {
    switch (exceptionCode) {
      case 'ERR/VALIDATION_FAILED':
        super('Validation failed');
        break;
      case 'ERR/NOT_FOUND':
        super('Not found');
        break;
      case 'ERR/UNAUTHORIZED':
        super('The session has expired, please login again');
        break;
      case 'ERR/FORBIDDEN':
        super("You don't have permission to access this resource");
        break;
      case 'ERR/INTERNAL_SERVER_ERROR':
        super('Something went wrong, please try again later');
        break;
      default:
        super('Something went wrong, please try again later');
        break;
    }
  }
}

export default HttpException;
