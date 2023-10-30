import { Grid, Typography } from '@mui/material';

export const Empty = () => {
  return (
    <Grid container className="justify-center">
      <Typography variant="body1">Нет комментариев</Typography>
    </Grid>
  );
};
