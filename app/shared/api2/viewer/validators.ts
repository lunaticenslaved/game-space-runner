import { validationRules } from '@libs/validate';
import { validators } from '@shared/validators';

export const viewerValidators = {
  updateInfo: {
    login: validators.login('new'),
  },
  updateAvatar: {
    file: validationRules.required(),
  },
  updatePassword: {
    newPassword: validators.password('new'),
    oldPassword: validators.password('required'),
  },
};
