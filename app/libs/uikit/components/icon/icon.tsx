import { ReactNode, useMemo } from 'react';
import cn from 'classnames';
import block from 'bem-cn-lite';

import './icon.scss';

export type IconProps = {
  icon: ReactNode;
  className?: string;
  size?: number | 'max';
};

const bIcon = block('icon');

export const Icon = ({ icon, className: classNameProp, size = 24 }: IconProps) => {
  const style = useMemo(
    () => ({
      width: size === 'max' ? '100%' : `${size}px`,
      height: size === 'max' ? '100%' : `${size}px`,
    }),
    [size],
  );
  const className = useMemo(() => cn([classNameProp, bIcon()]), [classNameProp]);

  return (
    <span style={style} className={className}>
      {icon}
    </span>
  );
};
