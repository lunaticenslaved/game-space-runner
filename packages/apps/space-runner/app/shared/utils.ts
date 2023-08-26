import { Validator } from '@libs/validate';

import { ApiError, ApiErrorType, UnknownError, ValidationError } from './errors';

export type ValidationObject = Record<string, Validator<any>>;

const errorsMap: Record<ApiErrorType, (data: ApiError) => ApiError> = {
  [ApiErrorType.UnknownError]: data => new UnknownError(data),
  [ApiErrorType.ValidationError]: data => new ValidationError(data),
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

export const transformResponse = <T>(response: OperationResponse<T>) => {
  if (response.error === null) {
    return response.result;
  } else {
    const { error } = response;

    throw errorsMap[error.type](error);
  }
};
