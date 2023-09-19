import { Grid } from '@client/shared/components/grid';
import { PlayerList } from '@client/entities/player';
import { API, useQuery } from '@shared/api';
import { ViewPlaceholder } from '@client/shared/components/view-placeholder';

import styles from './leader-board.module.scss';

const LeaderBoardPage = () => {
  document.title = 'LeaderBoard';

  const { data } = useQuery('get-players', () => API.players.getPlayers.action());

  if (!data) {
    return <ViewPlaceholder />;
  }

  return (
    <Grid.Container width={'full'} className={styles.leaderBoard}>
      <Grid.Row justify="center">
        <Grid.Col width={6}>
          <h1 className={styles.title}>Лидерборд</h1>
          <h3 className={styles.subTitle}>Максимальное количество очков за игру</h3>
          <PlayerList players={data.players} />
        </Grid.Col>
      </Grid.Row>
    </Grid.Container>
  );
};

export default LeaderBoardPage;
