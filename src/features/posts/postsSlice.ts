import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { Post, PostsState, CreatePostPayload, UpdatePostPayload } from '../../types';

const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: null
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.status = 'loading';
    },
    setError: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    addPost: (state, action: PayloadAction<CreatePostPayload>) => {
      const now = new Date().toISOString();
      const newPost: Post = {
        id: uuidv4(),
        title: action.payload.title,
        content: action.payload.content,
        createdAt: now,
        updatedAt: now
      };
      state.posts.push(newPost);
      state.status = 'succeeded';
    },
    updatePost: (state, action: PayloadAction<UpdatePostPayload>) => {
      const { id, title, content } = action.payload;
      const existingPost = state.posts.find(post => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
        existingPost.updatedAt = new Date().toISOString();
      }
      state.status = 'succeeded';
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
      state.status = 'succeeded';
    }
  }
});

export const { setLoading, setError, addPost, updatePost, deletePost } = postsSlice.actions;
export default postsSlice.reducer; 