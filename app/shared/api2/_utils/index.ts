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
} from '@shared/errors';

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

const unwrapError = <TData>(response: OperationResponse<TData>) => {
  const error = response.error;

  if (!error) {
    throw new Error('No error!');
  }

  return errorsMap[error.type as ApiErrorType](error);
};

export const createAction = <TResponse, TRequest>(fn: (data: TRequest) => Promise<Response>) => {
  return async (data: TRequest) => {
    try {
      const response = await fn(data);
      const body = (await response.json()) as OperationResponse<TResponse>;

      if (body.error) {
        throw unwrapError(body);
      }

      return body.result;
    } catch (err) {
      throw unwrapError(err as OperationResponse<TResponse>);
    }
  };
};

export const customFetch = async (input: RequestInfo | URL, init?: RequestInit | undefined) => {
  const response = await fetch(input, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  return response;
};
