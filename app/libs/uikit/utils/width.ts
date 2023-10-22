import { CSSProperties } from 'react';

export type WidthProps = {
  minWidth?: string | number;
  maxWidth?: string | number;
  width?: string | number;
};

export function width({ maxWidth, minWidth, width }: WidthProps): CSSProperties {
  return {
    maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
    minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth,
    width: typeof width === 'number' ? `${width}px` : width,
  };
}
