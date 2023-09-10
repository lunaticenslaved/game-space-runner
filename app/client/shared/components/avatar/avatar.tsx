import { ReactNode } from 'react';
import { Icon } from '@client/shared/components/icon';

import styles from './avatar.module.scss';

export type AvatarProps = {
  link?: string;
  placeholderIcon: ReactNode;
};

export const Avatar = ({ link, placeholderIcon }: AvatarProps) => {
  if (link) {
    return (
      <div className={styles.avatar}>
        <img className={styles.image} src={link} />
      </div>
    );
  }

  return (
    <div className={styles.avatar}>
      <Icon icon={placeholderIcon} size={120} />
    </div>
  );
};
