import { ReactNode, useMemo } from 'react';
import cn from 'classnames';

import { Icon } from '@client/shared/components/icon';

import styles from './avatar.module.scss';

export type AvatarProps = {
  link?: string;
  placeholderIcon: ReactNode;
  size?: number;
  className?: string;
};

export const Avatar = ({ link, placeholderIcon, className, size = 120 }: AvatarProps) => {
  const style = useMemo(
    () => ({
      width: `${size}px`,
      height: `${size}px`,
    }),
    [size],
  );
  const classes = useMemo(() => {
    return cn(className, styles.avatar);
  }, [className]);

  if (link) {
    return (
      <div className={classes} style={style}>
        <img className={styles.image} src={link} />
      </div>
    );
  }

  return (
    <div className={classes}>
      <Icon icon={placeholderIcon} size={size} />
    </div>
  );
};
