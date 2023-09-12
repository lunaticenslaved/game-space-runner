import cn from 'classnames';

import { dateConvert } from '@client/shared/utils/dates';
import { API, useQuery } from '@shared/api';

import styles from './post-overview.module.scss';

export type PostOverviewProps = {
  postId: string;
  className?: string;
};

export const PostOverview = ({ postId, className }: PostOverviewProps) => {
  const { data: post } = useQuery('get-post', () => API.posts.getPost.action({ id: postId }));

  if (!post) {
    return <p>Loading post...</p>;
  }

  return (
    <section className={cn(styles.container, className)}>
      <div className={styles.header}>
        <time className={styles.createdAt} dateTime={post.createdAt}>
          {dateConvert(post.createdAt)}
        </time>

        <h1 className={styles.title}>{post.title}</h1>
      </div>

      <div className={styles.content}>{post.content}</div>
    </section>
  );
};
