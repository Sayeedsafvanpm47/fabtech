import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FaImage, FaTimes } from 'react-icons/fa';

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: var(--primary-black);
  font-size: 2rem;

  span {
    color: var(--primary-red);
  }
`;

const LogoutButton = styled(motion.button)`
  background: none;
  border: 1px solid var(--primary-red);
  color: var(--primary-red);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: var(--primary-red);
    color: white;
  }
`;

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--primary-black);
    font-weight: 500;
  }

  input, textarea, select {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: var(--primary-red);
      box-shadow: 0 0 0 2px rgba(var(--primary-red-rgb), 0.1);
    }
  }

  textarea {
    min-height: 200px;
    resize: vertical;
  }
`;

const ImagePreview = styled.div`
  margin-top: 1rem;
  position: relative;
  display: inline-block;

  img {
    max-width: 200px;
    height: auto;
    border-radius: 8px;
  }

  button {
    position: absolute;
    top: -10px;
    right: -10px;
    background: var(--primary-red);
    color: white;
    border: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
  }
`;

const SubmitButton = styled(motion.button)`
  background: var(--primary-red);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  font-weight: 600;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled(motion.div)`
  background: #28a745;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  text-align: center;
`;

const PostBlog = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    excerpt: '',
    content: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Check if admin is logged in
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin-login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null
    }));
    setImagePreview('');
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/admin-login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically upload the image to a server/CDN
      // and save the blog post data to a database
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Show success message
      setShowSuccess(true);

      // Reset form
      setFormData({
        title: '',
        category: '',
        excerpt: '',
        content: '',
        image: null
      });
      setImagePreview('');

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error posting blog:', error);
      alert('Failed to post blog. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    'Cleaning Tips',
    'Green Living',
    'Pest Control',
    'Landscaping',
    'Construction',
    'Hospitality'
  ];

  return (
    <Container>
      <Header>
        <Title>Post New <span>Blog</span></Title>
        <LogoutButton
          onClick={handleLogout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Logout
        </LogoutButton>
      </Header>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            required
          />
        </FormGroup>

        <FormGroup>
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </FormGroup>

        <FormGroup>
          <label>Excerpt</label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            placeholder="Enter a brief description"
            required
            style={{ minHeight: '100px' }}
          />
        </FormGroup>

        <FormGroup>
          <label>Content (HTML)</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Enter blog content in HTML format"
            required
          />
        </FormGroup>

        <FormGroup>
          <label>Featured Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            id="image-upload"
          />
          <motion.label
            htmlFor="image-upload"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.8rem 1rem',
              background: '#f0f0f0',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaImage /> Choose Image
          </motion.label>

          {imagePreview && (
            <ImagePreview>
              <img src={imagePreview} alt="Preview" />
              <button type="button" onClick={removeImage}>
                <FaTimes />
              </button>
            </ImagePreview>
          )}
        </FormGroup>

        <SubmitButton
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? 'Posting...' : 'Post Blog'}
        </SubmitButton>

        {showSuccess && (
          <SuccessMessage
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            Blog post published successfully!
          </SuccessMessage>
        )}
      </Form>
    </Container>
  );
};

export default PostBlog; 