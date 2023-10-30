import { Avatar, AvatarProps } from '@mui/material';

import { UserIcon } from '..';

export type UserAvatarProps = Pick<AvatarProps, 'src' | 'alt'>;

export const UserAvatar = (props: UserAvatarProps) => {
  return (
    <Avatar {...props}>
      <UserIcon.Placeholder />
    </Avatar>
  );
};
