import { ReactNode } from 'react';

export type TabsValue = string | number | undefined;

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
