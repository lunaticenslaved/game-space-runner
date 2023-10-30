import {
  Avatar,
  List as ListBase,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';

import { dateConvert } from '@client/shared/utils/dates';
import { Comment } from '@shared/models';

type ListProps = {
  comments: Comment[];
};

export const List = ({ comments }: ListProps) => {
  return (
    <ListBase>
      {comments.map(comment => (
        <ListItem key={comment.id} disablePadding>
          <ListItemAvatar>
            <Avatar alt={comment.author.login} src={comment.author.avatars[0]?.link} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <div className="flex justify-between">
                <Typography variant="subtitle1">{comment.author.login}</Typography>
                <Typography
                  variant="caption"
                  className="opacity-50"
                  component="time"
                  dateTime={comment.createdAt}>
                  {dateConvert(comment.createdAt)}
                </Typography>
              </div>
            }
            secondary={<Typography variant="body1">{comment.text}</Typography>}
          />
        </ListItem>
      ))}
    </ListBase>
  );
};
