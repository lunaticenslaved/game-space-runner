import { Grid } from '@libs/uikit/components/grid';
import { PlayerList } from '@client/entities/player';
import { API, useQuery } from '@shared/api';
import { Placeholder } from '@libs/uikit/components/placeholder';
import { Container } from '@libs/uikit/components/container';

import './leader-board.scss';

const LeaderBoardPage = () => {
  document.title = 'LeaderBoard';

  const { data } = useQuery('get-players', () => API.players.getPlayers.action());

  if (!data) {
    return <Placeholder />;
  }

  return (
    <Container height="100%" className="page-leader-board">
      <Grid.Row justifyContent="center">
        <Grid.Col cols={12}>
          <PlayerList players={data.players} />
        </Grid.Col>
      </Grid.Row>
    </Container>
  );
};

export default LeaderBoardPage;
