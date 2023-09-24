import fs from 'fs';
import path from 'path';
import express from 'express';

import { PORT } from '@server/shared/constants';
import { context } from '@server/shared/context';
import { ROOT_PATH } from '@server/shared/constants';
import { addRouter } from '@server/controllers';

import { addSSRRoute, configureApp } from './utils';

const ASSETS_PATH = path.resolve(ROOT_PATH, 'dist/client/spa/assets');
const HTML_FILE_PATH = path.resolve(ROOT_PATH, 'dist/client/spa/index.html');
const STORE_FILE_PATH = path.resolve(ROOT_PATH, 'dist/shared/store/index.js');
const RENDER_FILE_PATH = path.resolve(ROOT_PATH, 'dist/client/ssr/index.js');

export async function createApp() {
  await context.prisma.$connect();

  const app = express();

  configureApp(app);

  addRouter(app);

  addSSRRoute({
    app,
    assetsFolder: ASSETS_PATH,
    getContent: () => fs.readFileSync(HTML_FILE_PATH, 'utf-8'),
    renderFn: (await import(RENDER_FILE_PATH)).render,
    createStore: (await import(STORE_FILE_PATH)).createStore,
  });

  app.listen(PORT, () => {
    console.log(
      `  ➜ 🎸 [PROD] Server is listening on port: ${PORT}. Use this server: http://localhost:${PORT}`,
    );
  });
}
