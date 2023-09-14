import { ReactNode } from 'react';

import { Button } from '@client/shared/components/button';
import { Card } from '@client/shared/components/card';

import styles from './game-layout.module.scss';

export type GameLayoutProps = {
  header: ReactNode;
  description?: ReactNode;
  content?: ReactNode;
  buttonText: ReactNode;
  onButtonClick: () => void;
};

export function GameLayout({
  header,
  description,
  content,
  buttonText,
  onButtonClick,
}: GameLayoutProps) {
  return (
    <div className={styles.root}>
      <Card>
        <h3 className={styles.title}>{header}</h3>
        {!!description && <p className={styles.text}>{description}</p>}
        {content}
        <Button className={styles.btn} onClick={onButtonClick}>
          {buttonText}
        </Button>
      </Card>
    </div>
  );
}
