import { createElement } from 'react';
import cn from 'classnames';
import block from 'bem-cn-lite';

import { Progress } from '../progress';
import { useStyles } from '../../utils';

import { Body } from './parts/body';
import { Title } from './parts/title';
import { Subtitle } from './parts/subtitle';
import { Actions } from './parts/actions';
import { CardProps } from './types';

import './card.scss';

const bCard = block('card');

export const Card = ({
  className,
  loading,
  children,
  tag = 'div',
  rounded = 'md',
  ...otherProps
}: CardProps) => {
  const { classes, styles } = useStyles({ rounded, ...otherProps }, cn(bCard(), className));

  return createElement(
    tag,
    { className: classes, style: styles, ...otherProps },
    <>
      {loading && <Progress view="line" className={bCard('loader')} />}
      {children}
    </>,
  );
};

Card.Title = Title;
Card.Subtitle = Subtitle;
Card.Body = Body;
Card.Actions = Actions;
