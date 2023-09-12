import { useMemo } from 'react';

import { VirtualTable } from '@client/shared/components/table';
import { IColumnProps } from '@client/shared/components/table/components/Row';
import { Post } from '@shared/models/post';
import { dateConvert } from '@client/shared/utils/dates';

import styles from './posts-list.module.scss';
import { API, useQuery } from '@shared/api';
import { ViewPlaceholder } from '@client/shared/components/view-placeholder';

export interface PostsListProps {
  onPostClick: (topic: Post) => void;
}

export const PostsList = ({ onPostClick }: PostsListProps) => {
  const { data } = useQuery('get-posts', () => API.posts.getPosts.action());

  const columns: IColumnProps<Post>[] = useMemo(
    () => [
      {
        field: 'postName',
        headerName: 'Заголовок',
        formatter: (_, topic: Post) => (
          <div className={styles.postMainInfo}>
            <div className={styles.postTitle}>{topic.title}</div>
            <div className={styles.postMinor}>
              <div className={styles.postStartDate}>{dateConvert(topic.createdAt)}</div>
            </div>
          </div>
        ),
      },
      // {
      //   field: 'commentsCount',
      //   headerName: 'Кол-во сообщений',
      //   width: '15%',
      //   formatter: (value: string) => (
      //     <div className={styles.postMessages}>
      //       <Icon icon={<MessageIcon />} size={18} />
      //       <div className={styles.postMessageCount}>{value || 0}</div>
      //     </div>
      //   ),
      // },
      // {
      //   field: 'upload_date',
      //   headerName: 'Последнее сообщение',
      //   align: 'right' as TCellAlign,
      //   width: '30%',
      //   formatter: (value: string) => (
      //     <div className={styles.postLatestInfo}>
      //       <div className={styles.postLatestDate}>{dateConvert(value)}</div>
      //     </div>
      //   ),
      // },
    ],
    [],
  );

  if (!data) {
    return <ViewPlaceholder />;
  }

  return (
    <VirtualTable columns={columns} rows={data.posts} stickyHead={true} onRowClick={onPostClick} />
  );
};
