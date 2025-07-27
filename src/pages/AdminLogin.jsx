import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FaLock, FaUser } from 'react-icons/fa';

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 4rem auto;
  padding: 2rem;
`;

const LoginCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: var(--primary-black);
  margin-bottom: 2rem;
  font-size: 2rem;

  span {
    color: var(--primary-red);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  position: relative;

  input {
    width: 100%;
    padding: 1rem;
    padding-left: 3rem;
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

  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
  }
`;

const LoginButton = styled(motion.button)`
  background: var(--primary-red);
  color: white;
  border: none;
  padding: 1rem;
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

const ErrorMessage = styled(motion.div)`
  color: #dc3545;
  text-align: center;
  margin-top: 1rem;
`;

// Hardcoded credentials (in a real app, these would be in a secure backend)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'fabtech123'
};

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (
      formData.username === ADMIN_CREDENTIALS.username &&
      formData.password === ADMIN_CREDENTIALS.password
    ) {
      // Store admin session
      localStorage.setItem('isAdminLoggedIn', 'true');
      navigate('/post-blog');
    } else {
      setError('Invalid username or password');
    }

    setIsLoading(false);
  };

  return (
    <LoginContainer>
      <LoginCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>Admin <span>Login</span></Title>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <FaUser />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <InputGroup>
            <FaLock />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <LoginButton
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </LoginButton>
          {error && (
            <ErrorMessage
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </ErrorMessage>
          )}
        </Form>
      </LoginCard>
    </LoginContainer>
  );
};

export default AdminLogin; 