import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
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
  PriceDisplay,
  BookButton
} = BaseModalStyles;

const DeepCleaningModal = ({ isOpen, onClose, service }) => {
  const [formData, setFormData] = useState({
    propertyType: '',
    rooms: '',
    bathrooms: '',
    address: '',
    email: '',
    phone: '',
    location: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const calculatePrice = () => {
    if (!formData.propertyType || !formData.rooms || !formData.bathrooms) return null;
    
    const basePrice = {
      '1bhk': 200,
      '2bhk': 300,
      '3bhk': 400,
      'villa': 600
    }[formData.propertyType];

    const extraRoomPrice = Math.max(0, (parseInt(formData.rooms) - 2) * 50);
    const bathroomPrice = parseInt(formData.bathrooms) * 30;

    return basePrice + extraRoomPrice + bathroomPrice;
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const bookingData = {
        service,
        ...formData,
        estimatedPrice: calculatePrice(),
        location: formData.location ? {
          latitude: formData.location.lat,
          longitude: formData.location.lng
        } : null
      };

      // Log the booking data
      console.log('Deep Cleaning Booking:', bookingData);

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
    return formData.propertyType && 
           formData.rooms &&
           formData.bathrooms &&
           formData.address && 
           formData.email && 
           formData.phone;
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
              
              <TermsContainer>
                <h3>Deep Cleaning Service Details</h3>
                <p>
                  - Thorough cleaning of all rooms and surfaces<br />
                  - Special attention to bathrooms and kitchen<br />
                  - Window cleaning included<br />
                  - Carpet and upholstery deep cleaning<br />
                  - Sanitization of high-touch areas
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

                <FormGroup>
                  <label>Number of Rooms</label>
                  <input
                    type="number"
                    name="rooms"
                    value={formData.rooms}
                    onChange={handleInputChange}
                    min="1"
                    placeholder="Enter number of rooms"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label>Number of Bathrooms</label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    min="1"
                    placeholder="Enter number of bathrooms"
                    required
                  />
                </FormGroup>
                
                {calculatePrice() && (
                  <PriceDisplay>
                    Estimated Price: <span>${calculatePrice()}</span>
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
                  <label>Pin Your Location</label>
                  <LocationPicker onLocationSelect={handleLocationSelect} />
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
                
                <BookButton type="submit" disabled={!isFormValid() || isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Book Deep Cleaning Service'}
                </BookButton>
              </form>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>

      <SuccessAnimation 
        isOpen={showSuccess} 
        onClose={handleSuccessClose}
        message={`Thank you for booking our Deep Cleaning service. We'll contact you shortly to confirm your appointment for ${formData.rooms} rooms and ${formData.bathrooms} bathrooms!`}
      />
    </>
  );
};

export default DeepCleaningModal; 