import { PropsWithChildren, Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { ViewPlaceholder } from '@client/shared/components/view-placeholder';
import { ROUTES } from '@routers/routes';

import { Navbar } from '../../components/navbar';
import styles from './game.module.scss';

export function GameLayout() {
  useEffect(() => {
    document.body.dataset.level = sessionStorage.getItem('level') || 'first';
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Navbar view="icons" />
      </div>
      <Container>
        <Suspense fallback={<ViewPlaceholder />}>
          <Outlet />
        </Suspense>
      </Container>
    </div>
  );
}

type ContainerProps = PropsWithChildren;

const Container = ({ children }: ContainerProps) => {
  const location = useLocation();
  if (location.pathname === ROUTES.Game.path) {
    return <>{children}</>;
  }

  return <div className={styles.card}>{children}</div>;
};
