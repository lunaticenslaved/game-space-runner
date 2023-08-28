import { hydrateRoot, createRoot } from 'react-dom/client';

import { IS_RUNNING_SSR_IN_BROWSER } from '@client/shared/constants';
import { createStore } from '@client/shared/store';
import { App } from './app/app.spa';

import '@client/shared/styles/index.scss';
import 'normalize.css';

const element = document.getElementById('root') as HTMLElement;

const render = async () => {
  console.log('IS_RUNNING_SSR_IN_BROWSER', IS_RUNNING_SSR_IN_BROWSER);

  const app = <App store={createStore()} />;

  if (IS_RUNNING_SSR_IN_BROWSER) {
    hydrateRoot(element, app);
  } else {
    createRoot(element).render(app);
  }
};

render();
