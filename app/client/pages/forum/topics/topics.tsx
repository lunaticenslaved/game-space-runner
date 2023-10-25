import { Button } from '@libs/uikit/components/button';
import { Text } from '@libs/uikit/components/text';
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

      <div className="h-full min-h-full flex flex-row items-stretch p-8">
        <div className="basis-1/2 h-full flex flex-col p-4">
          <div className="flex justify-between items-center mb-8">
            <Text as="h2">Форум</Text>
            {isAuthenticated && (
              <Button children="Создать топик" width="auto" onClick={topicDialog.open} />
            )}
          </div>

          <Card className="rounded-2xl grow">
            <Card.Body>
              <PostsList onPostSelect={appNavigation.forum.toPost} />
            </Card.Body>
          </Card>
        </div>

        <div className="basis-1/2 h-full flex flex-col p-4">
          <Card className="min-h-full rounded-2xl">
            <Card.Body>
              {!playersResponse ? (
                <Placeholder />
              ) : (
                <PlayerList players={playersResponse.players} />
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
};
