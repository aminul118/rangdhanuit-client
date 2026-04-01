export class AppError extends Error {
  public statusCode: number;
  public errorSources?: unknown[];

  constructor(message: string, statusCode: number, errorSources?: unknown[]) {
    super(message);
    this.statusCode = statusCode;
    this.errorSources = errorSources;

    // Ensure the name is AppError
    this.name = this.constructor.name;

    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}
