import { Level, LevelModel } from '../types';
import { createImage } from '../../utils';

import diamandSrc from './diamand.png';
import hillsSrc from './hills2.png';
import platformSrc from './platform2.png';
import platformSmallTallSrc from './platformSmallTall2.png';

export const getLevelConfig = (baseHeight: number): LevelModel => {
  const diamand = createImage(diamandSrc);
  const hills = createImage(hillsSrc);
  const platform = createImage(platformSrc);
  const smPlatform = createImage(platformSmallTallSrc);

  return {
    id: Level.Second,
    finishPoint: 5800,
    items: [
      {
        type: 'decoration',
        position: { x: 300, y: baseHeight - hills.height + 20 },
        image: hills,
        speedCoef: 0.66,
      },
      {
        position: { x: 0, y: baseHeight - 60 },
        image: platform,
      },
      {
        position: { x: 1000, y: baseHeight - 240 },
        image: smPlatform,
      },
      {
        position: { x: 1000, y: baseHeight - 60 },
        image: platform,
      },
      {
        position: { x: 1500, y: baseHeight - 400 },
        image: platform,
      },
      {
        position: { x: 2200, y: baseHeight - 400 },
        image: platform,
      },
      {
        position: { x: 3200, y: baseHeight - 60 },
        image: platform,
      },
      {
        position: { x: 4000, y: baseHeight - 200 },
        image: smPlatform,
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
        position: { x: 5750, y: baseHeight - 60 },
        image: platform,
      },
      {
        position: { x: 6250, y: baseHeight - 210 },
        image: diamand,
        type: 'finish',
      },
    ],
  };
};
