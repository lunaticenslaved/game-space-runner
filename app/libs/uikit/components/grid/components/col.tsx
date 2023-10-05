import cn from 'classnames';
import React, { useMemo } from 'react';

import { bCol } from '../classes';
import { FlexProps, flex, WidthProps, width, ColsSpan, cols } from '../../../utils';

export type ColProps = FlexProps &
  WidthProps & {
    children?: React.ReactNode;
    className?: string;
    dataTestId?: string;
    cols?: ColsSpan;
  };

export const Col: React.FC<ColProps> = ({
  children,
  className,

  // span
  cols: colsSpan,

  // flex
  justifyContent,
  alignContent,
  grow,

  // width
  maxWidth,
  minWidth,
  width: widthProp,
}) => {
  const classes = cn(
    bCol(),
    flex({ justifyContent, alignContent, grow }),
    cols(colsSpan),
    className,
  );
  const style = useMemo(
    () =>
      width({
        maxWidth,
        minWidth,
        width: widthProp,
      }),
    [maxWidth, minWidth, widthProp],
  );

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
};
