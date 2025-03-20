import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { deletePost } from '../features/posts/postsSlice';

import Layout from '../components/Layout';
import Heading from '../components/Heading';
import Card from '../components/Card';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { posts, status } = useSelector((state: RootState) => state.posts);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePost(id));
    }
  };

  return (
    <Layout>
      <Heading 
        title="Posts" 
        subtitle="Manage your content easily with Claire CMS"
      />

      {status === 'loading' && (
        <div className="flex justify-center py-8">
          <p className="text-gray-500">Loading posts...</p>
        </div>
      )}

      {status !== 'loading' && posts.length === 0 && (
        <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
          <p className="text-gray-500 mb-4">No posts found</p>
          <p className="text-gray-400">
            Get started by creating your first post
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {posts.map((post) => (
          <Card
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            createdAt={post.createdAt}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </Layout>
  );
};

export default HomePage; 