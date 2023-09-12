import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { GameLogic, fullscreenHandler, gameControlHandler } from '@client/entities/game';
import { useViewer } from '@client/features/auth/get-viewer';

import styles from './game.module.scss';
import { API, useMutation } from '@shared/api';

const HEADER_HEIGHT = 120;

export const GamePage = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<GameLogic | null>(null);
  const { state } = useLocation();
  const { viewer } = useViewer();
  const mutation = useMutation('save-score', (score: number) =>
    API.players.savePlayer.action({ score }),
  );
  const onWin = useCallback(() => {}, []);
  const onLoose = useCallback(() => {}, []);

  useEffect(() => {
    if (ref.current && viewer) {
      ref.current.width = window.innerWidth;
      ref.current.height = window.innerHeight - HEADER_HEIGHT;
      const logic = new GameLogic({
        level: state?.level || sessionStorage.getItem('level') || 'first',
        canvas: ref.current,
        context: ref.current.getContext('2d')!,
        viewer,
        onWin,
        onLoose,
        onFinish: score => mutation.mutate(score),
      });
      setGame(logic);
      logic.init();
      logic.animate();
    }
  }, [mutation, onLoose, onWin, state?.level, viewer]);

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
      const keydownHandler = fullscreenHandler(ref.current);
      window.addEventListener('keydown', keydownHandler);

      return () => {
        window.removeEventListener('keydown', keydownHandler);
      };
    }
  }, [ref]);

  if (!viewer) {
    return null;
  }

  return <canvas ref={ref} className={styles.container}></canvas>;
};
