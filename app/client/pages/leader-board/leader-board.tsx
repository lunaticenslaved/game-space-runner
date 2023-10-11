import { Grid } from '@client/shared/components/grid';
import { PlayerList } from '@client/entities/player';
import { API, useQuery } from '@shared/api';
import { ViewPlaceholder } from '@client/shared/components/view-placeholder';

import './leader-board.scss';

const LeaderBoardPage = () => {
  document.title = 'LeaderBoard';

  const { data } = useQuery('get-players', () => API.players.getPlayers.action());

  if (!data) {
    return <ViewPlaceholder />;
  }

  return (
    <Grid.Container width="full" height="full" className="page-leader-board">
      <Grid.Row justify="center">
        <Grid.Col span={12}>
          <PlayerList players={data.players} />
        </Grid.Col>
      </Grid.Row>
    </Grid.Container>
  );
};

export default LeaderBoardPage;
