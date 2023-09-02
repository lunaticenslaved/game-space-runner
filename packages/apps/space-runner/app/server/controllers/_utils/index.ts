import { Request, Response, Express } from 'express';
import bcrypt from 'bcrypt';

import { Context, context } from '@server/shared/context';
import { OperationResponse, ValidationObject } from '@shared/utils';
import { ApiError, UnknownError, ValidationError } from '@shared/errors';

export const createAction =
  <TBody = unknown, TResponse = unknown>(
    fn: (
      request: Request<unknown, unknown, TBody>,
      response: Response,
      context: Context
    ) => Promise<TResponse> | TResponse
  ) =>
  async (
    request: Request<unknown, unknown, TBody>,
    response: Response<OperationResponse<TResponse | null>>
  ) => {
    try {
      const result = await fn(request, response, context);

      return response.status(200).json({ result, error: null });
    } catch (err) {
      if (err instanceof ApiError) {
        const error = err as ApiError;

        return response.status(error.status).json({ result: null, error });
      } else {
        const error = err as Error;

        return response.status(500).json({
          result: null,
          error: new UnknownError({ errors: [error.message], status: 500 }),
        });
      }
    }
  };

export const validateObj = (rules: ValidationObject) => async (values: Record<string, unknown>) => {
  const errors: string[] = [];

  for (const key in rules) {
    const error = await rules[key](values[key]);

    if (error) {
      errors.push(`${key}: ${error}`);
    }
  }

  const hasErrors = errors.length > 0;

  return {
    errors: hasErrors ? errors : null,
    hasErrors,
  };
};

export const createRoutes = (fn: (app: Express) => void) => (app: Express) => {
  fn(app);
};

export const createHash = async (str: string) => {
  return bcrypt.hash(str, 10);
};

export const validateRequest = async (
  validator: ValidationObject,
  data: Record<string, unknown>
) => {
  const { errors } = await validateObj(validator)(data);

  if (errors) {
    throw new ValidationError({ errors });
  }
};
