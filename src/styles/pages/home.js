import styled from '@emotion/styled';
import { motion } from 'framer-motion';
export const HeroSection = styled.section`
  height: 100vh;
  position: relative;
  overflow: hidden;
  margin: 0;
  padding: 0;
  margin-top: -10px;
  background-color: var(--primary-red);

  .slick-slider {
    height: 100vh;
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
`;

export const SlideContent = styled.div`
  height: 100vh;
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
    color: var(--primary-white);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    
    span {
      color: var(--primary-red);
    }
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color: var(--primary-white);
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
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
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform var(--transition-speed);

  &:hover {
    transform: translateY(-2px);
  }
`;

export const IntroSection = styled.section`
  background-color: var(--primary-white);
  padding: 5rem 0;
  display: flex;
  justify-content: center;
`;

export const IntroGrid = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  padding: 0;
  margin: 0;
  gap: 2rem;
`;


export const IntroTitleContainer = styled.div`
  flex: 1;
  padding-right: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
`;

export const IntroTitle = styled.h3`
  color: var(--primary-red);
  margin-bottom: 1rem;
  font-size: 2rem;
  font-weight: 600;
  text-align: start;
  margin-top: 2rem;
    `;
export const IntroText = styled.p`
  color: var(--primary-black);
  font-size: 1.2rem;
  font-weight: 400;
  text-align: start;
  margin-bottom: 2rem;
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
`;

export const FeaturesSection = styled.section`
  padding: 5rem 0;
  background-color: var(--primary-white);
`;


export const FeaturesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
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
}

p {
  color: var(--primary-black);
  transition: color 0.3s ease;
}

&:hover h3,
&:hover p {
  color: var(--primary-red);
}
`;

export const TitleIcon = styled.span`
  cursor: pointer;
  height: 100px;
  background-image: url('https://res.cloudinary.com/diunkrydn/image/upload/v1753191488/cleaning-mop-svgrepo-com_ugmx0q.svg');
  width: 100px;
`;

export const CTASection = styled.section`
  background-color: var(--secondary-beige);
  padding: 5rem 0;
  text-align: center;

  h2 {
    color: var(--primary-black);
    margin-bottom: 1.5rem;
  }

  p {
    max-width: 600px;
    margin: 0 auto 2rem;
    color: var(--primary-black);
  }
`;
