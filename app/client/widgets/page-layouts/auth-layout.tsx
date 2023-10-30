import { PropsWithChildren } from 'react';

import { Card, CardContent } from '@mui/material';

export type AuthLayoutProps = PropsWithChildren;

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div>
      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
};
