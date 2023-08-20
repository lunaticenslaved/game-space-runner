import { useCallback, useRef, useState } from 'react';

import { useClickOutside } from '@client/shared/hooks/useClickOutside';

import styles from './select.module.scss';

export type SelectItem = string | { id: number | string; title: string };

export type SelectProps<T extends SelectItem> = {
  value?: T | null;
  items: T[];
  label: string;
  name: string;
  onChange?: (v: T | null) => void;
};

export function Select<T extends SelectItem>({ items, value, label, onChange }: SelectProps<T>) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  const close = useCallback(() => setShow(false), []);

  useClickOutside(ref, close, show);

  const handleChange = useCallback(
    (item: T) => {
      if (onChange) {
        onChange(item);
      }
    },
    [onChange]
  );

  return (
    <div className={styles.container}>
      <div ref={ref} className={styles.active} onClick={() => setShow(prev => !prev)}>
        {value ? (typeof value === 'string' ? value : value.title) : label}
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
