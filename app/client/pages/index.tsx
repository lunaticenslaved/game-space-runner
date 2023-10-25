import { Suspense } from 'react';
import { Route, Outlet } from 'react-router-dom';
import block from 'bem-cn-lite';

import { Placeholder } from '@libs/uikit/components/placeholder';
import { TheNavbar } from '@client/widgets/the-navbar';
import { PageErrorBoundary } from '@client/widgets/page-error-boundary';

import { Router as HomeRouter } from './home';
import { Router as AuthRouter } from './auth';
import { Router as ForumRouter } from './forum';
import { Router as GameRouter } from './game';
import { Router as ProfileRouter } from './profile';
import { Router as ErrorRouter } from './error';

import './index.scss';

const bPages = block('pages-index');

const Layout = (
  <div className={bPages()}>
    <TheNavbar className={bPages('navbar')} />

    <main className={bPages('content')}>
      <PageErrorBoundary>
        <Suspense fallback={<Placeholder />}>
          <Outlet />
        </Suspense>
      </PageErrorBoundary>
    </main>
  </div>
);

export const Pages = (
  <Route element={Layout}>
    {HomeRouter}
    {ProfileRouter}
    {ForumRouter}
    {AuthRouter}
    {GameRouter}
    {ErrorRouter}
  </Route>
);
