import cn from 'classnames';
import React, { useMemo } from 'react';

import { Col } from './components/col';
import { Row } from './components/row';

import './styles.scss';

export type GridProps = {
  tag?: keyof JSX.IntrinsicElements;
  height?: 'full';
  className?: string;
  children?: React.ReactNode;
};

export const Grid = ({ tag: Component = 'div', height, children, className }: GridProps) => {
  const classes = useMemo(
    () =>
      cn(className, {
        'grid--height-full': height === 'full',
      }),
    [className, height],
  );

  return <Component className={classes}>{children}</Component>;
};

Grid.Row = Row;
Grid.Col = Col;
