import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { routes } from '@client/navigation';
import { useViewer } from '@client/features/viewer/get-viewer';
import HomeSVG from '@assets/svg/colored/home-icon.svg';
import LeaderboardSVG from '@assets/svg/colored/leaderboard-icon.svg';
import ProfileSVG from '@assets/svg/colored/profile-icon.svg';
import SettingsSVG from '@assets/svg/colored/settings-icon.svg';
import { filterLinks } from '../../utils';

import style from './NavbarIcons.module.scss';

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
