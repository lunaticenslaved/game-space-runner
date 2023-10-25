import { ReactNode } from 'react';
import cn from 'classnames';
import block from 'bem-cn-lite';

import { ClassNameProp, RoundedProps, StyleProp, useStyles } from '../../utils';
import { Icon } from '../icon';

import './avatar.scss';

export type AvatarProps = RoundedProps &
  ClassNameProp &
  StyleProp & {
    iconClassName?: string;
    link?: string;
    placeholderIcon: ReactNode;
  };

const bAvatar = block('avatar');

export const Avatar = ({
  link,
  placeholderIcon,
  className,
  iconClassName,
  ...otherProps
}: AvatarProps) => {
  const { classes, styles } = useStyles({
    ...otherProps,
    className: cn(bAvatar(), className),
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
      <Icon icon={placeholderIcon} className={iconClassName} />
    </div>
  );
};
