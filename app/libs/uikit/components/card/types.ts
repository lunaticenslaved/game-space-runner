import { HTMLProps, ReactNode } from 'react';

import { DialogInterface } from '../dialog';
import { Elevation } from '../../utils';

export type CardProps = HTMLProps<HTMLDivElement> & {
  tag?: 'div' | 'dialog';
  loading?: boolean;
  maxWidth?: string | number;
  minWidth?: string | number;
  width?: string | number;
  elevation?: Elevation;
};

export type CardTitleProps = {
  dialog?: DialogInterface;
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: ReactNode;
};
