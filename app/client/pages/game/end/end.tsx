import { useCallback, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppNavigation } from '@client/shared/navigation';
import { Game } from '@client/features/game';

import { GameLayout } from '@client/widgets/page-layouts';

export function End() {
  const { state } = useLocation();
  const appNavigation = useAppNavigation();
  const retry = useCallback(() => appNavigation.game.toGameStart(state), [appNavigation, state]);

  const isWin = useMemo(() => !!state?.win, [state?.win]);

  useEffect(() => {
    isWin ? Game.audio.finish(0.5) : Game.audio.gameOver(0.5);
  }, [isWin]);

  return (
    <GameLayout
      header={isWin ? 'Ну что за чемпион!' : 'Вот эта попытка!'}
      buttonText="Повторить"
      onButtonClick={retry}
    />
  );
}
