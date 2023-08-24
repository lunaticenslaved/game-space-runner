import { lazy } from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';

import { IS_RUNNING_SSR_IN_BROWSER } from '@client/shared/constants';

import '@client/shared/styles/index.scss';
import 'normalize.css';

const element = document.getElementById('root') as HTMLElement;
const App = lazy(() => import('./app/app'));

const render = async () => {
  console.log('IS_RUNNING_SSR_IN_BROWSER', IS_RUNNING_SSR_IN_BROWSER);

  const app = <App />;

  if (IS_RUNNING_SSR_IN_BROWSER) {
    hydrateRoot(element, app);
  } else {
    createRoot(element).render(app);
  }
};

render();
