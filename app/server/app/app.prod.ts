import fs from 'fs';
import path from 'path';
import express from 'express';

import { createStore } from '@client/shared/store';
import { PORT } from '@server/shared/constants';
import { context } from '@server/shared/context';
import { ROOT_PATH } from '@server/shared/constants';
import { configureApp } from '@server/app/utils';

const CLIENT_DIST_PATH = path.resolve(ROOT_PATH, 'dist');
const CLIENT_SSR_DIST_PATH = path.resolve(ROOT_PATH, 'ssr-dist');
const CLIENT_RENDER_FILE_PATH = path.resolve(CLIENT_SSR_DIST_PATH, 'client.cjs');
const CLIENT_HTML_FILE_PATH = path.resolve(CLIENT_DIST_PATH, 'index.html');
const CLIENT_ASSETS_PATH = path.resolve(CLIENT_DIST_PATH, 'assets');

export async function createApp() {
  const app = express();

  configureApp(app);

  await context.prisma.$connect();
  //   await dbConnect().then(() => {
  //     app.use('/api/v1/user', userRouter);
  //     app.use('/api/v1/topic', topicRouter);
  //     app.use('/api/v1/comment', commentRouter);
  //     app.use('/api/v1/reply', replyRouter);
  //     app.use('/api/v1/reaction', reactionRouter);
  //     app.use('/api/v1/emoji-reactions', emojiReactionRouter);
  //   });

  app.use('/assets', express.static(CLIENT_ASSETS_PATH));

  let staticFiles: string[] = [];

  fs.readdir(CLIENT_SSR_DIST_PATH, (err, files) => {
    if (err) {
      console.error('Ошибка при чтении папки:', err);
      return;
    }

    staticFiles = files;
  });

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      if (staticFiles.includes(req.baseUrl.replace('/', ''))) {
        res.sendFile(path.resolve(CLIENT_DIST_PATH, req.baseUrl.replace('/', '')));
        return;
      }

      const template = fs.readFileSync(CLIENT_HTML_FILE_PATH, 'utf-8');
      const render = (await import(CLIENT_RENDER_FILE_PATH)).render;

      const store = createStore();
      const appHtml = await render(url, store);
      const storeState = store.getState();
      const storeIncrementHtml = `
        <script>
          window.__IS_SSR__ = true;
          window.__REDUX_STORE__ = ${JSON.stringify(storeState)}
        </script>`;
      const html = template
        .replace(`<!-- ssr-outlet -->`, appHtml)
        .replace(`<!-- store-outlet -->`, storeIncrementHtml);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      next(e);
    }
  });

  app.listen(PORT, () => {
    console.log(
      `  ➜ 🎸 Server is listening on port: ${PORT}. Use this server: http://localhost:${PORT}`,
    );
  });
}
