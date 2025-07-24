import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';

const ModalOverlay = styled(motion.div)`
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
`;

const ModalContent = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
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
`;

const Title = styled.h2`
  color: var(--primary-red);
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
`;

const Description = styled.p`
  color: var(--primary-black);
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const TermsContainer = styled.div`
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
`;

const FormGroup = styled.div`
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
`;

const PriceDisplay = styled.div`
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
`;

const BookButton = styled.button`
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
`;

const ServiceBookingModal = ({ isOpen, onClose, service }) => {
  const [formData, setFormData] = useState({
    propertyType: '',
    address: '',
    email: '',
    phone: ''
  });
  
  const propertyPrices = {
    '1bhk': 150,
    '2bhk': 250,
    '3bhk': 350,
    'villa': 500
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Booking submitted:', {
      service: service.title,
      ...formData,
      estimatedPrice: propertyPrices[formData.propertyType]
    });
    onClose();
  };

  const isFormValid = () => {
    return formData.propertyType && 
           formData.address && 
           formData.email && 
           formData.phone;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContent
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            onClick={e => e.stopPropagation()}
          >
            <CloseButton onClick={onClose}>
              <IoClose />
            </CloseButton>
            
            <Title>{service.title}</Title>
            <Description>{service.description}</Description>
            
            <TermsContainer>
              <h3>Terms & Conditions</h3>
              <p>
                - Service will be provided within 24-48 hours of booking<br />
                - Payment will be collected after service completion<br />
                - Cancellation should be made at least 4 hours before appointment<br />
                - Additional charges may apply for extra services
              </p>
            </TermsContainer>
            
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <label>Property Type</label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Property Type</option>
                  <option value="1bhk">1 BHK</option>
                  <option value="2bhk">2 BHK</option>
                  <option value="3bhk">3 BHK</option>
                  <option value="villa">Villa</option>
                </select>
              </FormGroup>
              
              {formData.propertyType && (
                <PriceDisplay>
                  Estimated Price: <span>${propertyPrices[formData.propertyType]}</span>
                </PriceDisplay>
              )}
              
              <FormGroup>
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your full address"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                />
              </FormGroup>
              
              <BookButton type="submit" disabled={!isFormValid()}>
                Book Now
              </BookButton>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default ServiceBookingModal; 