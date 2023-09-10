import { Avatar, AvatarProps } from '@client/shared/components/avatar';
import { UserIcon } from '../..';

export type UserAvatarProps = Pick<AvatarProps, 'link'>;

export const UserAvatar = ({ link }: UserAvatarProps) => {
  return <Avatar link={link} placeholderIcon={<UserIcon.Placeholder />} />;
};
