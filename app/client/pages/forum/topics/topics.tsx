import { Button } from '@libs/uikit/components/button';
import { Grid } from '@libs/uikit/components/grid';
import { useDialog } from '@libs/uikit/components/dialog';
import { useAppNavigation } from '@client/shared/navigation';
import { PostFormDialog } from '@client/features/forum';
import { PostsList } from '@client/entities/post';
import { useViewer } from '@client/features/auth/get-viewer';
import { Card } from '@libs/uikit/components/card';
import { Container } from '@libs/uikit/components/container';
import { API, useQuery } from '@shared/api';
import { Placeholder } from '@libs/uikit/components/placeholder';
import { PlayerList } from '@client/entities/player';

export const ForumPage = () => {
  document.title = 'Forum';

  const { data: playersResponse } = useQuery('get-players', () => API.players.getPlayers.action());
  const { isAuthenticated } = useViewer();
  const appNavigation = useAppNavigation();
  const topicDialog = useDialog();

  return (
    <Container height="100%" width="100%">
      <PostFormDialog
        isOpen={topicDialog.isOpen}
        onSubmit={appNavigation.forum.toPost}
        onClose={topicDialog.close}
      />

      <Container height="100%" width="100%" display="flex" padding={8}>
        <Grid.Row alignItems="stretch">
          <Grid.Col cols={12}>
            <Container height="100%" width="100%" display="flex" flexDirection="column">
              <Grid.Row grow={0} alignItems="center" justifyContent="center">
                <Grid.Col cols={24}>
                  <Container display="flex" justifyContent="space-between">
                    <h1>Форум</h1>
                    {isAuthenticated && (
                      <Button children="Создать топик" width="auto" onClick={topicDialog.open} />
                    )}
                  </Container>
                </Grid.Col>
              </Grid.Row>

              <Grid.Row grow={1} alignItems="stretch" justifyContent="center">
                <Grid.Col cols={24}>
                  <Card minHeight="100%" minWidth="100%" rounded="xxl">
                    <Card.Body>
                      <PostsList onPostSelect={appNavigation.forum.toPost} />
                    </Card.Body>
                  </Card>
                </Grid.Col>
              </Grid.Row>
            </Container>
          </Grid.Col>
          <Grid.Col cols={12}>
            <Card minHeight="100%" minWidth="100%" rounded="xxl">
              <Card.Title>Leader board</Card.Title>
              <Card.Body>
                {!playersResponse ? (
                  <Placeholder />
                ) : (
                  <PlayerList players={playersResponse.players} />
                )}
              </Card.Body>
            </Card>
          </Grid.Col>
        </Grid.Row>
      </Container>
    </Container>
  );
};
