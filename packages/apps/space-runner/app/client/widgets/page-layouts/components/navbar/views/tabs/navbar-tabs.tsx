import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { useViewer } from '@client/features/viewer/get-viewer';
import { routes } from '@client/navigation';
import { Button } from '@client/shared/components/button';
import { StyledLink } from '@client/shared/components/styled-link';
import { useLogout } from '@client/features/auth/logout';

import { filterLinks } from '../../utils';

import styles from './NavbarTabs.module.scss';

const links = [
  { title: 'Главная', route: routes.home },
  { title: 'Игра', route: routes.game.start },
  { title: 'Лидерборд', route: routes.leaderBoard },
  { title: 'Профиль', route: routes.profile.root },
  { title: 'Форум', route: routes.forum.root },
];

export const NavbarTabs = () => {
  const { isAuthenticated, access } = useViewer();
  const { logout } = useLogout();
  const availableLinks = useMemo(() => filterLinks({ links, access }), [isAuthenticated, links]);

  return (
    <div className={styles.navbar}>
      <div className={styles.links}>
        {availableLinks.map(({ title, route: { path } }) => (
          <NavLink
            key={title}
            to={path}
            className={({ isActive }) =>
              cn({
                [styles.linkItem]: true,
                [styles.linkItemActive]: isActive,
              })
            }>
            {title}
          </NavLink>
        ))}
      </div>

      {isAuthenticated ? (
        <div className={styles.button}>
          <Button onClick={logout}>Выйти</Button>
        </div>
      ) : (
        <div className={styles.button}>
          <StyledLink to={routes.auth.signIn.path}>Войти</StyledLink>
        </div>
      )}
    </div>
  );
};
