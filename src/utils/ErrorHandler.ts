class ApiError extends Error {
  public statusCode: number;
  public data: unknown;
  public success: boolean;
  public errors: string[];

  constructor(statusCode: number, message: string = 'Something went wrong', errors: string[] = [], stack: string = '') {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
    this.errors = errors;

    if (stack) this.stack = stack;
    else Error.captureStackTrace(this, this.constructor);
  }
}

export { ApiError };
