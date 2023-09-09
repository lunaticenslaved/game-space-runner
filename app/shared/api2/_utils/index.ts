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
    return new Error('No error!');
  }

  return errorsMap[error.type as ApiErrorType](error);
};

export const createAction = <TResponse, TRequest>(fn: (data: TRequest) => Promise<Response>) => {
  return async (data: TRequest) => {
    let operationReponse: OperationResponse<TResponse> | undefined;

    try {
      const response = await fn(data);
      operationReponse = (await response.json()) as OperationResponse<TResponse>;
    } catch (err) {
      throw unwrapError(err as OperationResponse<TResponse>);
    }

    if (operationReponse.error) {
      throw unwrapError(operationReponse);
    }

    return operationReponse.result;
  };
};

export const customFetch = async (input: RequestInfo | URL, init?: RequestInit | undefined) => {
  const contentType = init?.body instanceof FormData ? undefined : 'application/json';

  const response = await fetch(input, {
    ...init,
    headers: {
      ...(contentType ? { 'Content-Type': contentType } : {}),
      ...init?.headers,
    },
  });

  return response;
};
