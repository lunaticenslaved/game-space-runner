import { Button } from '@client/shared/components/button';
import { Grid } from '@client/shared/components/grid';
import { useDialog } from '@client/shared/components/dialog';
import { useAppNavigation } from '@client/shared/navigation';
import { PostFormDialog } from '@client/features/forum';
import { PostsList } from '@client/entities/post';
import { useViewer } from '@client/features/auth/get-viewer';

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

      <Grid.Container width={'full'} height="full" className={styles.container}>
        <Grid.Row>
          <Grid.Col width={12}>
            <div className={styles.header}>
              <h1 className={styles.title}>Форум</h1>
              {isAuthenticated && (
                <div className={styles.actions}>
                  <Button children="Создать топик" width="full" onClick={topicDialog.open} />
                </div>
              )}
            </div>
          </Grid.Col>
        </Grid.Row>

        <Grid.Row grow={1} align="middle" justify="center">
          <Grid.Col justify="center">
            <PostsList onPostSelect={appNavigation.forum.toPost} />
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    </div>
  );
};
