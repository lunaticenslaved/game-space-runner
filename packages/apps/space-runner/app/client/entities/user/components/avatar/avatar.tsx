import { getResourceUrl } from '@client/shared/utils';
import { Icon } from '@client/shared/components/icon';
import UserIcon from '@client/shared/assets/svg/plain/user-icon.svg';

import styles from './avatar.module.scss';

export type AvatarProps = {
  link?: string;
};

export const Avatar = ({ link }: AvatarProps) => {
  if (link) {
    return (
      <div className={styles.avatar}>
        <img className={styles.image} src={getResourceUrl(link)} />
      </div>
    );
  }

  return (
    <div className={styles.avatar}>
      <Icon icon={<UserIcon />} size={120} />
    </div>
  );
};
