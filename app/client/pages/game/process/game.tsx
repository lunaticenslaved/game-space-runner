import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { GameLogic, gameControlHandler } from '@client/features/game';
import { Game } from '@client/features/game';

import styles from './game.module.scss';
import { API, useMutation } from '@shared/api';
import { useAppNavigation } from '@client/shared/navigation';

export const GamePage = () => {
  const appNavigation = useAppNavigation();
  const ref = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<GameLogic | null>(null);
  const { state } = useLocation();
  const { mutate } = useMutation('save-score', (score: number) =>
    API.players.savePlayer.action({ score }),
  );
  const onWin = useCallback(() => {
    appNavigation.game.toGameEnd({ win: true });
  }, [appNavigation]);
  const onLoose = useCallback(() => {
    appNavigation.game.toGameEnd({ win: false });
  }, [appNavigation]);
  const onFinish = useCallback(
    (score: number) => {
      mutate(score);
    },
    [mutate],
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.width = ref.current.offsetWidth;
      ref.current.height = ref.current.offsetHeight;
      const logic = new GameLogic({
        level: state?.level || sessionStorage.getItem('level') || 'first',
        canvas: ref.current,
        context: ref.current.getContext('2d')!,
        onWin,
        onLoose,
        onFinish,
      });
      setGame(logic);
      logic.init();
      logic.animate();
    }
  }, [onFinish, onLoose, onWin, state?.level]);

  useEffect(() => {
    const keyEventsHandler = gameControlHandler(game);

    if (game) {
      window.addEventListener('keydown', keyEventsHandler);
      window.addEventListener('keyup', keyEventsHandler);
    }

    return () => {
      if (game) {
        window.removeEventListener('keydown', keyEventsHandler);
        window.removeEventListener('keyup', keyEventsHandler);
      }
    };
  }, [game]);

  useEffect(() => {
    if (ref) {
      const keydownHandler = Game.fullscreen.handle(ref.current);
      window.addEventListener('keydown', keydownHandler);

      return () => {
        window.removeEventListener('keydown', keydownHandler);
      };
    }
  }, [ref]);

  return (
    <div className={styles.container}>
      <canvas ref={ref} className={styles.canvas} />
    </div>
  );
};
