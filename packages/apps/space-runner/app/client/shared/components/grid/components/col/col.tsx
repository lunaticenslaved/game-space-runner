import cn from 'classnames';
import React, { useMemo } from 'react';

import { ResponsivePropertyType, AlignContentType, JustifyContentType } from '../../types';
import { getClassNames } from '../../utils';
import guttersStyles from '../styles/gutters.module.scss';
import globalStyles from '../styles/globals.module.css';

import styles from './index.module.scss';

export type ColProps = {
  tag?: keyof JSX.IntrinsicElements;
  width?: ResponsivePropertyType;
  offset?: ResponsivePropertyType;
  order?: ResponsivePropertyType;
  align?: AlignContentType;
  justify?: JustifyContentType;
  className?: string;
  children?: React.ReactNode;
  dataTestId?: string;
};

export const Col: React.FC<ColProps> = ({
  tag: Component = 'div',
  width,
  offset,
  order,
  align,
  justify,
  children,
  className,
  dataTestId,
}) => {
  const classes = useMemo(
    () => getClassNames({ width, offset, order }, styles),
    [order, offset, width]
  );
  const componentClassName = useMemo(
    () =>
      cn(
        styles.component,
        guttersStyles.col,
        classes,
        align && globalStyles[`align-${align}`],
        justify && globalStyles[`justify-content-${justify}`],
        className
      ),
    [align, className, classes, justify]
  );
  const attributes = useMemo(
    () => ({
      'data-test-id': dataTestId,
    }),
    [dataTestId]
  );

  return (
    <Component className={componentClassName} {...attributes}>
      {children}
    </Component>
  );
};
