import { useAppNavigation } from '@client/shared/navigation';
import { PostFormDialog } from '@client/features/forum';
import { PostsList } from '@client/entities/post';
import { useViewer } from '@client/features/auth/get-viewer';
import { API, useQuery } from '@shared/api';
import { PlayerList } from '@client/entities/player';
import { useDialog } from '@client/shared/hooks';
import { Placeholder } from '@client/shared/components/placeholder';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';

export const ForumPage = () => {
  document.title = 'Forum';

  const { data: playersResponse } = useQuery('get-players', () => API.players.getPlayers.action());
  const { isAuthenticated } = useViewer();
  const appNavigation = useAppNavigation();
  const topicDialog = useDialog();

  return (
    <Grid className="w-full h-full">
      <PostFormDialog
        isOpen={topicDialog.isOpen}
        onSubmit={appNavigation.forum.toPost}
        onClose={topicDialog.close}
      />

      <div className="h-full min-h-full flex flex-row items-stretch p-8">
        <div className="basis-1/2 h-full flex flex-col p-4">
          <div className="flex justify-between items-center mb-8">
            <Typography variant="h4" component="h2">
              Форум
            </Typography>
            {isAuthenticated && (
              <Button className="w-auto" onClick={topicDialog.open}>
                Создать топик
              </Button>
            )}
          </div>

          <Card className="rounded-2xl grow">
            <CardContent>
              <PostsList onPostSelect={appNavigation.forum.toPost} />
            </CardContent>
          </Card>
        </div>

        <div className="basis-1/2 h-full flex flex-col p-4">
          <Card className="min-h-full rounded-2xl">
            <CardContent>
              {!playersResponse ? (
                <Placeholder />
              ) : (
                <PlayerList players={playersResponse.players} />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Grid>
  );
};
