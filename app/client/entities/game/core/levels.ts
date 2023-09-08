import { GenericObject } from './generic-object';
import levelConfig, { Level } from './levels-config';

export type LevelListType = {
  title: string;
  id: Level;
};

export const levelList: LevelListType[] = [
  {
    title: 'Первый',
    id: 'first',
  },
  {
    title: 'Второй',
    id: 'second',
  },
  {
    title: 'Третий',
    id: 'third',
  },
];

export const getLevel = (context: CanvasRenderingContext2D, level: Level, baseHeight: number) => {
  const config = new levelConfig(baseHeight);

  return {
    elements: config[level]().items.map(
      item =>
        new GenericObject({
          context,
          ...item,
        }),
    ),
    finishPoint: config[level]().finishPoint,
  };
};
