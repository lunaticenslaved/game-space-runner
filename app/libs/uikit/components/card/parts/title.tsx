import { createElement, useMemo } from 'react';

import { Button } from '../../button';
import { CardTitleProps } from '../types';

export const Title = ({ children, level = 'h3', dialog }: CardTitleProps) => {
  const header = useMemo(() => createElement(level, {}, children), [level, children]);

  return (
    <div className="card__title card__part">
      {header}
      {!!dialog?.close && <Button onClick={dialog?.close}>Close</Button>}
    </div>
  );
};
