import cn from 'classnames';

import './display.scss';

export type Display = 'block' | 'none' | 'flex';

export type DisplayProps = {
  display?: Display;
};

export function display({ display }: DisplayProps) {
  return cn({
    [`d-${display}`]: !!display,
  });
}
