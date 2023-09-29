import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { useViewer } from '@client/features/auth/get-viewer';
import { routes } from '@client/shared/navigation';
import { LogoutButton } from '@client/features/auth/logout';
import { ToSignInButton } from '@client/features/auth/sign-in';

import { filterLinks } from '../../utils';

import './navbar-tabs.scss';

const links = [
  { title: 'Главная', route: routes.home },
  { title: 'Игра', route: routes.game.start },
  { title: 'Лидерборд', route: routes.leaderBoard },
  { title: 'Профиль', route: routes.profile.root },
  { title: 'Форум', route: routes.forum.root },
];

export const NavbarTabs = () => {
  const { isAuthenticated, access } = useViewer();
  const availableLinks = useMemo(() => filterLinks({ links, access }), [access]);

  return (
    <div className="the-navbar-tabs">
      <div className="the-navbar-tabs__links">
        {availableLinks.map(({ title, route: { path } }) => (
          <NavLink
            key={title}
            to={path}
            className={({ isActive }) =>
              cn({
                'the-navbar-tabs__link-item': true,
                'the-navbar-tabs__link-item--active': isActive,
              })
            }>
            {title}
          </NavLink>
        ))}
      </div>

      {isAuthenticated ? <LogoutButton /> : <ToSignInButton />}
    </div>
  );
};
