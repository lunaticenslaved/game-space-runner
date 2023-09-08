import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { GameLogic, fullscreenHandler, gameControlHandler } from '@client/entities/game';
import { useViewer } from '@client/features/auth/get-viewer';

import styles from './game.module.scss';

const HEADER_HEIGHT = 120;

export const GamePage = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<GameLogic | null>(null);
  const { state } = useLocation();
  const { viewer } = useViewer();
  const onWin = useCallback(() => {}, []);
  const onLoose = useCallback(() => {}, []);
  const onFinish = useCallback(() => {}, []);

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
        onFinish,
      });
      setGame(logic);
      logic.init();
      logic.animate();
    }
  }, [onFinish, onLoose, onWin, state?.level, viewer]);

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
