import React from 'react';
import cn from 'classnames';

import { bRow } from '../classes';
import { flex, FlexProps } from '../../../utils';

export type RowProps = FlexProps & {
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
  justifyContent,
  alignContent,
  grow,
}) => {
  const classes = cn(
    className,
    bRow({ 'height-full': height === 'full' }),
    flex({ justifyContent, alignContent, grow }),
  );

  return <Component className={classes}>{children}</Component>;
};
