import { Fragment, useCallback, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { useGameNavigation } from '@client/navigation';
import { Button } from '@client/shared/components/button';
import { gameAudio } from '@client/entities/game';

import styles from './end.module.scss';

export function End() {
  const { state } = useLocation();
  const navigate = useGameNavigation();
  const retry = useCallback(() => navigate.toGameStart(state), [navigate, state]);

  const isWin = useMemo(() => !!state?.win, [state?.win]);

  useEffect(() => {
    isWin ? gameAudio.finishGame(0.5) : gameAudio.gameOver(0.5);
  }, [isWin]);

  return (
    <Fragment>
      <h3 className={styles.title}>
        {isWin ? 'Ну что за чемпион!' : 'Ого, вау, вот эта попытка!'}
      </h3>
      <Button className={styles.btn} onClick={retry}>
        Повторить
      </Button>
    </Fragment>
  );
}
