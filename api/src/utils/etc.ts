export class ApplicationError extends Error {
  public readonly status: number;
  
  constructor(status: number = HTTPStatus.INTERNAL, message: string) {
      super(message);
      this.status = status;
  }
}

export enum HTTPStatus {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  NOT_ACCEPTABLE = 406,
  INTERNAL = 500,
  NOT_IMPLEMENTED = 501,
  SERVICE_UNAVAILABLE = 503,
}
