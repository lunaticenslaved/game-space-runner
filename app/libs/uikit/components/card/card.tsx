import { createElement, useMemo } from 'react';
import cn from 'classnames';
import block from 'bem-cn-lite';

import { Progress } from '../progress';
import { getSize } from '../../utils';

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
  maxWidth,
  minWidth,
  width,
  tag = 'div',
  ...otherProps
}: CardProps) => {
  const classes = useMemo(() => cn(bCard(), className), [className]);
  const style = useMemo(() => {
    return {
      maxWidth: getSize(maxWidth),
      minWidth: getSize(minWidth),
      width: getSize(width),
    };
  }, [maxWidth, minWidth, width]);

  return createElement(
    tag,
    { className: classes, style, ...otherProps },
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
