import { ReactNode } from 'react';
import block from 'bem-cn-lite';
import cn from 'classnames';

import { Progress } from '../progress';

import './placeholder.scss';

const bPlaceholder = block('placeholder');

export type PlaceholderProps = {
  classNames?: string;
  children?: ReactNode;
};

export const Placeholder = ({ classNames, children }: PlaceholderProps) => {
  return (
    <div className={cn(bPlaceholder(), classNames)}>
      {children || <Progress view="circle" size={64} />}
    </div>
  );
};
