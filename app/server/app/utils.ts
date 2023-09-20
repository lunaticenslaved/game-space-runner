import { Express, Request } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

import { CORS_ORIGIN_WHITELIST } from '@server/shared/constants';
import { context } from '@server/shared/context';
import { createStore } from '@client/shared/store';
import { addUserFromCookie } from '@server/middlewares';

export function configureApp(app: Express) {
  app.disable('x-powered-by');
  app.disable('via');

  app.use(fileUpload());
  app.use(cookieParser());
  app.use(
    cors({
      credentials: true,
      origin: CORS_ORIGIN_WHITELIST,
    }),
  );
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
}

type RenderHTMLProps = {
  app: Express;
  renderFn: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  getContent(url: string): Promise<string> | string;
  onError(error: Error): void;
};

export function addSSRRoute({ app, getContent, onError, renderFn }: RenderHTMLProps) {
  app.use('*', addUserFromCookie, async (req: Request, res, next) => {
    try {
      const url = req.originalUrl;
      const userId = req.user?.id;
      const user = userId
        ? await context.prisma.user.findFirst({
            where: { id: userId },
            select: {
              id: true,
              login: true,
              avatars: true,
            },
          })
        : undefined;
      const store = user ? createStore(user) : createStore();
      const appHtml = await renderFn(url, store);
      const storeState = store.getState();
      const content = await getContent(url);

      const storeIncrementHtml = `
        <script>
          window.__REDUX_STORE__ = ${JSON.stringify(storeState)};
          window.__IS_SSR__ = true;
        </script>`;
      const html = content
        .replace(`<!-- ssr-outlet -->`, appHtml)
        .replace(`<!-- store-outlet -->`, storeIncrementHtml);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      onError(e as Error);
      next(e);
    }
  });
}

export function loadStaticFiles(_: Express) {
  // let staticFiles: string[];
  // fs.readdir(CLIENT_SSR_DIST_PATH, (err, files) => {
  //   if (!err) {
  //     staticFiles = files;
  //   } else {
  //     console.error('Ошибка при чтении папки:', err);
  //   }
  // });
}
