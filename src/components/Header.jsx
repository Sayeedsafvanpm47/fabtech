import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import styled from '@emotion/styled';

const HeaderContainer = styled.header`
  background-color:rgba(139, 0, 0, 0);
  opacity: 0.9;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled(Link)`
  color: var(--primary-black);
  font-size: 1.5rem;
  font-weight: 700;
  img {
    width: 80%;
    height: 80%;
    object-fit: contain;
    border-radius: 20px;
  }
    @media (max-width: 768px) {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
      border-radius: 30px;
  text-decoration: none;
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--primary-red);
  font-size: 1.5rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #8B0000;
    padding: 1rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
`;

const NavLink = styled(Link)`
  color: red;
  text-decoration: none;
  font-weight: 500;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: black;
    transition: width var(--transition-speed);
  }

  &:hover:after,
  &.active:after {
    width: 100%;
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <HeaderContainer>
      <Nav>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Logo to="/"><img src="https://res.cloudinary.com/diunkrydn/image/upload/v1759834153/fab_full_logo_x5zlzu.png" alt="Fabtech Services W.L.L" /></Logo>
        </motion.div>

        <MenuButton onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </MenuButton>

        <NavLinks isOpen={isMenuOpen}>
          {[
            { path: '/', label: 'Home' },
            { path: '/services', label: 'Services' },
            { path: '/about', label: 'About' },
            { path: '/contact', label: 'Contact' },
            // { path: '/blog', label: 'Blog' },
          ].map((link) => (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <NavLink
                to={link.path}
                className={location.pathname === link.path ? 'active' : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            </motion.div>
          ))}
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header; 