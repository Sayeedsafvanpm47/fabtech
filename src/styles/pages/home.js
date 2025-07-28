import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const HeroSection = styled.section`
  height: 100vh;
  min-height: 500px;
  position: relative;
  overflow: hidden;
  margin: 0;
  padding: 0;
  margin-top: -10px;
  background-color: var(--primary-red);

  .slick-slider {
    height: 100vh;
    min-height: 500px;
    margin: 0;
    padding: 0;
  }

  .slick-list, .slick-track {
    height: 100%;
  }

  .slick-slide {
    margin: 0;
    padding: 0;
    
    & > div {
      height: 100%;
      margin: 0;
      padding: 0;
    }
  }

  .slick-dots {
    bottom: 25px;
    z-index: 10;
    
    li button:before {
      color: white;
      font-size: 12px;
    }
    
    li.slick-active button:before {
      color: var(--primary-red);
    }
  }

  @media (max-width: 768px) {
    height: 100vh;
    min-height: 600px;
    
    .slick-slider {
      height: 100vh;
      min-height: 600px;
    }
    
    .slick-dots {
      bottom: 15px;
      
      li button:before {
        font-size: 10px;
      }
    }
  }
`;

export const SlideContent = styled.div`
  height: 100vh;
  min-height: 500px;
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: 768px) {
    min-height: 600px;
    background-attachment: scroll;
  }
`;

export const HeroContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 2;
  width: 100%;
  max-width: 800px;
  padding: 0 1rem;

  h1 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    margin-bottom: 1.5rem;
    color: var(--primary-white);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    line-height: 1.2;
    
    span {
      color: var(--primary-red);
      display: block;
      margin-top: 0.5rem;
    }
  }

  p {
    font-size: clamp(1rem, 3vw, 1.2rem);
    margin-bottom: 2rem;
    color: var(--primary-white);
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    line-height: 1.4;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 2rem;
  }

  @media (max-width: 768px) {
    padding: 0 1.5rem;
    
    h1 {
      margin-bottom: 1rem;
      
      span {
        margin-top: 0.3rem;
      }
    }
    
    p {
      margin-bottom: 1.5rem;
    }
  }
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
`;

export const Button = styled.button`
  background-color: var(--primary-red);
  color: var(--primary-white);
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  font-size: clamp(1rem, 2.5vw, 1.1rem);
  font-weight: 600;
  cursor: pointer;
  transition: transform var(--transition-speed);
  min-width: 140px;

  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 0.875rem 1.5rem;
    width: auto;
    min-width: 120px;
  }
`;

export const IntroSection = styled.section`
  background-color: var(--primary-white);
  padding: 5rem 0;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 3rem 0;
  }
`;

export const IntroGrid = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  padding: 0 1rem;
  margin: 0;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 3rem;
    padding: 0 1.5rem;
  }

  @media (max-width: 480px) {
    gap: 2.5rem;
    padding: 0 1rem;
  }

  /* First intro section - animation first, then text on mobile */
  &:first-of-type {
    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  /* Second intro section - text first, then animation on mobile */
  &:nth-of-type(2) {
    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
`;

export const IntroTitleContainer = styled.div`
  flex: 1;
  padding-right: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding-right: 0;
    text-align: center;
    padding: 0 1rem;
  }

  @media (max-width: 480px) {
    padding: 0 0.5rem;
  }
`;

export const IntroImageContainer = styled.div`
  flex: 1;
  margin: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  img {
    width: auto;
    height: 100%;
    object-fit: contain;
    margin-left: 0;
  }

  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
    max-width: none;
    margin: 0 auto 1rem auto;
  }

  @media (max-width: 480px) {
    margin: 0 auto 0.5rem auto;
  }
`;

export const LottieContainer = styled.div`
  width: 100%;
  height: 200px;
  max-width: 360px;
  min-height: 250px;

  @media (max-width: 768px) {
    height: auto;
    max-width: 300px;
    margin: 0 auto;
  }

  @media (max-width: 480px) {
    max-width: 250px;
  }
`;

export const IntroTitle = styled.h3`
  color: var(--primary-red);
  margin-bottom: 1.5rem;
  font-size: clamp(1.8rem, 4vw, 2rem);
  font-weight: 600;
  text-align: start;
  margin-top: 2rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    text-align: center;
    margin-top: 0;
    margin-bottom: 2rem;
  }
`;

export const IntroText = styled.p`
  color: var(--primary-black);
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  font-weight: 400;
  text-align: start;
  margin-bottom: 2rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    text-align: center;
    margin-bottom: 2rem;
    padding: 0 1rem;
  }

  @media (max-width: 480px) {
    padding: 0 0.5rem;
    line-height: 1.7;
  }
`;

export const IntroCard = styled(motion.div)`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  
  h3 {
    color: var(--primary-red);
    margin-bottom: 1rem;
  }

  p {
    color: var(--primary-black);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const FeaturesSection = styled.section`
  padding: 5rem 0;
  background-color: var(--primary-white);

  @media (max-width: 768px) {
    padding: 3rem 0;
  }
`;

export const FeaturesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    padding: 0 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const FeatureCard = styled(motion.div)`
  transition: all 0.3s ease; 
  cursor: pointer;
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  border: 1px solid transparent;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    border: 1px solid var(--primary-red);
    background-color: #fffaf9;
  }

  h3 {
    color: var(--primary-red);
    margin-bottom: 1rem;
    transition: color 0.3s ease;
    font-size: clamp(1.1rem, 2.5vw, 1.3rem);
    line-height: 1.3;
  }

  p {
    color: var(--primary-black);
    transition: color 0.3s ease;
    font-size: clamp(0.9rem, 2vw, 1rem);
    line-height: 1.5;
  }

  &:hover h3,
  &:hover p {
    color: var(--primary-red);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    
    &:hover {
      transform: scale(1.02);
    }
  }

  @media (max-width: 480px) {
    padding: 1.25rem;
  }
`;

export const TitleIcon = styled.span`
  cursor: pointer;
  height: 100px;
  background-image: url('https://res.cloudinary.com/diunkrydn/image/upload/v1753191488/cleaning-mop-svgrepo-com_ugmx0q.svg');
  width: 100px;

  @media (max-width: 768px) {
    height: 80px;
    width: 80px;
  }
`;

export const CTASection = styled.section`
  background-color: var(--secondary-beige);
  padding: 5rem 0;
  text-align: center;

  h2 {
    color: var(--primary-black);
    margin-bottom: 1.5rem;
    font-size: clamp(1.8rem, 4vw, 2.5rem);
    line-height: 1.2;
  }

  p {
    max-width: 600px;
    margin: 0 auto 2rem;
    color: var(--primary-black);
    font-size: clamp(1rem, 2.5vw, 1.1rem);
    line-height: 1.5;
    padding: 0 1rem;
  }

  @media (max-width: 768px) {
    padding: 3rem 0;
    
    h2 {
      margin-bottom: 1rem;
    }
    
    p {
      margin-bottom: 1.5rem;
      padding: 0 1.5rem;
    }
  }
`;