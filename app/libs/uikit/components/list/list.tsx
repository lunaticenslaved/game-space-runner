import { Fragment, ReactNode } from 'react';

import { ListItem, ListItemProps } from './parts/item';
import { bList } from './classes';

import './list.scss';

type RenderItemProps<T extends object> = Pick<ListItemProps, 'onSelect' | 'isActive'> & {
  item: T;
};

export type ListProps<T extends object> = {
  items: T[];
  value?: T;
  itemKey?: keyof T;
  onSelect?(item: T): void;
  renderItem(props: RenderItemProps<T>): ReactNode;
};

export function List<T extends object>({
  value,
  itemKey,
  items,
  onSelect,
  renderItem,
}: ListProps<T>) {
  return (
    <div className={bList()}>
      {items.map((item, index) => {
        console.log(itemKey && value ? value[itemKey] === item[itemKey] : false);

        return (
          <Fragment key={String(itemKey ? item[itemKey] || index : index)}>
            {renderItem({
              item,
              isActive: itemKey && value ? value[itemKey] === item[itemKey] : false,
              onSelect: onSelect ? () => onSelect(item) : undefined,
            })}
          </Fragment>
        );
      })}
    </div>
  );
}

List.Item = ListItem;
