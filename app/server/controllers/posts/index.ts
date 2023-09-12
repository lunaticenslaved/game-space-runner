import { addUserFromCookie, checkAuth } from '@server/middlewares';

import { createRoutes } from '../_utils';

import { createPost } from './create-post';
import { updatePost } from './update-post';
import { deletePost } from './delete-post';
import { getPost } from './get-post';
import { getPosts } from './get-posts';
import { createComment } from './create-comment';
import { getComments } from './get-comments';

export const addPostsRoutes = createRoutes(app => {
  app.post('/api/posts', addUserFromCookie, checkAuth, createPost);
  app.get('/api/posts', addUserFromCookie, checkAuth, getPosts);
  app.get('/api/posts/:postId', addUserFromCookie, checkAuth, getPost);
  app.patch('/api/posts/:postId', addUserFromCookie, checkAuth, updatePost);
  app.delete('/api/posts/:postId', addUserFromCookie, checkAuth, deletePost);
  app.post('/api/posts/:postId/comments', addUserFromCookie, checkAuth, createComment);
  app.get('/api/posts/:postId/comments', addUserFromCookie, checkAuth, getComments);
});
