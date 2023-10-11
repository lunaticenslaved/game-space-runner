import cn from 'classnames';
import React, { CSSProperties, useMemo } from 'react';

import { bGridCol } from '../../classnames';
import { AlignContentType, ColSpan, JustifyContentType } from '../../types';
import { getClassNames } from '../../utils';
import guttersStyles from '../../styles/gutters.module.scss';
import globalStyles from '../../styles/globals.module.css';

import './col.scss';

const width = (span?: ColSpan) => {
  return span ? `${(100 / 24) * span}%` : undefined;
};

export type ColProps = {
  align?: AlignContentType;
  justify?: JustifyContentType;
  children?: React.ReactNode;
  className?: string;
  dataTestId?: string;
  flex?: string;
  span?: ColSpan;
};

export const Col: React.FC<ColProps> = ({
  align,
  justify,
  children,
  className,
  dataTestId,
  flex,
  span,
}) => {
  const classes = useMemo(
    () =>
      cn(
        bGridCol(),
        getClassNames({}, {}),
        guttersStyles.col,
        align && globalStyles[`align-${align}`],
        justify && globalStyles[`justify-content-${justify}`],
        className,
      ),
    [justify, className, align],
  );
  const attributes = useMemo(() => ({ 'data-test-id': dataTestId }), [dataTestId]);
  const style: CSSProperties = useMemo(
    () => ({
      flex,
      flexBasis: width(span),
      maxWidth: width(span),
    }),
    [flex, span],
  );

  return (
    <div className={classes} style={style} {...attributes}>
      {children}
    </div>
  );
};
