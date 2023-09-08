import { HTMLProps, useMemo } from 'react';
import cn from 'classnames';

import style from './card.module.scss';

export type CardProps = HTMLProps<HTMLDivElement>;

export const Card = ({ className, ...otherProps }: CardProps) => {
  const classes = useMemo(() => cn([style.card, className]), [className]);

  return <div {...otherProps} className={classes} />;
};
