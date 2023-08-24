import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

// import { dbConnect } from '@server/db';

const PORT = 3000;

export async function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.enable('trust proxy');

  app.use(cookieParser());
  app.use(cors({ credentials: true, origin: [] }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // await dbConnect().then(() => {});

  app.use('*', async (_, res) => {
    return res.send('wow!!');
  });

  app.listen(PORT, () => {
    console.log(
      `  ➜ 🎸 Server is listening on port: ${PORT}. Use this server: http://localhost:${PORT}`
    );
  });
}

createApp();
