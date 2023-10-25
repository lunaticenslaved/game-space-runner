import {
  FlexParentProps,
  HeightProps,
  MarginAndPaddingProps,
  WidthProps,
  BackgroundProps,
  DisplayProps,
  useStyles,
  ClassNameProp,
  StyleProp,
  ChildrenProp,
} from '../../utils';

export type ContainerProps = FlexParentProps &
  MarginAndPaddingProps &
  BackgroundProps &
  HeightProps &
  DisplayProps &
  ClassNameProp &
  StyleProp &
  WidthProps &
  ChildrenProp;

export const Container = ({ children, ...otherProps }: ContainerProps) => {
  const { classes, styles } = useStyles(otherProps);

  return (
    <div style={styles} className={classes}>
      {children}
    </div>
  );
};
