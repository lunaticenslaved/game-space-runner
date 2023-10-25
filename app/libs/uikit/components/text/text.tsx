import { createElement } from 'react';
import { ChildrenProp, ClassNameProp, StyleProp } from '../../utils/types';
import { useStyles } from '@libs/uikit/utils';

export type TextProps = StyleProp &
  ClassNameProp &
  ChildrenProp & {
    as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  };

export const Text = ({ as, children, ...otherProps }: TextProps) => {
  const { styles, classes } = useStyles(otherProps);

  return createElement(as, { className: classes, style: styles }, children);
};
