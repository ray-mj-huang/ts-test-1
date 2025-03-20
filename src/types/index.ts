export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostsState {
  posts: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface CreatePostPayload {
  title: string;
  content: string;
}

export interface UpdatePostPayload {
  id: string;
  title: string;
  content: string;
} 