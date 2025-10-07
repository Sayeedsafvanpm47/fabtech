import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import styled from '@emotion/styled';

const FooterContainer = styled.footer`
  background-color: var(--primary-black);
  color: var(--primary-white);
  padding: 4rem 0 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    color: var(--primary-red);
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 0.8rem;
  }

  a {
    color: var(--primary-white);
    text-decoration: none;
    transition: color var(--transition-speed);

    &:hover {
      color: var(--secondary-beige);
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  a {
    color: var(--primary-white);
    font-size: 1.5rem;
    transition: color var(--transition-speed);

    &:hover {
      color: var(--primary-red);
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>About Us</h3>
          <p>We are dedicated to providing exceptional cleaning and facility management services in Qatar.</p>
          <SocialLinks>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            {/* <li><Link to="/blog">Blog</Link></li> */}
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Services</h3>
          <ul>
            <li><Link to="/services">Deep Cleaning</Link></li>
            <li><Link to="/services">Facility Management</Link></li>
            <li><Link to="/services">Hospitality</Link></li>
            <li><Link to="/services">Cleaners Supply</Link></li>
            <li><Link to="/services">Pest Control</Link></li>
            <li><Link to="/services">Construction</Link></li>
            <li><Link to="/services">Landscaping</Link></li>
            <li><Link to="/services">Disinfection</Link></li>
         
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Contact Info</h3>
          <p style={{ lineHeight: '1.6', margin: 0 }}>
              Madina Khalifa (S) Building 138, Zone 34, Street 362 <br></br>Al Rabiah Building 1 
              Second floor S14, Doha
              </p>
        </FooterSection>
      </FooterContent>

      <Copyright>
        <p>&copy; {new Date().getFullYear()} Fabtech Services W.L.L. All rights reserved.</p>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer; 