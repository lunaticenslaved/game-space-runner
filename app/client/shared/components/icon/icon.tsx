import { ReactNode, useMemo } from 'react';
import cn from 'classnames';

import styles from './icon.module.scss';

export type IconProps = {
  icon: ReactNode;
  className?: string;
  size?: number;
};

export const Icon = ({ icon, className: classNameProp, size = 24 }: IconProps) => {
  const style = useMemo(
    () => ({
      width: `${size}px`,
      height: `${size}px`,
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
