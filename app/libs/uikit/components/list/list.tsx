import { Fragment, ReactNode } from 'react';

import { ListItem, ListItemProps } from './parts/item';
import { bList } from './classes';

import './list.scss';

type RenderItemProps<T extends Record<string, unknown>> = Pick<
  ListItemProps,
  'onSelect' | 'isActive'
> & {
  item: T;
};

export type ListSelectProps<T extends Record<string, unknown>> = {
  items: T[];
  itemKey: keyof T;
  value?: T;
  onChange?(item?: T): void;
};

export type ListProps<T extends Record<string, unknown>> = ListSelectProps<T> & {
  renderItem(props: RenderItemProps<T>): ReactNode;
};

export function List<T extends Record<string, unknown>>({
  value,
  itemKey,
  items,
  onChange,
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
              onSelect: onChange ? () => onChange(item) : undefined,
            })}
          </Fragment>
        );
      })}
    </div>
  );
}

List.Item = ListItem;
