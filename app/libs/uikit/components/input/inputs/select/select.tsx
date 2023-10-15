import { useCallback, useRef, useState } from 'react';
import block from 'bem-cn-lite';

import { InputWrapper, InputWrapperElementProps } from '../../components/input-wrapper';
import { Menu } from '../../../menu';
import { List } from '../../../list';
import { bInput } from '../../classes';

import './select.scss';

const bSelect = block('select');

export type SelectItem = { id: string; title: string };

export type SelectProps = InputWrapperElementProps<{
  value?: string;
  items: SelectItem[];
  name: string;
  onChange?: (v?: string) => void;
}>;

// TODO change it to list item?
// TODO update radius here

export function Select({ items, value, label, onChange }: SelectProps) {
  const ref = useRef(null);
  const [activeItem, setActiveItem] = useState<SelectItem | undefined>(
    items.find(item => item.id === value),
  );

  const handleChange = useCallback(
    (item?: SelectItem) => {
      setActiveItem(item);

      if (onChange) {
        onChange(item?.id);
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
            {activeItem ? activeItem.title : label}
          </div>
        }>
        <List<SelectItem>
          items={items}
          itemKey={'id'}
          onSelect={handleChange}
          renderItem={({ item, ...props }) => (
            <List.Item {...props}>{typeof item === 'string' ? item : item.title}</List.Item>
          )}
        />
      </Menu>
    </InputWrapper>
  );
}
