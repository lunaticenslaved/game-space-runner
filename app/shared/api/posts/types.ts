import { Post, Comment } from '@shared/models';

export type CreatePostRequest = Pick<Post, 'title' | 'content'>;
export type CreatePostResponse = Post;

export type UpdatePostRequest = Pick<Post, 'id' | 'title' | 'content'>;
export type UpdatePostResponse = Post;

export type DeletePostRequest = Pick<Post, 'id'>;
export type DeletePostResponse = Post;

export type GetPostsRequest = void;
export type GetPostsResponse = {
  posts: Post[];
};

export type GetPostRequest = Pick<Post, 'id'>;
export type GetPostResponse = Post;

export type GetCommentsRequest = {
  postId: string;
};
export type GetCommentsResponse = {
  comments: Comment[];
};

export type CreateCommentRequest = Pick<Comment, 'text'> & {
  postId: string;
};
export type CreateCommentResponse = Comment;
