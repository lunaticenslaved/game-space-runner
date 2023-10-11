import { Button } from '@client/shared/components/button';
import { Grid } from '@client/shared/components/grid';
import { useDialog } from '@client/shared/components/dialog';
import { useAppNavigation } from '@client/shared/navigation';
import { PostFormDialog } from '@client/features/forum';
import { PostsList } from '@client/entities/post';
import { useViewer } from '@client/features/auth/get-viewer';
import { Card } from '@client/shared/components/card';

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

      <Grid.Container width={'full'} height="full">
        <Grid.Row grow={1} align="middle" justify="center">
          <Grid.Col span={18} align="bottom">
            <div className={styles.header}>
              <h1>Форум</h1>
              {isAuthenticated && (
                <Button children="Создать топик" width="auto" onClick={topicDialog.open} />
              )}
            </div>
            <Card>
              <Card.Body>
                <Grid.Row>
                  <Grid.Col span={12}>
                    <PostsList onPostSelect={appNavigation.forum.toPost} />
                  </Grid.Col>
                </Grid.Row>
              </Card.Body>
            </Card>
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    </div>
  );
};
