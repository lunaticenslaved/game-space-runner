import { GameLogic } from './game-logic';
import { gameAudio } from '../app-api/audio';

type TGameControlEventHandler = (game: GameLogic | null) => (event: KeyboardEvent) => void;

export const gameControlHandler: TGameControlEventHandler = game => event => {
  const { key } = event;

  if (game) {
    if (event.type === 'keydown') {
      game.keyDown(event);
      if (key === 'w') gameAudio.jumpClick(0.5);
      if (key === 'a' || key === 'd') gameAudio.stepClick(0.5);
    }
    if (event.type === 'keyup') {
      game.keyUp(event);
    }
  }
};
