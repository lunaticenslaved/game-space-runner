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
        <Card.Title title={header}></Card.Title>
        <Card.Subtitle>
          {!!description && <p className={styles.text}>{description}</p>}
        </Card.Subtitle>
        <Card.Body>{content}</Card.Body>
        <Card.Footer>
          <Button width="full" className={styles.btn} onClick={onButtonClick}>
            {buttonText}
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
