import { hydrateRoot, createRoot } from 'react-dom/client';

import { IS_RUNNING_SSR_IN_BROWSER } from '@client/shared/constants';
import { createStore } from '@shared/store';

import { App } from './app/app.spa';

import '@client/shared/styles/index.scss';
import 'normalize.css';

const element = document.getElementById('root') as HTMLElement;

console.log('IS_RUNNING_SSR_IN_BROWSER', IS_RUNNING_SSR_IN_BROWSER);

if (IS_RUNNING_SSR_IN_BROWSER) {
  const app = <App store={createStore(window.__REDUX_STORE__?.state.viewer)} />;
  hydrateRoot(element, app);
} else {
  const app = <App store={createStore()} />;
  createRoot(element).render(app);
}
