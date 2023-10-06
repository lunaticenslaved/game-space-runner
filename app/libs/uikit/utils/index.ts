import { CSSProperties, useMemo } from 'react';
import { BackgroundProps, background } from './background';
import { DisplayProps, display } from './display';
import { ElevationProp, elevate } from './elevation';
import { FlexParentProps, FlexChildProps, flex } from './flex';
import { MarginAndPaddingProps, marginAndPadding } from './margin-and-padding';
import { RoundedProps, rounded } from './rounded';
import { WidthProps, width, HeightProps, height } from './width-and-height';

export * from './elevation';
export * from './rounded';
export * from './flex';
export * from './width-and-height';
export * from './margin-and-padding';
export * from './color';
export * from './background';
export * from './display';

export const getSize = (size: string | number | undefined) => {
  if (size === undefined) {
    return undefined;
  }

  if (typeof size === 'string') {
    return size;
  }

  return `${size}px`;
};

export type UseStylesProps = BackgroundProps &
  DisplayProps &
  ElevationProp &
  FlexParentProps &
  FlexChildProps &
  MarginAndPaddingProps &
  RoundedProps &
  WidthProps &
  HeightProps;

export type UseStylesReturn = {
  classes: string;
  styles: CSSProperties;
};

export type GetStylesProps = UseStylesProps & {
  classes?: string;
  styles?: CSSProperties;
};

export const getStyles = (props: GetStylesProps) => {
  const arr: Array<string | undefined | CSSProperties> = [
    background(props),
    display(props),
    elevate(props),
    flex(props),
    marginAndPadding(props),
    rounded(props),
    width(props),
    height(props),
  ];

  return arr.reduce<UseStylesReturn>(
    (acc, item) => {
      if (item && typeof item === 'string') {
        acc.classes += ' ' + item;
      } else if (typeof item === 'object') {
        acc.styles = { ...acc.styles, ...item };
      }

      return acc;
    },
    {
      classes: props.classes || '',
      styles: props.styles || {},
    },
  );
};

export const useStyles = (props: UseStylesProps, classes?: string, styles?: CSSProperties) => {
  return useMemo(
    () =>
      getStyles({
        ...props,
        classes,
        styles,
      }),
    [classes, props, styles],
  );
};
