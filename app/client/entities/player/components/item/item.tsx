import { PlayerIcon } from '@client/entities/player';
import { Avatar } from '@libs/uikit/components/avatar';
import { Text } from '@libs/uikit/components/text';
import { Player } from '@shared/models/player';
import { Grid } from '@libs/uikit/components/grid';
import { Container } from '@libs/uikit/components/container';

export type PlayerItemProps = {
  player: Player;
};

export const PlayerItem = ({ player }: PlayerItemProps) => {
  const { user, score } = player;

  return (
    <Grid.Row alignItems="stretch">
      <Grid.Col>
        <Avatar
          rounded="lg"
          link={user.avatars[0]?.link}
          size={64}
          placeholderIcon={<PlayerIcon.Placeholder />}
        />
      </Grid.Col>

      <Grid.Col grow={1}>
        <Container
          display="flex"
          alignItems="start"
          justifyContent="space-between"
          flexDirection="column">
          <Text weight="600" as="p">
            {user.login}
          </Text>
          <Text as="p">{score} points</Text>
        </Container>
      </Grid.Col>
    </Grid.Row>
  );
};
