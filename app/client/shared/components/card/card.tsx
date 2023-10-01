import { useMemo } from 'react';
import cn from 'classnames';

import { Body } from './parts/body';
import { Title } from './parts/title';
import { Subtitle } from './parts/subtitle';
import { Footer } from './parts/footer';
import { CardProps } from './types';

import './card.scss';

export const Card = ({ className, ...otherProps }: CardProps) => {
  const classes = useMemo(() => cn('card', className), [className]);

  return <div {...otherProps} className={classes} />;
};

Card.Title = Title;
Card.Subtitle = Subtitle;
Card.Body = Body;
Card.Footer = Footer;
