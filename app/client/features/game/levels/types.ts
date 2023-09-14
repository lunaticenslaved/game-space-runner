import { GameObjectProps } from '../logic/game-object';

export enum Level {
  First = 'First',
  Secord = 'Secord',
  Third = 'Third',
}

export type LevelModel = {
  id: Level;
  finishPoint: number;
  items: Omit<GameObjectProps, 'context'>[];
};
