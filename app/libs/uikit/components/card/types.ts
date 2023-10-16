import { ReactNode } from 'react';

import { DialogInterface } from '../dialog';
import { ElevationProp, RadiusProp } from '../../utils';

export type CardProps = RadiusProp &
  ElevationProp & {
    tag?: 'div' | 'dialog';
    loading?: boolean;
    maxWidth?: string | number;
    minWidth?: string | number;
    width?: string | number;
    className?: string;
    children?: ReactNode;
    onClick?(): void;
  };

export type CardTitleProps = {
  dialog?: DialogInterface;
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: ReactNode;
};
