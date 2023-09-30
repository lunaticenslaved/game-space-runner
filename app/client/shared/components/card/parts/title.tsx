import { createElement, useMemo } from 'react';
import { Button } from '@client/shared/components/button';

import { CardTitleProps } from '../types';

export const Title = ({ title, level = 'h3', onClose }: CardTitleProps) => {
  const header = useMemo(() => createElement(level, {}, title), [level, title]);

  return (
    <div className="card__title">
      {header}
      {!!onClose && <Button onClick={onClose}>Close</Button>}
    </div>
  );
};
