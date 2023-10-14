import { HTMLProps, ReactNode } from 'react';

import { DialogInterface } from '../dialog';

export type CardProps = HTMLProps<HTMLDivElement> & {
  tag?: 'div' | 'dialog';
  loading?: boolean;
  maxWidth?: string | number;
  minWidth?: string | number;
  width?: string | number;
};

export type CardTitleProps = {
  dialog?: DialogInterface;
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: ReactNode;
};
