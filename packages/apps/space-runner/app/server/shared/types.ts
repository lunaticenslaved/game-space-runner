declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_ENV: 'dev' | 'prod';
      CORS_ORIGIN_WHITELIST: string;
      POSTGRES_HOST: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DB: string;
      POSTGRES_PORT: string;
      PORT?: string;
    }
  }
}

export {};
