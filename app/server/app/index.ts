import { IS_DEV } from '@server/shared/constants';

import { createApp as createAppDev } from './app.dev';
import { createApp as createAppProd } from './app.prod';

export const createApp = IS_DEV ? createAppDev : createAppProd;
