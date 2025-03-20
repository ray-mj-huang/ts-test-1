import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updatePost } from '../features/posts/postsSlice';
import { RootState } from '../store';

import Layout from '../components/Layout';
import Heading from '../components/Heading';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Button from '../components/Button';

const EditPostPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { posts } = useSelector((state: RootState) => state.posts);
  const post = posts.find(post => post.id === id);
  
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  
  const [errors, setErrors] = useState({
    title: '',
    content: ''
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content
      });
    } else {
      navigate('/');
    }
  }, [post, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { title: '', content: '' };
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm() && id) {
      dispatch(updatePost({
        id,
        title: formData.title,
        content: formData.content
      }));
      navigate('/');
    }
  };

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

  return (
    <Layout>
      <Heading 
        title="Edit Post" 
        subtitle="Update your existing content"
      />

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <form onSubmit={handleSubmit}>
          <Input
            id="title"
            name="title"
            label="Title"
            value={formData.title}
            onChange={(e) => handleChange(e)}
            placeholder="Enter post title"
            error={errors.title}
            required
          />
          
          <Textarea
            id="content"
            name="content"
            label="Content"
            value={formData.content}
            onChange={(e) => handleChange(e)}
            placeholder="Enter post content"
            rows={8}
            error={errors.content}
            required
          />
          
          <div className="mt-6 flex justify-end space-x-3">
            <Button 
              variant="secondary" 
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="primary"
            >
              Update Post
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditPostPage; 