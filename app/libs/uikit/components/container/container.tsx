import { ReactNode } from 'react';

import {
  FlexParentProps,
  HeightProps,
  MarginAndPaddingProps,
  WidthProps,
  BackgroundProps,
  DisplayProps,
  useStyles,
} from '../../utils';

export type ContainerProps = FlexParentProps &
  MarginAndPaddingProps &
  BackgroundProps &
  HeightProps &
  DisplayProps &
  WidthProps & {
    children?: ReactNode;
    className?: string;
  };

export const Container = ({ children, className, ...otherProps }: ContainerProps) => {
  const { classes, styles } = useStyles(otherProps, className);

  return (
    <div style={styles} className={classes}>
      {children}
    </div>
  );
};
