import { useMemo } from 'react';
import cn from 'classnames';
import block from 'bem-cn-lite';

import { Progress } from '../progress';

import { Body } from './parts/body';
import { Title } from './parts/title';
import { Subtitle } from './parts/subtitle';
import { Actions } from './parts/actions';
import { CardProps } from './types';

import './card.scss';

const bCard = block('card');

export const Card = ({ className, loading, children, ...otherProps }: CardProps) => {
  const classes = useMemo(() => cn(bCard(), className), [className]);

  return (
    <div {...otherProps} className={classes}>
      {loading && <Progress view="line" className={bCard('loader')} />}
      {children}
    </div>
  );
};

Card.Title = Title;
Card.Subtitle = Subtitle;
Card.Body = Body;
Card.Actions = Actions;
