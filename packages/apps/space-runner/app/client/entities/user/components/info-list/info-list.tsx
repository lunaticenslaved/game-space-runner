import { useMemo } from 'react';

import { User } from '../..';

import styles from './info-list.module.scss';

export type InfoListProps = User;

export const InfoList = ({ login }: InfoListProps) => {
  const items = useMemo(() => [{ title: 'Логин', value: login }], [login]);

  return (
    <ul className={styles.list}>
      {items.map(({ title, value }) => (
        <li key={title} className={styles.listItem}>
          <div className={styles.listItem__title}>{title}</div>

          <div className={styles.listItem__value}>{value}</div>
        </li>
      ))}
    </ul>
  );
};
