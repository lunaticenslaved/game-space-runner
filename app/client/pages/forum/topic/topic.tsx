import { useParams } from 'react-router-dom';

import { PostOverview } from '@client/entities/post';
import { CommentsList } from '@client/entities/comment';

import styles from './topic.module.scss';

export const TopicPage = () => {
  const { postId } = useParams<{ postId: string }>();

  if (!postId) {
    throw new Error('No post id found');
  }

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <PostOverview postId={postId} className={styles.postOverview} />
        <CommentsList postId={postId} className={styles.comments} />
      </div>
    </div>
  );
};
