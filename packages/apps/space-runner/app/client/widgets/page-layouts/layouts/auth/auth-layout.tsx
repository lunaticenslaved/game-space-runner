import { PropsWithChildren } from 'react';

import { Card } from '@client/shared/components/card';

import styles from './auth-layout.module.scss';

export type AuthLayoutProps = PropsWithChildren;

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className={styles.root}>
      <Card>{children}</Card>
    </div>
  );
};
