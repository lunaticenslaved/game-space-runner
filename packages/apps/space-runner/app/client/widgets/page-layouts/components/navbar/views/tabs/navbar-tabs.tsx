import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { useViewer } from '@client/features/viewer/get-viewer';
import { routes } from '@client/navigation';
import { Button } from '@client/shared/components/button';
import { useLogout } from '@client/features/auth/logout';

import { filterLinks } from '../../utils';

import styles from './navbar-tabs.module.scss';

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

      <div className={styles.button}>
        {isAuthenticated ? (
          <Button onClick={logout}>Выйти</Button>
        ) : (
          <Button href={routes.auth.signIn.path}>Войти</Button>
        )}
      </div>
    </div>
  );
};
