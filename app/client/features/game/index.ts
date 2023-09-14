import { GameAudio } from './web-api/audio';
import { fullscreenHandler } from './web-api/fullscreen';

export const Game = {
  audio: GameAudio,
  fullscreen: {
    handle: fullscreenHandler,
  },
};

export { Level } from './levels';
export { GameLogic } from './logic/game-logic';
export { gameControlHandler } from './logic/game-control';
