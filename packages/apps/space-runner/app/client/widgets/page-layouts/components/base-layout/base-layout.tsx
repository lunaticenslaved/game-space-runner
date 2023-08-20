import { Suspense, PropsWithChildren } from 'react';

import { ViewPlaceholder } from '@client/shared/components/view-placeholder';

import { Navbar } from '../../components/navbar';
import { PageErrorBoundary } from '../../components/page-error-boundary';

import styles from './base-layout.module.scss';

export const BaseLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.root}>
      <Navbar />

      <main className={styles.main}>
        <PageErrorBoundary>
          <Suspense fallback={<ViewPlaceholder />}>{children}</Suspense>
        </PageErrorBoundary>
      </main>
    </div>
  );
};
