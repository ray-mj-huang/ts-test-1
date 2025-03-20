import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addPost } from '../features/posts/postsSlice';

import Layout from '../components/Layout';
import Heading from '../components/Heading';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Button from '../components/Button';

const CreatePostPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  
  const [errors, setErrors] = useState({
    title: '',
    content: ''
  });

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
    
    if (validateForm()) {
      dispatch(addPost(formData));
      navigate('/');
    }
  };

  return (
    <Layout>
      <Heading 
        title="Create New Post" 
        subtitle="Add new content to your site"
      />

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <form onSubmit={handleSubmit}>
          <Input
            id="title"
            name="title"
            label="Title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter post title"
            error={errors.title}
            required
          />
          
          <Textarea
            id="content"
            name="content"
            label="Content"
            value={formData.content}
            onChange={handleChange}
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
              Create Post
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreatePostPage; 