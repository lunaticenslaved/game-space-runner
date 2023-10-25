import { ReactNode } from 'react';
import cn from 'classnames';
import block from 'bem-cn-lite';

import { ClassNameProp, RoundedProps, StyleProp, useStyles } from '../../utils';
import { Icon } from '../icon';

import './avatar.scss';

export type AvatarProps = RoundedProps &
  ClassNameProp &
  StyleProp & {
    link?: string;
    placeholderIcon: ReactNode;
    size?: number;
  };

const bAvatar = block('avatar');

export const Avatar = ({
  link,
  placeholderIcon,
  className,
  style,
  size = 120,
  ...otherProps
}: AvatarProps) => {
  const { classes, styles } = useStyles({
    ...otherProps,
    className: cn(bAvatar(), className),
    style: { ...style, width: `${size}px`, height: `${size}px` },
  });

  if (link) {
    return (
      <div className={classes} style={styles}>
        <img className={bAvatar('image')} src={link} />
      </div>
    );
  }

  return (
    <div className={classes} style={styles}>
      <Icon icon={placeholderIcon} size={size} />
    </div>
  );
};
