import { useEffect } from 'react';

import { Grid } from '@client/shared/components/grid';
import { Input } from '@client/shared/components/input';
import { PlayerList, usePlayersList } from '@client/entities/player';

import styles from './leader-board.module.scss';

const LeaderBoardPage = () => {
  document.title = 'LeaderBoard';

  const { query, players } = usePlayersList();

  useEffect(() => {
    query();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid.Container width={'full'} className={styles.leaderBoard}>
      <Grid.Row justify="center">
        <Grid.Col width={6}>
          <h1 className={styles.title}>Лидерборд</h1>
          <h3 className={styles.subTitle}>Максимальное количество очков за игру</h3>
          <div className={styles.searchBar}>
            <Input.TextInput name="search" label="Поиск игрока" />
          </div>
          <PlayerList players={players} />
        </Grid.Col>
      </Grid.Row>
    </Grid.Container>
  );
};

export default LeaderBoardPage;
