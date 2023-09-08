import { useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import { Spinner } from '@client/shared/components/spinner';
import { ViewPlaceholder } from '@client/shared/components/view-placeholder';
import {
  CommentInput,
  CommentsList,
  useCreateComment,
  useListComment,
} from '@client/entities/comment';
import { dateConvert } from '@client/shared/utils/dates';
import { useGetTopic } from '@client/entities/topic';
import { useViewer } from '@client/features/auth/get-viewer';

import styles from './topic.module.scss';

export const TopicPage = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useViewer();
  const topicId = Number(id);
  const commentListQuery = useListComment({
    topicId: Number(id),
    onSuccess: () => null,
    onError: () => alert('Что-то пошло не так!'),
  });
  const { comments } = commentListQuery;

  const topicQuery = useGetTopic({
    id: topicId,
    onSuccess: () => null,
    onError: () => alert('Что-то пошло не так!'),
  });
  const { topic } = topicQuery;

  const { mutate: sendMessage } = useCreateComment({
    topicId,
    onSuccess: () => null,
    onError: () => alert('Что-то пошло не так!'),
  });

  useEffect(() => {
    topicQuery.fetch();
    commentListQuery.fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (topicQuery.isFetching || !topic) {
    return <ViewPlaceholder />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <time className={styles.createdAt} dateTime={topic.createdAt}>
            {dateConvert(topic.createdAt)}
          </time>

          <h1 className={styles.title}>{topic.title}</h1>
        </div>

        <div className={styles.content}>{topic.content}</div>

        <div className={styles.comments}>
          {comments && !commentListQuery.isFetching ? (
            <Fragment>
              <CommentsList comments={comments} />
              {isAuthenticated && <CommentInput onSubmit={sendMessage} />}
            </Fragment>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </div>
  );
};
