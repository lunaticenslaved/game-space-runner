import { useMemo } from 'react';

import { User } from '@shared/models/user';
import { Typography } from '@mui/material';

export type InfoListProps = User;

export const InfoList = ({ login }: InfoListProps) => {
  const items = useMemo(() => [{ title: 'Логин', value: login }], [login]);

  return (
    <ul className="list-none">
      {items.map(({ title, value }) => (
        <li key={title} className="flex justify-between">
          <Typography variant="body1" className="bold">
            {title}
          </Typography>
          <Typography variant="body1" align="right">
            {value}
          </Typography>
        </li>
      ))}
    </ul>
  );
};
