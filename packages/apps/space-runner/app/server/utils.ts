import { Request, Response, Express } from 'express';
import { Context, context } from '@server/context';
import { ValidationObject } from '@shared/utils';

export const createAction =
  <TBody = unknown, TReturn = unknown>(
    fn: (
      request: Request<TBody>,
      response: Response,
      context: Context
    ) => Promise<TReturn> | TReturn
  ) =>
  (request: Request<TBody>, response: Response) => {
    try {
      fn(request, response, context);
    } catch (error) {
      throw error;
    }
  };

export const validateObj = (rules: ValidationObject) => async (values: Record<string, unknown>) => {
  const errors: Record<string, string> = {};

  for (const key in rules) {
    const error = await rules[key](values[key]);

    if (error) {
      errors[key] = error;
    }
  }

  const hasErrors = Object.keys(errors).length > 0;

  return {
    errors: hasErrors ? errors : null,
    hasErrors,
  };
};

export const createRoutes = (fn: (app: Express) => void) => (app: Express) => {
  fn(app);
};
