import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import { useState } from 'react';
import { IoClose, IoLocationSharp } from 'react-icons/io5';
import { BsTelephone, BsCalendarEvent } from 'react-icons/bs';
import { BaseModalStyles } from './ModalStyles';
import LocationPicker from '../common/LocationPicker';
import { sendBookingEmail } from '../../utils/emailService';
import SuccessAnimation from '../common/SuccessAnimation';

const {
  ModalOverlay,
  ModalContent,
  CloseButton,
  Title,
  Description,
  TermsContainer,
  FormGroup,
  BookButton
} = BaseModalStyles;

const ContactPreference = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  button {
    flex: 1;
    padding: 1rem;
    border: 2px solid var(--primary-red);
    border-radius: 8px;
    background: white;
    color: var(--primary-red);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: all 0.2s;
    
    &.active {
      background: var(--primary-red);
      color: white;
    }
    
    &:hover {
      transform: translateY(-2px);
    }
    
    svg {
      font-size: 1.2rem;
    }
  }
`;

const LocationButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f5f5f5;
  border: 1px solid #ddd;
  padding: 0.8rem;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
  color: var(--primary-black);
  margin-top: 0.5rem;
  
  &:hover {
    background: #eee;
  }
  
  svg {
    color: var(--primary-red);
    font-size: 1.2rem;
  }
`;

const RequirementTextarea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: var(--primary-red);
  }
`;

const CommonServiceModal = ({ isOpen, onClose, service }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    pincode: '',
    location: null,
    requirements: '',
    contactPreference: 'call' // 'call' or 'meeting'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLocationSelect = (location) => {
    setFormData(prev => ({
      ...prev,
      location
    }));
  };

  const handleContactPreference = (preference) => {
    setFormData(prev => ({
      ...prev,
      contactPreference: preference
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const bookingData = {
        service,
        ...formData,
        location: formData.location ? {
          latitude: formData.location.lat,
          longitude: formData.location.lng
        } : null
      };

      // Log the booking data
      console.log('Service Booking:', bookingData);

      // Send email
      await sendBookingEmail(bookingData);

      // Show success animation
      setShowSuccess(true);
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    onClose();
  };

  const isFormValid = () => {
    return formData.name &&
           formData.email &&
           formData.phone &&
           formData.address &&
           formData.pincode &&
           formData.requirements;
  };

  return (
    <>
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
              
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
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
                  <label>Pin Your Location</label>
                  <LocationPicker onLocationSelect={handleLocationSelect} />
                </FormGroup>

                <FormGroup>
                  <label>Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="Enter your pincode"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label>Requirements</label>
                  <RequirementTextarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleInputChange}
                    placeholder="Please describe your requirements in detail..."
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label>Preferred Contact Method</label>
                  <ContactPreference>
                    <button
                      type="button"
                      className={formData.contactPreference === 'call' ? 'active' : ''}
                      onClick={() => handleContactPreference('call')}
                    >
                      <BsTelephone /> Schedule Call
                    </button>
                    <button
                      type="button"
                      className={formData.contactPreference === 'meeting' ? 'active' : ''}
                      onClick={() => handleContactPreference('meeting')}
                    >
                      <BsCalendarEvent /> Book Meeting
                    </button>
                  </ContactPreference>
                </FormGroup>

                <TermsContainer>
                  <h3>Service Terms</h3>
                  <p>
                    - Our team will contact you within 24 hours<br />
                    - Free consultation and quote<br />
                    - Customized service plan based on requirements<br />
                    - Flexible scheduling options available
                  </p>
                </TermsContainer>
                
                <BookButton type="submit" disabled={!isFormValid() || isSubmitting}>
                  {isSubmitting ? 'Submitting...' : formData.contactPreference === 'call' ? 'Schedule Call' : 'Book Meeting'}
                </BookButton>
              </form>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>

      <SuccessAnimation 
        isOpen={showSuccess} 
        onClose={handleSuccessClose}
        message={`Thank you for booking our ${service.title} service. We'll contact you shortly to confirm your appointment!`}
      />
    </>
  );
};

export default CommonServiceModal; 