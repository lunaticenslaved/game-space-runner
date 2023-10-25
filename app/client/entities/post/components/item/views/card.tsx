import { PostItemProps } from '@client/entities/post/components/item/types';
import { Card } from '@libs/uikit/components/card';

export function PostCard({ post }: PostItemProps) {
  return (
    <Card>
      <Card.Body>{post.title}</Card.Body>
    </Card>
  );
}
