import { useCallback, useState } from 'react';

import { Level } from '@client/features/game';
import { useAppNavigation } from '@client/shared/navigation';
import { Input } from '@libs/uikit/components/input';

import { useViewer } from '@client/features/auth/get-viewer';
import { GameLayout } from '@client/widgets/page-layouts';

const levels = [
  { id: Level.First, title: 'First' },
  { id: Level.Secord, title: 'Second' },
  { id: Level.Third, title: 'Third' },
];

export function Start() {
  const appNavigation = useAppNavigation();
  const { viewer } = useViewer();
  const [level, setLevel] = useState((sessionStorage.getItem('level') || Level.First) as Level);
  const startGame = useCallback(() => {
    appNavigation.game.toGame({ level });
  }, [appNavigation.game, level]);

  const updateActive = useCallback(
    (value?: Level) => {
      const newLevel = value || level;

      setLevel(newLevel);
      document.body.dataset.level = newLevel;
      sessionStorage.setItem('level', newLevel);
    },
    [level],
  );

  if (!viewer) {
    throw new Error('Cannot play not authenticated!');
  }

  return (
    <GameLayout
      header={`Привет, ${viewer.login}`}
      description="Выбери уровень и начни игру"
      content={
        <Input.Select<Level>
          label="Уровень"
          name="level"
          items={levels}
          value={level}
          onChange={updateActive}
        />
      }
      buttonText="Начать"
      onButtonClick={startGame}
    />
  );
}
