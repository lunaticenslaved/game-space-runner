import { useMemo } from 'react';

import { User } from '../..';

import styles from './info-list.module.scss';

export type InfoListProps = User;

export const InfoList = ({
  email,
  login,
  first_name: firstName,
  second_name: secondName,
  phone,
}: InfoListProps) => {
  const items = useMemo(
    () => [
      { title: 'Почта', value: email },
      { title: 'Логин', value: login },
      { title: 'Имя', value: firstName },
      { title: 'Фамилия', value: secondName },
      { title: 'Телефон', value: phone },
    ],
    [email, login, firstName, secondName, phone]
  );

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
