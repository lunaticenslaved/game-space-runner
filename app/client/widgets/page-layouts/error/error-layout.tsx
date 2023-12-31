import { Button } from '@libs/uikit/components/button';

import styles from './error-layout.module.scss';

export type ErrorLayoutProps = {
  error: string;
  title: string;
  onHomeClick: () => void;
};

export const ErrorLayout = ({ error, title, onHomeClick }: ErrorLayoutProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <h1 className={styles.name}>{error}</h1>
        <h2 className={styles.title}>{title}</h2>
        <Button onClick={onHomeClick}>Назад к игре</Button>
      </div>
    </div>
  );
};
