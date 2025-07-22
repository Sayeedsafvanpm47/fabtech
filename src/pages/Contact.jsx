import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import SEO from '../components/SEO';
import { ContactContainer, PageTitle, ContactSection, ContactInfo, InfoItem, ContactForm, FormGroup, SubmitButton, MapSection } from '../styles/pages/contact'; 


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    setIsSubmitting(false);
    alert('Message sent successfully!');
  };

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with us. We'd love to hear from you and answer any questions you may have."
        keywords="contact, get in touch, contact form, location"
      />

      <ContactContainer>
        <PageTitle>Get in <span>Touch</span></PageTitle>

        <ContactSection>
          <ContactInfo>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2>Contact Information</h2>
              <InfoItem>
                <FaPhone />
                <div>
                  <h3>Phone</h3>
                  <p>(123) 456-7890</p>
                </div>
              </InfoItem>
              <InfoItem>
                <FaEnvelope />
                <div>
                  <h3>Email</h3>
                  <p>info@yourbrand.com</p>
                </div>
              </InfoItem>
              <InfoItem>
                <FaMapMarkerAlt />
                <div>
                  <h3>Address</h3>
                  <p>123 Business Street<br />City, State 12345</p>
                </div>
              </InfoItem>
            </motion.div>
          </ContactInfo>

          <ContactForm
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FormGroup>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </SubmitButton>
          </ContactForm>
        </ContactSection>

        <MapSection>
          <div className="map-container">
            {/* Add your map integration here */}
          </div>
        </MapSection>
      </ContactContainer>
    </>
  );
};

export default Contact; 