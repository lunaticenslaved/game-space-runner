import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { Home, Gamepad, Person, Forum } from '@mui/icons-material';
import { Grid } from '@mui/material';

import { routes } from '@client/shared/navigation';
import { useViewer } from '@client/features/auth/get-viewer';
import { LogoutButton } from '@client/features/auth/logout';
import { ToSignInButton } from '@client/features/auth/sign-in';

import { filterLinks } from './utils';

const links = [
  { title: 'Главная', route: routes.home, icon: <Home /> },
  { title: 'Игра', route: routes.game.start, icon: <Gamepad /> },
  { title: 'Профиль', route: routes.profile.root, icon: <Person /> },
  { title: 'Форум', route: routes.forum.root, icon: <Forum /> },
];

export type TheNavbarProps = {
  className?: string;
};

export const TheNavbar = ({ className }: TheNavbarProps) => {
  const { access } = useViewer();
  const availableLinks = useMemo(() => filterLinks({ links, access }), [access]);
  const { isAuthenticated } = useViewer();

  return (
    <Grid container direction="column" className={cn('w-16 py-4', className)}>
      <Grid flexGrow={1} className="h-16 w-16">
        {isAuthenticated ? <LogoutButton /> : <ToSignInButton />}
      </Grid>

      <Grid flexGrow={1}>
        {availableLinks.map(({ title, icon, route: { path } }) => (
          <Link key={title} to={path} className="h-16 w-16 flex items-center justify-center">
            {icon}
          </Link>
        ))}
      </Grid>

      <Grid flexGrow={1}></Grid>
    </Grid>
  );
};
