import { ReactNode } from 'react';

import { DialogInterface } from '../dialog';
import { ElevationProp, RoundedProps, ClassNameProp, StyleProp } from '../../utils';

export type CardProps = RoundedProps &
  ElevationProp &
  ClassNameProp &
  StyleProp & {
    tag?: 'div' | 'dialog';
    loading?: boolean;
    children?: ReactNode;
    onClick?(): void;
  };

export type CardTitleProps = {
  dialog?: DialogInterface;
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: ReactNode;
};
