import { useMemo } from 'react';
import block from 'bem-cn-lite';
import cn from 'classnames';

import { ProgressLinearProps } from '../../types';

import './linear.scss';

const bProgress = block('progress-linear');
const bIndeterminate = block('progress-linear--indeterminate');
const bShort = block('progress-linear__short');
const bLong = block('progress-linear__long');

export const ProgressLinear = ({ size = 6, color, className }: ProgressLinearProps) => {
  const style = useMemo(
    () => ({
      height: `${size}px`,
      maxHeight: `${size}px`,
      minHeight: `${size}px`,
    }),
    [size],
  );

  const colorStyle = useMemo(() => ({ backgroundColor: color }), [color]);

  return (
    <div className={cn(bProgress(), className)} style={style}>
      <div className={bProgress('background')} style={colorStyle} />
      <div className={bIndeterminate()}>
        <div className={bShort()} style={colorStyle} />
        <div className={bLong()} style={colorStyle} />
      </div>
    </div>
  );
};
