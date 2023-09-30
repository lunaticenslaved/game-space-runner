import { HTMLProps, ReactNode } from 'react';

export type CardProps = HTMLProps<HTMLDivElement>;

export type CardTitleProps = {
  onClose?: () => void;
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  title: ReactNode;
};
