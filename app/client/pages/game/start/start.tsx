import { useCallback, useState } from 'react';

import { Level } from '@client/features/game';
import { useAppNavigation } from '@client/shared/navigation';
import { useViewer } from '@client/features/auth/get-viewer';
import { GameLayout } from '@client/widgets/page-layouts';
import { Autocomplete, TextField } from '@mui/material';

type LevelItem = {
  id: Level;
  title: string;
};

const levels: LevelItem[] = [
  { id: Level.First, title: 'First' },
  { id: Level.Second, title: 'Second' },
  { id: Level.Third, title: 'Third' },
];
const getLevel = (level: Level) => {
  const foundLevel = levels.find(({ id }) => id === level);

  if (!foundLevel) {
    throw new Error('Unknown level');
  }

  return foundLevel;
};

export function Start() {
  const appNavigation = useAppNavigation();
  const { viewer } = useViewer();
  const [level, setLevel] = useState(
    getLevel((sessionStorage.getItem('level') || Level.First) as Level),
  );
  const startGame = useCallback(() => {
    if (level) {
      appNavigation.game.toGame({ level: level.id });
    }
  }, [appNavigation.game, level]);

  const updateActive = useCallback(
    (_?: unknown, value?: LevelItem | null) => {
      const newLevel = value || level;

      if (typeof newLevel !== 'string') {
        setLevel(newLevel);
        document.body.dataset.level = newLevel.id;
        sessionStorage.setItem('level', newLevel.id);
      }
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
        <Autocomplete<LevelItem>
          options={levels}
          value={level}
          onChange={updateActive}
          renderInput={params => <TextField name="level" {...params} label="Уровень" />}
        />
      }
      buttonText="Начать"
      onButtonClick={startGame}
    />
  );
}
