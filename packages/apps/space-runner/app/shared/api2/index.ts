export * from './auth/types';
export * from './viewer/types';
export * from './hooks';

import { authActions } from './auth/actions';
import { authValidators } from './auth/validators';
import { viewerActions } from './viewer/actions';
import { viewerValidators } from './viewer/validators';

export type QueryHandler<T = void> = {
  onSuccess?: T extends void ? () => void : (data: T) => void;
  onError?: () => void;
};

export const API = {
  auth: authActions,
  viewer: viewerActions,
};

export const API_VALIDATORS = {
  auth: authValidators,
  viewer: viewerValidators,
};
