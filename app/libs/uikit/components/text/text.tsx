import { createElement } from 'react';
import { ChildrenProp, ClassNameProp, StyleProp } from '../../utils/types';
import { useStyles } from '@libs/uikit/utils';

export type TextProps = StyleProp &
  ClassNameProp &
  ChildrenProp & {
    as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
    weight?: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800';
  };

export const Text = ({ as, weight, children, ...otherProps }: TextProps) => {
  const { styles, classes } = useStyles({
    ...otherProps,
    style: { fontWeight: weight },
  });

  return createElement(as, { className: classes, style: styles }, children);
};
