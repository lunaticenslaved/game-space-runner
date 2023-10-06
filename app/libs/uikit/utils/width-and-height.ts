import { CSSProperties } from 'react';

import { getSize } from '.';

export type WidthProps = {
  minWidth?: string | number;
  maxWidth?: string | number;
  width?: string | number;
};

export function width({ maxWidth, minWidth, width }: WidthProps): CSSProperties {
  return {
    maxWidth: getSize(maxWidth),
    minWidth: getSize(minWidth),
    width: getSize(width),
  };
}

export type HeightProps = {
  minHeight?: string | number;
  maxHeight?: string | number;
  height?: string | number;
};

export function height({ maxHeight, minHeight, height }: HeightProps): CSSProperties {
  return {
    maxHeight: getSize(maxHeight),
    minHeight: getSize(minHeight),
    height: getSize(height),
  };
}
