import styled from '@emotion/styled';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';

const Button = styled(motion.button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--primary-red);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const ChatButton = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <IoChatbubbleEllipsesOutline />
    </Button>
  );
};

export default ChatButton; 