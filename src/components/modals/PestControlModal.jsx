import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { BaseModalStyles } from './ModalStyles';

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

const PestControlModal = ({ isOpen, onClose, service }) => {
  const [formData, setFormData] = useState({
    propertyType: '',
    squareFeet: '',
    pestType: [],
    address: '',
    email: '',
    phone: '',
    preferredDate: ''
  });
  
  const pestTypes = [
    { id: 'ants', label: 'Ants', basePrice: 80 },
    { id: 'cockroaches', label: 'Cockroaches', basePrice: 100 },
    { id: 'rodents', label: 'Rodents', basePrice: 150 },
    { id: 'termites', label: 'Termites', basePrice: 200 },
    { id: 'bedbugs', label: 'Bed Bugs', basePrice: 180 }
  ];

  const calculatePrice = () => {
    if (!formData.propertyType || !formData.squareFeet || formData.pestType.length === 0) return null;
    
    const areaSurcharge = Math.ceil(parseInt(formData.squareFeet) / 1000) * 50;
    const propertyMultiplier = {
      '1bhk': 1,
      '2bhk': 1.2,
      '3bhk': 1.4,
      'villa': 1.8
    }[formData.propertyType];

    const pestTypeTotal = formData.pestType.reduce((total, type) => {
      const pestInfo = pestTypes.find(p => p.id === type);
      return total + (pestInfo ? pestInfo.basePrice : 0);
    }, 0);

    return Math.round((pestTypeTotal * propertyMultiplier) + areaSurcharge);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        pestType: checked 
          ? [...prev.pestType, name]
          : prev.pestType.filter(type => type !== name)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Pest Control Booking:', {
      service: service.title,
      ...formData,
      estimatedPrice: calculatePrice()
    });
    onClose();
  };

  const isFormValid = () => {
    return formData.propertyType && 
           formData.squareFeet &&
           formData.pestType.length > 0 &&
           formData.address && 
           formData.email && 
           formData.phone &&
           formData.preferredDate;
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
              <h3>Pest Control Service Details</h3>
              <p>
                - Professional pest inspection included<br />
                - Eco-friendly treatment methods<br />
                - 30-day service guarantee<br />
                - Follow-up visit if required<br />
                - Preventive measures consultation
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
                <label>Property Size (Square Feet)</label>
                <input
                  type="number"
                  name="squareFeet"
                  value={formData.squareFeet}
                  onChange={handleInputChange}
                  min="100"
                  placeholder="Enter property size in sq ft"
                  required
                />
              </FormGroup>

              <FormGroup>
                <label>Select Pest Types to Control</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                  {pestTypes.map(pest => (
                    <label key={pest.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input
                        type="checkbox"
                        name={pest.id}
                        checked={formData.pestType.includes(pest.id)}
                        onChange={handleInputChange}
                      />
                      {pest.label}
                    </label>
                  ))}
                </div>
              </FormGroup>

              <FormGroup>
                <label>Preferred Treatment Date</label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
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
                Book Pest Control Service
              </BookButton>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default PestControlModal; 