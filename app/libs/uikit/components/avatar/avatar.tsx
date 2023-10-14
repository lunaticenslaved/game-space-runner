import { ReactNode, useMemo } from 'react';
import cn from 'classnames';
import block from 'bem-cn-lite';

import { Icon } from '../icon';

import './avatar.scss';

export type AvatarProps = {
  link?: string;
  placeholderIcon: ReactNode;
  size?: number;
  className?: string;
};

const bAvatar = block('avatar');

export const Avatar = ({ link, placeholderIcon, className, size = 120 }: AvatarProps) => {
  const style = useMemo(
    () => ({
      width: `${size}px`,
      height: `${size}px`,
    }),
    [size],
  );
  const classes = useMemo(() => {
    return cn(className, bAvatar());
  }, [className]);

  if (link) {
    return (
      <div className={classes} style={style}>
        <img className={bAvatar('image')} src={link} />
      </div>
    );
  }

  return (
    <div className={classes}>
      <Icon icon={placeholderIcon} size={size} />
    </div>
  );
};
