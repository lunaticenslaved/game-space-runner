import cn from 'classnames';
import React, { useMemo } from 'react';

import { bCol } from '../classes';
import { FlexProps, flex, WidthProps, width, Span, span } from '../../../utils';

export type ColProps = FlexProps &
  WidthProps & {
    children?: React.ReactNode;
    className?: string;
    dataTestId?: string;
    span?: Span;
  };

export const Col: React.FC<ColProps> = ({
  children,
  className,

  // span
  span: cols,

  // flex
  justifyContent,
  alignContent,
  grow,

  // width
  maxWidth,
  minWidth,
  width: widthProp,
}) => {
  const classes = cn(bCol(), flex({ justifyContent, alignContent, grow }), span(cols), className);
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
