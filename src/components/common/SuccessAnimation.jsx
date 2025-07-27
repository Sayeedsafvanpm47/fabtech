import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const SuccessOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const SuccessContent = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`;

const IconWrapper = styled(motion.div)`
  color: #4CAF50;
  font-size: 5rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.8rem;
`;

const Message = styled.p`
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const ProgressBar = styled(motion.div)`
  width: 100%;
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
  margin-top: 1rem;

  div {
    height: 100%;
    background: #4CAF50;
  }
`;

const SuccessAnimation = ({ isOpen, onClose, message }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Close after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <SuccessOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <SuccessContent
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <IconWrapper
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ type: "spring", damping: 10, delay: 0.2 }}
            >
              <FaCheckCircle />
            </IconWrapper>
            
            <Title
              as={motion.h2}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Booking Successful!
            </Title>
            
            <Message
              as={motion.p}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {message || "Your service has been booked successfully. We'll contact you shortly!"}
            </Message>

            <ProgressBar>
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "linear" }}
              />
            </ProgressBar>
          </SuccessContent>
        </SuccessOverlay>
      )}
    </AnimatePresence>
  );
};

export default SuccessAnimation; 