import { validationRules } from '@libs/validate';
import { createAction, customFetch } from '../_utils';

import {
  CreateCommentRequest,
  CreateCommentResponse,
  CreatePostRequest,
  CreatePostResponse,
  DeletePostRequest,
  DeletePostResponse,
  GetCommentsRequest,
  GetCommentsResponse,
  GetPostRequest,
  GetPostResponse,
  GetPostsRequest,
  GetPostsResponse,
  UpdatePostRequest,
  UpdatePostResponse,
} from './types';

export const postsActions = {
  createPost: {
    action: createAction<CreatePostResponse, CreatePostRequest>(async data => {
      return await customFetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    }),
    validators: {
      title: validationRules.required('Post title is required'),
      content: validationRules.required('Post content is required'),
    },
  },
  updatePost: {
    action: createAction<UpdatePostResponse, UpdatePostRequest>(async data => {
      const { id } = data;
      return await customFetch(`/api/posts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      });
    }),
    validators: {
      id: validationRules.required('Post id is required'),
      title: validationRules.required('Post title is required'),
      content: validationRules.required('Post content is required'),
    },
  },
  deletePost: {
    action: createAction<DeletePostResponse, DeletePostRequest>(async data => {
      const { id } = data;
      return await customFetch(`/api/posts/${id}`, {
        method: 'DELETE',
        body: JSON.stringify(data),
      });
    }),
    validators: {
      id: validationRules.required('Post id is required'),
    },
  },
  getPosts: {
    action: createAction<GetPostsResponse, GetPostsRequest>(async data => {
      return await customFetch(`/api/posts`, {
        method: 'GET',
        body: JSON.stringify(data),
      });
    }),
    validators: {
      id: validationRules.required('Post id is required'),
    },
  },
  getPost: {
    action: createAction<GetPostResponse, GetPostRequest>(async data => {
      const { id } = data;
      return await customFetch(`/api/posts/${id}`, {
        method: 'GET',
      });
    }),
    validators: {
      id: validationRules.required('Post id is required'),
    },
  },
  getComments: {
    action: createAction<GetCommentsResponse, GetCommentsRequest>(async data => {
      const { postId } = data;
      return await customFetch(`/api/posts/${postId}/comments`, {
        method: 'GET',
      });
    }),
    validators: {
      postId: validationRules.required('Post id is required'),
    },
  },
  createComment: {
    action: createAction<CreateCommentResponse, CreateCommentRequest>(async data => {
      const { postId } = data;
      return await customFetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
    }),
    validators: {
      postId: validationRules.required('Post id is required'),
      text: validationRules.required('Comment text is required'),
    },
  },
};
