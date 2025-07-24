import { useState } from 'react';
import ChatButton from './ChatButton';
import ChatBot from './ChatBot';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ChatButton onClick={() => setIsOpen(true)} />
      <ChatBot isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default ChatWidget; 