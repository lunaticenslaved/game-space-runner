import { ReactNode } from 'react';

import { CircularProgress, Grid } from '@mui/material';

export type PlaceholderProps = {
  className?: string;
  children?: ReactNode;
};

export const Placeholder = ({ className, children }: PlaceholderProps) => {
  return (
    <Grid className={className} alignItems="center" justifyContent="center">
      {children || <CircularProgress size={64} />}
    </Grid>
  );
};
