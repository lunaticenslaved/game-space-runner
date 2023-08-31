import { useEffect } from 'react';
import { Button } from '@client/shared/components/button';
import { Grid } from '@client/shared/components/grid';
import { ViewPlaceholder } from '@client/shared/components/view-placeholder';
import { useDialog } from '@client/shared/components/dialog';
import { useForumNavigation } from '@client/navigation';
import { TopicFormDialog, TopicList, useCreateTopic, useListTopic } from '@client/entities/topic';
import { useViewer } from '@client/features/auth/get-viewer';

import styles from './topics.module.scss';

export const ForumPage = () => {
  document.title = 'Forum';

  const { isAuthenticated } = useViewer();
  const navigate = useForumNavigation();
  const {
    isFetching,
    query: fetchTopicList,
    topics,
  } = useListTopic({
    onSuccess: () => null,
    onError: () => alert('Cannot get topic list!'),
  });
  const topicDialog = useDialog();
  const { createPost } = useCreateTopic({
    onError: () => alert('Cannot create topic!'),
    onSuccess: topic => {
      navigate.toTopic(topic);
      topicDialog.close();
    },
  });

  useEffect(() => {
    fetchTopicList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.page}>
      <TopicFormDialog
        isOpen={topicDialog.isOpen}
        onSubmit={createPost}
        onClose={topicDialog.close}
      />

      {isFetching ? (
        <ViewPlaceholder />
      ) : (
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

              <TopicList topics={topics} onTopicClick={navigate.toTopic} />
            </Grid.Col>
          </Grid.Row>
        </Grid.Container>
      )}
    </div>
  );
};
