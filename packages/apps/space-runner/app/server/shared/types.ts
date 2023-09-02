declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_ENV: 'dev' | 'prod';
      CORS_ORIGIN_WHITELIST: string;
      DATABASE_URL: string;
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
      ACCESS_TOKEN_EXPIRES_IN: string;
      REFRESH_TOKEN_EXPIRES_IN: string;
      PORT?: string;
    }
  }
}

export {};
