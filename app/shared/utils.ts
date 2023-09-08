import { Validator } from '@libs/validate';

import {
  ApiError,
  ApiErrorType,
  AuthenticationError,
  ConflictError,
  UnknownError,
  ValidationError,
  NotFoundError,
  FileNotProvidedError,
  UnauthorizedError,
} from './errors';

export type ValidationObject = Record<string, Validator<unknown>>;

const errorsMap: Record<ApiErrorType, (data: ApiError) => ApiError> = {
  [ApiErrorType.UnknownError]: data => new UnknownError(data),
  [ApiErrorType.ValidationError]: data => new ValidationError(data),
  [ApiErrorType.AuthenticationError]: data => new AuthenticationError(data),
  [ApiErrorType.ConflictError]: data => new ConflictError(data),
  [ApiErrorType.NotFoundError]: data => new NotFoundError(data),
  [ApiErrorType.FileNotProvidedError]: data => new FileNotProvidedError(data),
  [ApiErrorType.UnauthorizedError]: data => new UnauthorizedError(data),
};

export type OperationResponse<TData> =
  | {
      result: TData;
      error: null;
    }
  | {
      result: null;
      error: ApiError;
    };

export type UnwrapOperationProps<T> = {
  response:
    | { data: T }
    | {
        error: unknown;
      };
  onSuccess?: (data: T) => void;
  onError?: (error: ApiError) => void;
};

export const unwrapError = <TData>(response: OperationResponse<TData>) => {
  const error = response.error;

  if (!error) {
    throw new Error('No error!');
  }

  return errorsMap[error.type as ApiErrorType](error);
};

export const unwrapOperation = <T>({ response, onSuccess, onError }: UnwrapOperationProps<T>) => {
  if ('data' in response) {
    if (onSuccess) {
      onSuccess((response.data as { result: T }).result);
    }
  } else {
    if (onError) {
      const { error } = (response.error as { data: { error: ApiError } }).data;
      const apiError = errorsMap[error.type as ApiErrorType](error);
      onError(apiError);
    }
  }
};
