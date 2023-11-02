import { useMemo } from 'react';
import cn from 'classnames';

import { User } from '@shared/models/user';
import { Typography } from '@mui/material';

export type InfoListProps = {
  className?: string;
  user: User;
};

export const InfoList = ({ className }: InfoListProps) => {
  const items = useMemo(() => [], []);

  return (
    <ul className={cn('list-none', className)}>
      {items.map(({ title, value }) => (
        <li key={title} className="flex justify-between">
          <Typography variant="body1" className="font-bold">
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
