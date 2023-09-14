import { Level, LevelModel } from '../types';
import { createImage } from '../../utils';

import diamandSrc from './diamand.png';
import hillsSrc from './hills1.png';
import platformSrc from './platform1.png';
import platformSmallTallSrc from './platformSmallTall1.png';

export const getLevelConfig = (baseHeight: number): LevelModel => {
  const diamand = createImage(diamandSrc);
  const hills = createImage(hillsSrc);
  const platform = createImage(platformSrc);
  const smPlatform = createImage(platformSmallTallSrc);

  return {
    id: Level.First,
    finishPoint: 5000,
    items: [
      {
        type: 'decoration',
        image: hills,
        speedCoef: 0.66,
        position: { x: -1, y: baseHeight - hills.height + 20 },
      },
      {
        image: platform,
        position: { x: 0, y: baseHeight - 60 },
      },
      {
        image: smPlatform,
        position: { x: 1000, y: baseHeight - 240 },
      },
      {
        image: platform,
        position: { x: 1000, y: baseHeight - 60 },
      },
      {
        image: platform,
        position: { x: 1500, y: baseHeight - 400 },
      },
      {
        image: platform,
        position: { x: 2200, y: baseHeight - 400 },
      },
      {
        image: platform,
        position: { x: 3200, y: baseHeight - 60 },
      },
      {
        image: smPlatform,
        position: { x: 4000, y: baseHeight - 200 },
      },
      {
        position: { x: 4400, y: baseHeight - 400 },
        image: smPlatform,
      },
      {
        position: { x: 4800, y: baseHeight - 600 },
        image: smPlatform,
      },
      {
        position: { x: 5089, y: baseHeight - 600 },
        image: platform,
      },
      {
        position: { x: 5450, y: baseHeight - 750 },
        image: diamand,
        type: 'finish',
      },
    ],
  };
};
