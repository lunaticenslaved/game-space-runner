import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Store } from '@reduxjs/toolkit';

import { App } from './app/app.base';

export function render(url: string, store: Store) {
  return renderToString(
    <StaticRouter location={url}>
      <App store={store} />
    </StaticRouter>,
  );
}
