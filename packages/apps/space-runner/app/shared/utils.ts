import { Validator } from '@libs/validate';

export type ValidationObject = Record<string, Validator<any>>;
