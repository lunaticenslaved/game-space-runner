import cn from 'classnames';
import React, { useMemo } from 'react';

import { bCol } from '../classes';
import { FlexChildProps, flex, WidthProps, width, ColsSpan, cols } from '../../../utils';

export type ColProps = FlexChildProps &
  WidthProps & {
    children?: React.ReactNode;
    className?: string;
    dataTestId?: string;
    cols?: ColsSpan;
  };

export const Col: React.FC<ColProps> = ({ children, className, ...otherProps }) => {
  const classes = cn(bCol(), flex(otherProps), cols(otherProps.cols), className);
  const style = useMemo(() => width(otherProps), [otherProps]);

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
};
