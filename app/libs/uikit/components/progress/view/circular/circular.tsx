import { CSSProperties, useMemo } from 'react';
import block from 'bem-cn-lite';
import cn from 'classnames';

import { ProgressCircularProps } from '../../types';

import './circular.scss';

const bSpinner = block('progress-circular');

export const ProgressCircular = ({ color, className, size = 24 }: ProgressCircularProps) => {
  const style = useMemo(
    (): CSSProperties => ({
      width: `${size}px`,
      height: `${size}px`,
      borderColor: color,
    }),
    [color, size],
  );

  return <span className={cn(bSpinner(), className)} style={style} />;
};
