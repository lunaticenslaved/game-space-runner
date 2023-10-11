import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { TabsValue } from './types';
import { bTabItem, bTabs, bTabsList } from './classnames';

import './tabs.scss';

export type TabItem<T extends TabsValue = TabsValue> = {
  value: T;
  title: ReactNode;
  content?: ReactNode;
};

export type TabsProps<T extends TabsValue = TabsValue> = {
  tabs: TabItem<T>[];
  direction?: 'horizontal' | 'vertical';
  value?: T;
  onChange?: (value: T) => void;
};

export function Tabs<T extends TabsValue = TabsValue>({
  direction,
  tabs,
  value,
  onChange,
}: TabsProps<T>) {
  const [localValue, setLocalValue] = useState<unknown>(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const updateTab = useCallback(
    (tab: TabItem<T>) => {
      setLocalValue(tab.value);

      if (onChange) {
        onChange(tab.value);
      }
    },
    [onChange],
  );

  const tabsListClasses = useMemo(() => {
    return bTabsList({ vertical: direction === 'vertical' });
  }, [direction]);

  const tabItemClasses = useCallback(
    (tab: TabItem) => {
      return bTabItem({ active: tab.value === localValue });
    },
    [localValue],
  );

  return (
    <div className={bTabs()}>
      <div className={tabsListClasses}>
        {tabs.map(tab => (
          <div key={tab.value} className={tabItemClasses(tab)} onClick={() => updateTab(tab)}>
            {tab.title}
          </div>
        ))}
      </div>

      {tabs.find(tab => tab.value === localValue)?.content}
    </div>
  );
}
