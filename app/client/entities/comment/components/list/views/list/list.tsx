import { dateConvert } from '@client/shared/utils/dates';
import { Comment } from '@shared/models';

import styles from './list.module.scss';

type ListProps = {
  comments: Comment[];
};

export const List = ({ comments }: ListProps) => {
  return (
    <div className={styles.root}>
      {comments.map(comment => (
        <div key={comment.id} className={styles.comment}>
          <div className={styles.header}>
            <p>{comment.author.login}</p>

            <time className={styles.createdAt} dateTime={comment.createdAt}>
              {dateConvert(comment.createdAt)}
            </time>
          </div>

          <div className={styles.content}>{comment.text}</div>

          <div className={styles.footer}></div>
        </div>
      ))}
    </div>
  );
};
