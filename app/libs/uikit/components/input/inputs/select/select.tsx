import { useCallback, useRef, useState } from 'react';
import block from 'bem-cn-lite';

import { InputWrapper, InputWrapperElementProps } from '../../components/input-wrapper';
import { Menu } from '../../../menu';
import { List, ListSelectProps } from '../../../list';
import { bInput } from '../../classes';

import './select.scss';

const bSelect = block('select');

export type SelectProps<T extends Record<string, unknown>> = ListSelectProps<T> &
  InputWrapperElementProps<{
    itemTitle: keyof T;
    name: string;
  }>;

// TODO update radius here

export function Select<T extends Record<string, unknown>>({
  items,
  itemKey,
  itemTitle,
  value,
  label,
  onChange,
}: SelectProps<T>) {
  const ref = useRef(null);
  const [activeItem, setActiveItem] = useState<T | undefined>(
    items.find(item => value && item[itemKey] === value[itemKey]),
  );

  const handleChange = useCallback(
    (item?: T) => {
      setActiveItem(item);

      if (onChange) {
        onChange(item);
      }
    },
    [onChange],
  );

  return (
    <InputWrapper className={bSelect()}>
      <Menu
        closeOnClick
        activator={
          <div ref={ref} className={bInput()} tabIndex={1}>
            {activeItem ? String(activeItem[itemTitle]) : label}
          </div>
        }>
        <List<T>
          value={activeItem}
          items={items}
          itemKey={itemKey}
          onChange={handleChange}
          renderItem={({ item, ...props }) => (
            <List.Item {...props}>
              {typeof item === 'string' ? item : String(item[itemTitle])}
            </List.Item>
          )}
        />
      </Menu>
    </InputWrapper>
  );
}
