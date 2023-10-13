import { createElement, useMemo } from 'react';

import { Button } from '../../button';
import { CardTitleProps } from '../types';

export const Title = ({ children, level = 'h3', onClose }: CardTitleProps) => {
  const header = useMemo(() => createElement(level, {}, children), [level, children]);

  return (
    <div className="card__title card__part">
      {header}
      {!!onClose && <Button onClick={onClose}>Close</Button>}
    </div>
  );
};
