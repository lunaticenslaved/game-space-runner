import cn from 'classnames';

import { Color } from '.';

import './background.scss';

export type BackgroundProps = {
  backgroundColor?: Color;
};

export function background({ backgroundColor }: BackgroundProps) {
  return cn({
    [`bg-${backgroundColor}`]: !!backgroundColor,
  });
}
