import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import block from 'bem-cn-lite';
import cn from 'classnames';

import { routes } from '@client/shared/navigation';
import { useViewer } from '@client/features/auth/get-viewer';
import { Icon } from '@libs/uikit/components/icon';
import { LogoutButton } from '@client/features/auth/logout';
import { ToSignInButton } from '@client/features/auth/sign-in';

import HomeSVG from './icons/home-icon.svg';
import LeaderBoardSVG from './icons/leader-board-icon.svg';
import ProfileSVG from './icons/profile-icon.svg';
import SettingsSVG from './icons/settings-icon.svg';
import { filterLinks } from './utils';

import './the-navbar.scss';

const bNavbar = block('widgets-the-navbar');

const links = [
  { title: 'Главная', route: routes.home, icon: <HomeSVG /> },
  { title: 'Игра', route: routes.game.start, icon: <LeaderBoardSVG /> },
  { title: 'Профиль', route: routes.profile.root, icon: <ProfileSVG /> },
  { title: 'Форум', route: routes.forum.root, icon: <SettingsSVG /> },
];

export type TheNavbarProps = {
  className?: string;
};

export const TheNavbar = ({ className }: TheNavbarProps) => {
  const { access } = useViewer();
  const availableLinks = useMemo(() => filterLinks({ links, access }), [access]);
  const classNames = useMemo(() => cn(className, bNavbar()), [className]);
  const { isAuthenticated } = useViewer();

  return (
    <div className={classNames}>
      {isAuthenticated ? <LogoutButton /> : <ToSignInButton />}

      <div className={bNavbar('links')}>
        {availableLinks.map(({ title, icon, route: { path } }) => (
          <Link key={title} to={path} className={bNavbar('item')}>
            <Icon icon={icon} size={'max'} />
          </Link>
        ))}
      </div>

      {/* placeholder */}
      <div />
    </div>
  );
};
