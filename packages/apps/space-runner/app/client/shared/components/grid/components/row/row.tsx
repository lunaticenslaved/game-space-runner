import cn from 'classnames';
import React, { useMemo } from 'react';

import { ResponsivePropertyType, AlignContentType, JustifyContentType } from '../../types';
import { getClassNames } from '../../utils';
import guttersStyles from '../styles/gutters.module.scss';
import globalStyles from '../styles/globals.module.css';

import styles from './index.module.css';

export type RowProps = {
  tag?: keyof JSX.IntrinsicElements;
  gutter?: ResponsivePropertyType;
  align?: AlignContentType;
  justify?: JustifyContentType;
  className?: string;
  children?: React.ReactNode;
  dataTestId?: string;
};

export const Row: React.FC<RowProps> = ({
  tag: Component = 'div',
  gutter = 16,
  align,
  justify,
  children,
  className,
  dataTestId,
}) => {
  const gutterClass = useMemo(() => getClassNames({ gutter }, guttersStyles), [gutter]);
  const classes = useMemo(
    () =>
      cn(
        styles.component,
        guttersStyles.row,
        gutterClass,
        align && globalStyles[`align-${align}`],
        justify && globalStyles[`justify-content-${justify}`],
        className
      ),
    [align, className, gutterClass, justify]
  );

  const attributes = useMemo(
    () => ({
      'data-test-id': dataTestId,
    }),
    [dataTestId]
  );

  return (
    <Component className={classes} {...attributes}>
      {children}
    </Component>
  );
};
