import block from 'bem-cn-lite';

import { PostItemProps } from '@client/entities/post/components/item/types';
import { Card } from '@client/shared/components/card';

import './card.scss';

const bCard = block('post-item-card');

export function PostCard({ post }: PostItemProps) {
  return (
    <Card className={bCard()}>
      <Card.Body>{post.title}</Card.Body>
    </Card>
  );
}
