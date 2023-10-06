import React from 'react';
import cn from 'classnames';

import { bRow } from '../classes';
import { flex, FlexChildProps, FlexParentProps } from '../../../utils';

export type RowProps = FlexParentProps &
  FlexChildProps & {
    height?: 'full';
    tag?: keyof JSX.IntrinsicElements;
    className?: string;
    children?: React.ReactNode;
  };
export const Row: React.FC<RowProps> = ({
  tag: Component = 'div',
  height,
  children,
  className,
  ...otherProps
}) => {
  const classes = cn(className, bRow({ 'height-full': height === 'full' }), flex(otherProps));

  return <Component className={classes}>{children}</Component>;
};
