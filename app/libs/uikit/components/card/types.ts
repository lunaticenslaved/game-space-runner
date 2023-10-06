import { ReactNode } from 'react';

import { DialogInterface } from '../dialog';
import { ElevationProp, HeightProps, RoundedProps, WidthProps } from '../../utils';

export type CardProps = RoundedProps &
  ElevationProp &
  WidthProps &
  HeightProps & {
    tag?: 'div' | 'dialog';
    loading?: boolean;
    className?: string;
    children?: ReactNode;
    onClick?(): void;
  };

export type CardTitleProps = {
  dialog?: DialogInterface;
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: ReactNode;
};
