export type { AuthFormProps } from './components/auth-form';
export type { UserAvatarProps } from './components/avatar';
export type { InfoListProps } from './components/info-list';

import { AuthForm } from './components/auth-form';
import { UserAvatar } from './components/avatar';
import { InfoList } from './components/info-list';

import { ReactComponent as Placeholder } from '@client/shared/assets/svg/plain/user-icon.svg';

export const UserComponent = {
  Avatar: UserAvatar,
  AuthForm,
  InfoList,
};

export const UserIcon = {
  Placeholder,
};
