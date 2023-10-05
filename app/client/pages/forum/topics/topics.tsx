import { Button } from '@libs/uikit/components/button';
import { Grid } from '@libs/uikit/components/grid';
import { useDialog } from '@libs/uikit/components/dialog';
import { useAppNavigation } from '@client/shared/navigation';
import { PostFormDialog } from '@client/features/forum';
import { PostsList } from '@client/entities/post';
import { useViewer } from '@client/features/auth/get-viewer';
import { Card } from '@libs/uikit/components/card';

import styles from './topics.module.scss';

export const ForumPage = () => {
  document.title = 'Forum';

  const { isAuthenticated } = useViewer();
  const appNavigation = useAppNavigation();
  const topicDialog = useDialog();

  return (
    <div className={styles.page}>
      <PostFormDialog
        isOpen={topicDialog.isOpen}
        onSubmit={appNavigation.forum.toPost}
        onClose={topicDialog.close}
      />

      <Grid height="full">
        <Grid.Row grow={1} alignContent="center" justifyContent="center">
          <Grid.Col cols={18} alignContent="end">
            <div className={styles.header}>
              <h1>Форум</h1>
              {isAuthenticated && (
                <Button children="Создать топик" width="auto" onClick={topicDialog.open} />
              )}
            </div>
            <Card>
              <Card.Body>
                <Grid.Row>
                  <Grid.Col cols={12}>
                    <PostsList onPostSelect={appNavigation.forum.toPost} />
                  </Grid.Col>
                </Grid.Row>
              </Card.Body>
            </Card>
          </Grid.Col>
        </Grid.Row>
      </Grid>
    </div>
  );
};
