import { ReactNode, useMemo } from 'react';
import cn from 'classnames';
import block from 'bem-cn-lite';

import { RoundedProps, useStyles } from '../../utils';
import { Icon } from '../icon';

import './avatar.scss';

export type AvatarProps = RoundedProps & {
  link?: string;
  placeholderIcon: ReactNode;
  size?: number;
  className?: string;
};

const bAvatar = block('avatar');

export const Avatar = ({
  link,
  placeholderIcon,
  className,
  size = 120,
  ...otherProps
}: AvatarProps) => {
  const { classes, styles } = useStyles(
    otherProps,
    cn(bAvatar(), className),
    useMemo(() => ({ width: `${size}px`, height: `${size}px` }), [size]),
  );

  if (link) {
    return (
      <div className={classes} style={styles}>
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
