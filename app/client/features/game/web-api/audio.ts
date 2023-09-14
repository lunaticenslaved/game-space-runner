import jump from '../sounds/jump.mp3';
import step from '../sounds/step.mp3';
import finish from '../sounds/finish.mp3';
import gameOver from '../sounds/game_over.mp3';

function initSound(audio: HTMLAudioElement | undefined, url: string, volume = 1) {
  if (!audio) {
    audio = new Audio(url);
  }

  audio.volume = volume;

  return audio;
}

function playOrStop(sound: HTMLAudioElement) {
  if (sound.paused) {
    sound.play();
  } else {
    sound.pause();
    sound.currentTime = 0;
  }
}

export class GameAudio {
  private static jumpAudio?: HTMLAudioElement;
  private static stepAudio?: HTMLAudioElement;
  private static finishAudio?: HTMLAudioElement;
  private static gameOverAudio?: HTMLAudioElement;

  static jump(volume = 1) {
    GameAudio.jumpAudio = initSound(GameAudio.jumpAudio, jump, volume);
    GameAudio.jumpAudio && playOrStop(GameAudio.jumpAudio);
  }

  static step(volume = 1) {
    GameAudio.stepAudio = initSound(GameAudio.stepAudio, step, volume);
    GameAudio.stepAudio && playOrStop(GameAudio.stepAudio);
  }

  static finish(volume = 1) {
    GameAudio.finishAudio = initSound(GameAudio.finishAudio, finish, volume);
    GameAudio.finishAudio?.play();
  }

  static gameOver(volume = 1) {
    GameAudio.gameOverAudio = initSound(GameAudio.gameOverAudio, gameOver, volume);
    GameAudio.gameOverAudio?.play();
  }
}
