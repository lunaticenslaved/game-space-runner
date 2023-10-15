import { ReactNode } from 'react';
import cn from 'classnames';

import { bListItem } from '../classes';

export type ListItemProps = {
  children: ReactNode;
  onSelect?(): void;
  isActive?: boolean;
};

export const ListItem = ({ children, isActive, onSelect }: ListItemProps) => {
  return (
    <div
      className={cn(bListItem({ clickable: !!onSelect, active: !!isActive }), 'px-4')}
      onClick={onSelect}>
      {children}
    </div>
  );
};
