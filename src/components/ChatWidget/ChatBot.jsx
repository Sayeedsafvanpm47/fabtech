import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { IoClose, IoPaperPlaneOutline, IoLogoWhatsapp, IoLogoFacebook, IoLogoInstagram } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

const ChatContainer = styled(motion.div)`
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 350px;
  height: 500px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  z-index: 1000;
  overflow: hidden;
`;

const ChatHeader = styled.div`
  background: var(--primary-red);
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
    font-size: 1.1rem;
  }

  button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 1.2rem;
    padding: 0;
    display: flex;
    align-items: center;
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Message = styled.div`
  max-width: 80%;
  padding: 0.8rem;
  border-radius: 10px;
  margin: ${props => props.isBot ? '0 auto 0 0' : '0 0 0 auto'};
  background: ${props => props.isBot ? '#f0f0f0' : 'var(--primary-red)'};
  color: ${props => props.isBot ? 'var(--primary-black)' : 'white'};
  font-size: 0.9rem;
  line-height: 1.4;
  white-space: pre-wrap;
  word-wrap: break-word;

  p {
    margin: 0 0 0.5rem 0;
    &:last-child {
      margin-bottom: 0;
    }
  }

  ul, ol {
    margin: 0.5rem 0;
    padding-left: 1.2rem;
  }

  li {
    margin-bottom: 0.2rem;
  }

  strong {
    font-weight: 600;
  }

  em {
    font-style: italic;
  }

  code {
    background: ${props => props.isBot ? '#e0e0e0' : 'rgba(255,255,255,0.2)'};
    padding: 0.1rem 0.3rem;
    border-radius: 3px;
    font-family: monospace;
    font-size: 0.85rem;
  }
`;

const InputContainer = styled.div`
  padding: 1rem;
  border-top: 1px solid #eee;
  display: flex;
  gap: 0.5rem;

  input {
    flex: 1;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 0.9rem;

    &:focus {
      outline: none;
      border-color: var(--primary-red);
    }
  }

  button {
    background: var(--primary-red);
    color: white;
    border: none;
    border-radius: 5px;
    padding: 0 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  }
`;

const SocialLinks = styled.div`
  padding: 0.5rem 1rem;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-around;
  
  a {
    color: #666;
    font-size: 1.5rem;
    transition: color 0.2s;
    
    &:hover {
      color: var(--primary-red);
    }
  }
`;

const LoadingDots = styled.div`
  display: inline-flex;
  gap: 2px;
  
  span {
    width: 4px;
    height: 4px;
    background: currentColor;
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out;
    
    &:nth-of-type(1) { animation-delay: -0.32s; }
    &:nth-of-type(2) { animation-delay: -0.16s; }
  }
  
  @keyframes bounce {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
  }
`;

// Helper function to format text with basic markdown support
const formatText = (text) => {
  if (!text) return '';
  
  // Split text into paragraphs (double line breaks)
  const paragraphs = text.split(/\n\s*\n/);
  
  return paragraphs.map((paragraph, pIndex) => {
    // Handle single line breaks within paragraphs
    const lines = paragraph.split('\n');
    
    return (
      <p key={pIndex}>
        {lines.map((line, lIndex) => {
          // Process basic markdown formatting
          let processedLine = line
            // Bold text **text** or __text__
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/__(.*?)__/g, '<strong>$1</strong>')
            // Italic text *text* or _text_
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/_(.*?)_/g, '<em>$1</em>')
            // Inline code `code`
            .replace(/`(.*?)`/g, '<code>$1</code>');

          return (
            <span key={lIndex}>
              <span dangerouslySetInnerHTML={{ __html: processedLine }} />
              {lIndex < lines.length - 1 && <br />}
            </span>
          );
        })}
      </p>
    );
  });
};

// Component to render formatted message
const FormattedMessage = ({ text, isBot }) => {
  // Check if text contains list patterns
  const hasLists = /^\s*[-*•]\s/m.test(text) || /^\s*\d+\.\s/m.test(text);
  
  if (hasLists) {
    const parts = text.split(/\n(?=\s*[-*•]\s|\s*\d+\.\s)/);
    
    return (
      <div>
        {parts.map((part, index) => {
          if (/^\s*[-*•]\s/.test(part)) {
            // Unordered list items
            const items = part.split(/\n(?=\s*[-*•]\s)/).filter(item => item.trim());
            return (
              <ul key={index}>
                {items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    {item.replace(/^\s*[-*•]\s/, '').trim()}
                  </li>
                ))}
              </ul>
            );
          } else if (/^\s*\d+\.\s/.test(part)) {
            // Ordered list items
            const items = part.split(/\n(?=\s*\d+\.\s)/).filter(item => item.trim());
            return (
              <ol key={index}>
                {items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    {item.replace(/^\s*\d+\.\s/, '').trim()}
                  </li>
                ))}
              </ol>
            );
          } else {
            // Regular paragraph
            return <div key={index}>{formatText(part)}</div>;
          }
        })}
      </div>
    );
  }
  
  return <div>{formatText(text)}</div>;
};

const ChatBot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your AI assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setIsLoading(true);

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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',
          'HTTP-Referer': 'https:www.fabtechqatar.com' || 'https://fabtech-seven.vercel.app',
          'X-Title': 'Fabtech Support Bot'
        },
        body: JSON.stringify({
          model: 'mistralai/mistral-7b-instruct',
          messages: [
            {
              role: 'system',
              content: 'You are Sayeed, a helpful customer service representative for Fabtech, a company that provides cleaning, facility management, and related services. Be professional, friendly, and concise in your responses. Format your responses with proper paragraphs and use bullet points when appropriate for better readability. Always sign your responses as "Best regards, Sayeed - Customer Service Representative, Fabtech Cleaning & Facility Services".'
            },
            {
              role: 'user',
              content: userMessage
            }
          ]
        })
      });

      const data = await response.json();
      const botResponse = data.choices[0].message.content;
      
      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        text: "I apologize, but I'm having trouble connecting right now. Please try again later or reach out through our social media channels below.", 
        isBot: true 
      }]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ChatContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <ChatHeader>
            <h3>Fabtech Support</h3>
            <button onClick={onClose}><IoClose /></button>
          </ChatHeader>

          <ChatMessages>
            {messages.map((message, index) => (
              <Message key={index} isBot={message.isBot}>
                <FormattedMessage text={message.text} isBot={message.isBot} />
              </Message>
            ))}
            {isLoading && (
              <Message isBot>
                <LoadingDots>
                  <span></span>
                  <span></span>
                  <span></span>
                </LoadingDots>
              </Message>
            )}
            <div ref={messagesEndRef} />
          </ChatMessages>

          <InputContainer>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <button onClick={handleSend} disabled={isLoading || !input.trim()}>
              <IoPaperPlaneOutline />
            </button>
          </InputContainer>

          <SocialLinks>
            <a 
              href="https://wa.me/97471460844" 
              target="_blank" 
              rel="noopener noreferrer"
              title="Chat on WhatsApp"
            >
              <IoLogoWhatsapp />
            </a>
            <a 
              href="https://www.facebook.com/Fabtechqatar/" 
              target="_blank" 
              rel="noopener noreferrer"
              title="Visit our Facebook page"
            >
              <IoLogoFacebook />
            </a>
            <a 
              href="https://www.instagram.com/fabtech_services/" 
              target="_blank" 
              rel="noopener noreferrer"
              title="Follow us on Instagram"
            >
              <IoLogoInstagram />
            </a>
          </SocialLinks>
        </ChatContainer>
      )}
    </AnimatePresence>
  );
};

export default ChatBot;