import { getLevelConfig as getLevel1Config } from './level-1';
import { getLevelConfig as getLevel2Config } from './level-2';
import { getLevelConfig as getLevel3Config } from './level-3';

import { Level } from './types';

export { Level };

export const getLevelConfig = (level: Level, baseHeight: number) => {
  if (level === Level.First) {
    return getLevel1Config(baseHeight);
  }

  if (level === Level.Second) {
    return getLevel2Config(baseHeight);
  }

  return getLevel3Config(baseHeight);
};
