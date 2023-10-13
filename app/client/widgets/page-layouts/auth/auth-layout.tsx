import { PropsWithChildren } from 'react';

import { Card } from '@libs/uikit/components/card';

import styles from './auth-layout.module.scss';

export type AuthLayoutProps = PropsWithChildren;

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className={styles.root}>
      <Card className={styles.card}>
        <Card.Body>{children}</Card.Body>
      </Card>
    </div>
  );
};
