import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { blogPostsTable, adminAuth } from '../utils/supabase';

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Title = styled.h1`
  text-align: center;
  color: var(--primary-black);
  margin-bottom: 2rem;
  
  span {
    color: var(--primary-red);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-weight: 600;
  }

  input, textarea {
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: var(--primary-red);
    }
  }

  textarea {
    min-height: 200px;
    resize: vertical;
  }
`;

const Button = styled.button`
  background: var(--primary-red);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 600;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`;

const LogoutButton = styled(Button)`
  background: #333;
  margin-top: 1rem;
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  text-align: center;
  margin-top: 1rem;
`;

const PostBlog = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    slug: '',
    image_url: '',
    meta_description: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await adminAuth.getCurrentSession();
        if (!session) {
          navigate('/admin-login');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        navigate('/admin-login');
      }
    };

    checkAuth();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({
        ...prev,
        slug
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      console.log('Attempting to create post with data:', formData);
      const result = await blogPostsTable.createPost(formData);
      console.log('Post created successfully:', result);
      navigate('/blog');
    } catch (error) {
      console.error('Detailed error:', error);
      setError(error.message || 'Failed to create blog post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await adminAuth.signOut();
      localStorage.removeItem('isAdminLoggedIn');
      navigate('/admin-login');
    } catch (error) {
      console.error('Logout error:', error);
      setError('Failed to logout. Please try again.');
    }
  };

  return (
    <Container>
      <Title>Create New <span>Blog Post</span></Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter post title"
            required
          />
        </FormGroup>

        <FormGroup>
          <label>Slug (URL-friendly title)</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="url-friendly-title"
            required
          />
        </FormGroup>

        <FormGroup>
          <label>Meta Description</label>
          <textarea
            name="meta_description"
            value={formData.meta_description}
            onChange={handleChange}
            placeholder="Enter meta description for SEO (150-160 characters)"
            maxLength={160}
            required
          />
        </FormGroup>

        <FormGroup>
          <label>Featured Image URL</label>
          <input
            type="url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            placeholder="Enter image URL"
            required
          />
        </FormGroup>

        <FormGroup>
          <label>Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your blog post content here..."
            required
          />
        </FormGroup>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Publishing...' : 'Publish Post'}
        </Button>

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>

      <LogoutButton type="button" onClick={handleLogout}>
        Logout
      </LogoutButton>
    </Container>
  );
};

export default PostBlog; 