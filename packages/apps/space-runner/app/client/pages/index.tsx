import { Suspense } from 'react';
import { Route, Outlet } from 'react-router-dom';

import { ViewPlaceholder } from '@client/shared/components/view-placeholder';
import { Navbar } from '@client/widgets/the-navbar';
import { PageErrorBoundary } from '@client/widgets/page-error-boundary';

import { Router as HomeRouter } from './home';
import { Router as AuthRouter } from './auth';
import { Router as ForumRouter } from './forum';
import { Router as GameRouter } from './game';
import { Router as LeaderBoardRouter } from './leader-board';
import { Router as ProfileRouter } from './profile';
import { Router as ErrorRouter } from './error';
import styles from './index.module.scss';

const DefaultLayout = (
  <div className={styles.root}>
    <Suspense fallback={<ViewPlaceholder />}>
      <PageErrorBoundary>
        <Navbar />

        <main className={styles.main}>
          <Suspense fallback={<ViewPlaceholder />}>
            <Outlet />
          </Suspense>
        </main>
      </PageErrorBoundary>
    </Suspense>
  </div>
);

export const Pages = (
  <Route element={DefaultLayout}>
    {HomeRouter}
    {LeaderBoardRouter}
    {ProfileRouter}
    {ForumRouter}
    {AuthRouter}
    {GameRouter}
    {ErrorRouter}
  </Route>
);
