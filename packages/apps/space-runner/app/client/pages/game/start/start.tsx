import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LevelListType, levelList } from '@client/entities/game';
import { useAppNavigation } from '@client/shared/navigation';
import { Input } from '@client/shared/components/input';
import { Button } from '@client/shared/components/button';

import styles from './start.module.scss';

export function Start() {
  const appNavigation = useAppNavigation();
  const [active, setActive] = useState(
    levelList.find(l => l.id === sessionStorage.getItem('level')) || levelList[0]
  );
  const navigate = useNavigate();
  const startGame = useCallback(
    () => appNavigation.game.toGame({ level: active.id }),
    [navigate, active]
  );

  const updateActive = useCallback((act: LevelListType | null) => {
    const level = act || active;
    document.body.dataset.level = level.id;
    sessionStorage.setItem('level', level.id);
    setActive(level);
  }, []);

  // TODO добавить useSelect
  // TODO добавить форму

  return (
    <>
      <h3 className={styles.title}>Привет, user</h3>
      <p className={styles.text}>Выбери уровень и начни игру)</p>
      <Input.Select<LevelListType>
        label="Уровень"
        name="level"
        items={levelList}
        value={active}
        onChange={updateActive}
      />
      <Button className={styles.btn} onClick={startGame}>
        Начать
      </Button>
    </>
  );
}
