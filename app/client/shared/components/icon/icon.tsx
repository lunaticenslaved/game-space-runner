import { ReactNode, useMemo } from 'react';
import cn from 'classnames';

import styles from './icon.module.scss';

export type IconProps = {
  icon: ReactNode;
  className?: string;
  size?: number | 'max';
};

export const Icon = ({ icon, className: classNameProp, size = 24 }: IconProps) => {
  const style = useMemo(
    () => ({
      width: size === 'max' ? '100%' : `${size}px`,
      height: size === 'max' ? '100%' : `${size}px`,
    }),
    [size],
  );
  const className = useMemo(() => cn([classNameProp, styles.icon]), [classNameProp]);

  return (
    <div style={style} className={className}>
      {icon}
    </div>
  );
};
