import { ApiError, ApiErrorType } from './base-error';

export * from './base-error';

export class ValidationError extends ApiError {
  public type = ApiErrorType.ValidationError;
}

export class UnknownError extends ApiError {
  public type = ApiErrorType.UnknownError;
}
