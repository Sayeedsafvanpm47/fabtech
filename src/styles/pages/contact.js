import { motion } from 'framer-motion';
import styled from '@emotion/styled';

export const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

export const PageTitle = styled.h1`
  text-align: center;
  color: var(--primary-black);
  margin-bottom: 3rem;
  font-size: 2.5rem;

  span {
    color: var(--primary-red);
  }
`;

export const ContactSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const ContactInfo = styled.div`
  h2 {
    color: var(--primary-red);
    margin-bottom: 2rem;
    font-size: 1.8rem;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  
  svg {
    color: var(--primary-red);
    font-size: 1.5rem;
    margin-right: 1rem;
  }

  div {
    h3 {
      color: var(--primary-black);
      margin-bottom: 0.5rem;
      font-size: 1.2rem;
    }

    p {
      color: var(--primary-black);
      line-height: 1.6;
    }
  }
`;

export const ContactForm = styled(motion.form)`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--primary-black);
    font-weight: 500;
  }

  input,
  textarea {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    transition: border-color var(--transition-speed);

    &:focus {
      outline: none;
      border-color: var(--primary-red);
    }
  }

  textarea {
    min-height: 150px;
    resize: vertical;
  }
`;

export const SubmitButton = styled.button`
  background-color: var(--primary-red);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: transform var(--transition-speed);
  width: 100%;

  &:hover {
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

export const MapSection = styled.section`
  margin-top: 4rem;
  
  .map-container {
    height: 400px;
    background-color: var(--secondary-beige);
    border-radius: 15px;
    overflow: hidden;
  }
`;