import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { RootState } from '../store';

import Layout from '../components/Layout';
import Button from '../components/Button';

const PostDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { posts } = useSelector((state: RootState) => state.posts);
  const post = posts.find(post => post.id === id);

  if (!post) {
    return (
      <Layout>
        <div className="text-center py-10">
          <p className="text-gray-500">Post not found</p>
          <Button 
            variant="secondary" 
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </div>
      </Layout>
    );
  }

  // Format dates
  const formattedCreatedDate = new Date(post.createdAt).toLocaleDateString();
  const formattedUpdatedDate = new Date(post.updatedAt).toLocaleDateString();

  return (
    <Layout>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <div className="flex space-x-3">
          <Link to="/">
            <Button variant="secondary">Back</Button>
          </Link>
          <Link to={`/posts/edit/${post.id}`}>
            <Button variant="primary">Edit</Button>
          </Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="text-sm text-gray-500 mb-6">
          <p>Created: {formattedCreatedDate}</p>
          {post.createdAt !== post.updatedAt && (
            <p>Last updated: {formattedUpdatedDate}</p>
          )}
        </div>

        <div className="prose max-w-none">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default PostDetailPage;
