import { Button } from '@client/shared/components/button';
import { Grid } from '@client/shared/components/grid';
import { useDialog } from '@client/shared/components/dialog';
import { useAppNavigation } from '@client/shared/navigation';
import { PostsList, PostFormDialog } from '@client/features/forum';
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

      <Grid.Container width={'full'} className={styles.container}>
        <Grid.Row justify="center">
          <Grid.Col width={9}>
            <div className={styles.header}>
              <h1 className={styles.title}>Форум</h1>
              {isAuthenticated && (
                <div className={styles.actions}>
                  <Button children="Создать топик" onClick={topicDialog.open} />
                </div>
              )}
            </div>

            <PostsList onPostClick={appNavigation.forum.toPost} />
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    </div>
  );
};
