import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const BaseModalStyles = {
  ModalOverlay: styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `,

  ModalContent: styled(motion.div)`
    background: white;
    padding: 2rem;
    border-radius: 15px;
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
  `,

  CloseButton: styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--primary-black);
    
    &:hover {
      color: var(--primary-red);
    }
  `,

  Title: styled.h2`
    color: var(--primary-red);
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
  `,

  Description: styled.p`
    color: var(--primary-black);
    margin-bottom: 1.5rem;
    line-height: 1.6;
  `,

  TermsContainer: styled.div`
    background: #f5f5f5;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    
    h3 {
      color: var(--primary-black);
      margin-bottom: 0.5rem;
    }
    
    p {
      font-size: 0.9rem;
      color: #666;
    }
  `,

  FormGroup: styled.div`
    margin-bottom: 1.5rem;
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      color: var(--primary-black);
    }
    
    input, select {
      width: 100%;
      padding: 0.8rem;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 1rem;
      
      &:focus {
        outline: none;
        border-color: var(--primary-red);
      }
    }
  `,

  PriceDisplay: styled.div`
    background: var(--primary-red);
    color: white;
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
    margin-bottom: 1.5rem;
    
    span {
      font-size: 1.5rem;
      font-weight: bold;
    }
  `,

  BookButton: styled.button`
    width: 100%;
    background-color: var(--primary-red);
    color: white;
    border: none;
    padding: 1rem;
    border-radius: 5px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s;
    
    &:hover {
      transform: translateY(-2px);
    }
    
    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  `
}; 