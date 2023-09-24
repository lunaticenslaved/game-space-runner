import fs from 'fs';
import path from 'path';
import express from 'express';
import { createServer as createViteServer } from 'vite';

import { PORT } from '@server/shared/constants';
import { context } from '@server/shared/context';
import { addRouter } from '@server/controllers';
import { ROOT_PATH } from '@server/shared/constants';

import { addSSRRoute, configureApp } from './utils';

const APP_PATH = path.resolve(ROOT_PATH, 'app');
const CLIENT_RENDER_FILE_PATH = path.resolve(APP_PATH, 'client/index.server');
const CLIENT_STORE_FILE_PATH = path.resolve(APP_PATH, 'shared/store/index');
const CLIENT_HTML_FILE_PATH = path.resolve(ROOT_PATH, 'index.html');

export async function createApp() {
  await context.prisma.$connect();

  const app = express();
  const vite = await createViteServer({
    server: { middlewareMode: true },
    root: ROOT_PATH,
    appType: 'custom',
    configFile: 'vite.client.config.ts',
  });

  app.use(vite.middlewares);

  configureApp(app);

  addRouter(app);

  addSSRRoute({
    app,
    getContent: async url =>
      vite.transformIndexHtml(url, fs.readFileSync(CLIENT_HTML_FILE_PATH, 'utf-8')),
    renderFn: (await vite.ssrLoadModule(CLIENT_RENDER_FILE_PATH)).render,
    onError: vite.ssrFixStacktrace,
    createStore: (await vite.ssrLoadModule(CLIENT_STORE_FILE_PATH)).createStore,
  });

  app.listen(PORT, () => {
    console.log(
      `  ➜ 🎸 [DEV] Server is listening on port: ${PORT}. Use this server: http://localhost:${PORT}`,
    );
  });
}
