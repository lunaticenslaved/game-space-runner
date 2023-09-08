import { useMemo } from 'react';
import cn from 'classnames';

import styles from './Avatar.module.scss';

export type AvatarProps = {
  name?: string;
  size?: number;
  src?: string;
  className?: string;
};

const FONT_SIZE_FACTOR = 0.4;

export const Avatar = ({ src = '', size = 48, className }: AvatarProps) => {
  const style = useMemo(
    (): React.HTMLAttributes<HTMLElement>['style'] => ({
      width: size,
      height: size,
      lineHeight: size + 'px',
      fontSize: size * FONT_SIZE_FACTOR,
      objectFit: 'cover',
    }),
    [size],
  );

  const componentClassName = useMemo(() => cn(styles.avatar, className), [className]);

  if (src) {
    return <img src={src} className={componentClassName} style={style} />;
  }

  return <div className={componentClassName} style={style} />;
};
