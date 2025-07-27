import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sendContactEmail, initEmailJS } from '../utils/emailService';

// Social Media Icons as SVG components
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.531 3.488"/>
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
);

const MapIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  // Initialize EmailJS when component mounts
  useEffect(() => {
    initEmailJS();
  }, []);

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
    setSubmitStatus('');

    try {
      // Prepare data in the format expected by your email service
      const contactData = {
        to_name: "Admin",
        from_name: formData.name,
        message: `Subject: ${formData.subject}\n\nMessage: ${formData.message}`,
        reply_to: formData.email,
        customer_email: formData.email,
        customer_phone: '', // You can add phone field if needed
        service_type: 'Contact Form Inquiry'
      };

      const result = await sendContactEmail(contactData);
      console.log('Email sent successfully:', result);
      setSubmitStatus('success');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Email send failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: <WhatsAppIcon />,
      link: 'https://wa.me/1234567890', // Replace with your WhatsApp number
      color: '#25D366'
    },
    {
      name: 'Email',
      icon: <EmailIcon />,
      link: 'mailto:info@yourbrand.com', // Replace with your email
      color: '#EA4335'
    },
    {
      name: 'Instagram',
      icon: <InstagramIcon />,
      link: 'https://instagram.com/yourbrand', // Replace with your Instagram
      color: '#E4405F'
    },
    {
      name: 'Facebook',
      icon: <FacebookIcon />,
      link: 'https://facebook.com/yourbrand', // Replace with your Facebook
      color: '#1877F2'
    }
  ];

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem 1rem',
      fontFamily: "'Poppins', sans-serif"
    }}>
      {/* Page Title */}
      <h1 style={{
        textAlign: 'center',
        color: '#333',
        marginBottom: '3rem',
        fontSize: '2.5rem',
        fontWeight: '700'
      }}>
        Get in <span style={{ color: '#dc2626' }}>Touch</span>
      </h1>

      {/* Main Contact Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
        gap: '4rem',
        marginBottom: '4rem'
      }}>
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 style={{
            color: '#dc2626',
            marginBottom: '2rem',
            fontSize: '1.8rem',
            fontWeight: '600'
          }}>
            Contact Information
          </h2>

          {/* Contact Items */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              color: '#dc2626',
              marginRight: '1rem',
              width: '24px',
              height: '24px'
            }}>
              <PhoneIcon />
            </div>
            <div>
              <h3 style={{
                color: '#333',
                marginBottom: '0.5rem',
                fontSize: '1.2rem',
                fontWeight: '500'
              }}>Phone</h3>
              <p style={{ color: '#666', lineHeight: '1.6', margin: 0 }}>(+974) 5518 7619</p>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              color: '#dc2626',
              marginRight: '1rem',
              width: '24px',
              height: '24px'
            }}>
              <EmailIcon />
            </div>
            <div>
              <h3 style={{
                color: '#333',
                marginBottom: '0.5rem',
                fontSize: '1.2rem',
                fontWeight: '500'
              }}>Email</h3>
              <p style={{ color: '#666', lineHeight: '1.6', margin: 0 }}>fms@fabtechqatar.com</p>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <div style={{
              color: '#dc2626',
              marginRight: '1rem',
              width: '24px',
              height: '24px'
            }}>
              <MapIcon />
            </div>
            <div>
              <h3 style={{
                color: '#333',
                marginBottom: '0.5rem',
                fontSize: '1.2rem',
                fontWeight: '500'
              }}>Address</h3>
              <p style={{ color: '#666', lineHeight: '1.6', margin: 0 }}>
              Madina Khalifa (S) Building 138, Zone 34, Street 362 <br></br>Al Rabiah Building 1 
              Second floor S14, Doha
              </p>
            </div>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 style={{
              color: '#333',
              marginBottom: '1rem',
              fontSize: '1.2rem',
              fontWeight: '500'
            }}>Follow Us</h3>
            <div style={{
              display: 'flex',
              gap: '1rem'
            }}>
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: social.color,
                    color: 'white',
                    textDecoration: 'none',
                    transition: 'transform 0.3s ease'
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '15px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#333',
              fontWeight: '500'
            }}>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.8rem',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '1rem',
                transition: 'border-color 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#dc2626'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#333',
              fontWeight: '500'
            }}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.8rem',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '1rem',
                transition: 'border-color 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#dc2626'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#333',
              fontWeight: '500'
            }}>Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.8rem',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '1rem',
                transition: 'border-color 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#dc2626'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#333',
              fontWeight: '500'
            }}>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.8rem',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '1rem',
                minHeight: '150px',
                resize: 'vertical',
                transition: 'border-color 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#dc2626'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          {submitStatus === 'success' && (
            <div style={{
              backgroundColor: '#10b981',
              color: 'white',
              padding: '0.75rem',
              borderRadius: '5px',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              Message sent successfully! We'll get back to you soon.
            </div>
          )}

          {submitStatus === 'error' && (
            <div style={{
              backgroundColor: '#ef4444',
              color: 'white',
              padding: '0.75rem',
              borderRadius: '5px',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              Failed to send message. Please try again or contact us directly.
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              backgroundColor: isSubmitting ? '#ccc' : '#dc2626',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '5px',
              fontWeight: '600',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'transform 0.3s ease',
              width: '100%',
              fontSize: '1rem'
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.target.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
            }}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </motion.form>
      </div>

      {/* Map Section */}
      <section style={{ marginTop: '4rem' }}>
        <h2 style={{
          color: '#333',
          marginBottom: '2rem',
          fontSize: '1.8rem',
          fontWeight: '600',
          textAlign: 'center'
        }}>
          Find Us Here
        </h2>
        <div style={{
          height: '400px',
          borderRadius: '15px',
          overflow: 'hidden',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.6548721234567!2d51.47348001507293!3d25.3080666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45db74e7219651%3A0x1ebab8047a9617f!2sMadina%20Khalifa%20Building%20138%3B%20Zone%2034%3B%20Street%20362%D8%8C%20Al%20Rabiah%20Building%201%3B%20Second%20floor%20S14%2C%20Doha!5e0!3m2!1sen!2sqa!4v1640995200000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Our Location - Madina Khalifa Building, Doha"
          ></iframe>
        </div>
        <p style={{
          textAlign: 'center',
          marginTop: '1rem',
          color: '#666',
          fontSize: '0.9rem'
        }}>
          Click on the map to get directions to our office
        </p>
      </section>
    </div>
  );
};

export default Contact;