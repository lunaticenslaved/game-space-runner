import styles from './empty.module.scss';

export const Empty = () => {
  return (
    <div className={styles.root}>
      <p>Нет комментариев</p>
    </div>
  );
};
