import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { blogPostsTable, supabase } from '../utils/supabase';

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

const ErrorMessage = styled.div`
  color: #dc3545;
  text-align: center;
  margin-top: 1rem;
`;

const EditBlog = () => {
  const { id } = useParams();
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
      if (!isLoggedIn) {
        navigate('/admin-login');
        return;
      }
    };

    const fetchPost = async () => {
      try {
        console.log('Fetching post for editing:', id);
        const post = await blogPostsTable.getPostById(id);
        console.log('Fetched post:', post);
        
        if (!post) {
          throw new Error('Post not found');
        }

        setFormData(post);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load post. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
    fetchPost();
  }, [id, navigate]);

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
      await blogPostsTable.updatePost(id, formData);
      navigate('/blog');
    } catch (err) {
      console.error('Error updating post:', err);
      setError(err.message || 'Failed to update blog post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Container>
        <Title>Loading...</Title>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Edit <span>Blog Post</span></Title>
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
          {isSubmitting ? 'Updating...' : 'Update Post'}
        </Button>

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
    </Container>
  );
};

export default EditBlog; 