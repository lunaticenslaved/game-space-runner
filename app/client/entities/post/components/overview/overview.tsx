import cn from 'classnames';
import block from 'bem-cn-lite';

import { dateConvert } from '@client/shared/utils/dates';
import { API, useQuery } from '@shared/api';

import './overview.scss';

const overview = block('entities-post-overview');
const header = block('entities-post-overview__header');
const content = block('entities-post-overview__content');

export type PostOverviewProps = {
  postId?: string;
  className?: string;
};

export const PostOverview = ({ postId, className }: PostOverviewProps) => {
  const { data: post } = useQuery(
    ['get-post', postId],
    () => API.posts.getPost.action({ id: postId || '' }),
    {
      enabled: !!postId,
    },
  );

  if (!postId) {
    return <p>No post</p>;
  }

  if (!post) {
    return <p>Loading post...</p>;
  }

  return (
    <section className={cn(overview(), className)}>
      <div className={header()}>
        <time className={header('created')} dateTime={post.createdAt}>
          {dateConvert(post.createdAt)}
        </time>

        <h1 className={header('title')}>{post.title}</h1>
      </div>

      <div className={content()}>{post.content}</div>
    </section>
  );
};
