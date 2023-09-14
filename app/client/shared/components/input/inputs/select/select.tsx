import { useCallback, useRef, useState } from 'react';

import { useClickOutside } from '@client/shared/hooks/useClickOutside';

import styles from './select.module.scss';

export type SelectItem<T extends SelectValueType> = { id: T; title: string };

export type SelectValueType = string | number;

export type SelectProps<T extends SelectValueType> = {
  value?: T;
  items: SelectItem<T>[];
  label: string;
  name: string;
  onChange?: (v?: T) => void;
};

export function Select<T extends SelectValueType>({
  items,
  value,
  label,
  onChange,
}: SelectProps<T>) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  const [activeItem, setActiveItem] = useState<SelectItem<T> | undefined>(
    items.find(item => item.id === value),
  );
  const close = useCallback(() => setShow(false), []);

  useClickOutside(ref, close, show);

  const handleChange = useCallback(
    (item?: SelectItem<T>) => {
      setActiveItem(item);

      if (onChange) {
        onChange(item?.id);
      }
    },
    [onChange],
  );

  return (
    <div className={styles.container}>
      <div ref={ref} className={styles.active} onClick={() => setShow(prev => !prev)}>
        {activeItem ? activeItem.title : label}
      </div>
      {show && (
        <div className={styles.list}>
          {items.map(item => (
            <div
              key={typeof item === 'string' ? item : item.id}
              className={styles.item}
              onClick={() => handleChange(item)}>
              {typeof item === 'string' ? item : item.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
