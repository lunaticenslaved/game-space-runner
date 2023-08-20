import cn from 'classnames';
import React, { useMemo } from 'react';

import { BreakpointsType } from '../../types';
import { getClassNames } from '../../utils';

import styles from './container.module.scss';

export type ContainerProps = {
  tag?: keyof JSX.IntrinsicElements;
  width?: BreakpointsType | 'full';
  gutter?: number;
  className?: string;
  children?: React.ReactNode;
  dataTestId?: string;
};

export const Container: React.FC<ContainerProps> = ({
  tag: Component = 'div',
  width,
  gutter,
  children,
  className,
}) => {
  const widthClass = useMemo(() => getClassNames({ component: width }, styles), [width]);
  const gutterClass = useMemo(() => getClassNames({ gutter }, styles), [gutter]);
  const classes = useMemo(
    () => cn(widthClass, gutterClass, className),
    [className, gutterClass, widthClass]
  );

  return <Component className={classes}>{children}</Component>;
};
