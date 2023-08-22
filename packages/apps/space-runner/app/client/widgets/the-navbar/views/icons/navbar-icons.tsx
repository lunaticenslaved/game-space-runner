import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { routes } from '@client/navigation';
import { useViewer } from '@client/features/auth';
import HomeSVG from '@client/shared/assets/svg/colored/home-icon.svg';
import LeaderboardSVG from '@client/shared/assets/svg/colored/leaderboard-icon.svg';
import ProfileSVG from '@client/shared/assets/svg/colored/profile-icon.svg';
import SettingsSVG from '@client/shared/assets/svg/colored/settings-icon.svg';
import { filterLinks } from '../../utils';

import style from './navbar-icons.module.scss';

const links = [
  { title: 'Главная', route: routes.home, icon: <HomeSVG /> },
  { title: 'Лидерборд', route: routes.leaderBoard, icon: <LeaderboardSVG /> },
  { title: 'Профиль', route: routes.profile.root, icon: <ProfileSVG /> },
  { title: 'Форум', route: routes.profile.root, icon: <SettingsSVG /> },
];

export const NavbarIcons = () => {
  const { isAuthenticated, access } = useViewer();
  const availableLinks = useMemo(() => filterLinks({ links, access }), [isAuthenticated, links]);

  return (
    <div className={style.navbarIcons}>
      {availableLinks.map(({ title, icon, route: { path } }) => (
        <Link key={title} to={path} className={style.navbarItem}>
          {icon || title}
        </Link>
      ))}
    </div>
  );
};
