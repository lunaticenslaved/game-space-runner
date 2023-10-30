import { PostItemProps } from '@client/entities/post/components/item/types';

import { Card, CardContent } from '@mui/material';

export function PostCard({ post }: PostItemProps) {
  return (
    <Card>
      <CardContent>{post.title}</CardContent>
    </Card>
  );
}
