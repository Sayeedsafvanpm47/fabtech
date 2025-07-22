import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

export const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 4rem;

  h1 {
    color: var(--primary-black);
    font-size: 2.5rem;
    margin-bottom: 1.5rem;

    span {
      color: var(--primary-red);
    }
  }

  p {
    max-width: 800px;
    margin: 0 auto;
    color: var(--primary-black);
    font-size: 1.2rem;
    line-height: 1.6;
  }
`;

export const StorySection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const StoryContent = styled.div`
  h2 {
    color: var(--primary-red);
    margin-bottom: 1.5rem;
    font-size: 2rem;
  }

  p {
    color: var(--primary-black);
    margin-bottom: 1rem;
    line-height: 1.6;
  }
`;

export const StoryImage = styled.div`
  background-color: var(--secondary-beige);
  border-radius: 15px;
  height: 400px;
  position: relative;
  overflow: hidden;
`;

export const ValuesSection = styled.section`
  background-color: var(--secondary-beige);
  padding: 4rem 0;
  margin: 4rem 0;
`;

export const ValuesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

export const ValueCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h3 {
    color: var(--primary-red);
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  p {
    color: var(--primary-black);
    line-height: 1.6;
  }
`;

export const TeamSection = styled.section`
  text-align: center;
  margin-bottom: 4rem;

  h2 {
    color: var(--primary-black);
    font-size: 2.5rem;
    margin-bottom: 3rem;

    span {
      color: var(--primary-red);
    }
  }
`;

export const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

export const TeamMember = styled(motion.div)`
  text-align: center;

  .image-container {
    width: 200px;
    height: 200px;
    margin: 0 auto 1.5rem;
    border-radius: 50%;
    overflow: hidden;
    background-color: var(--primary-black);
  }

  h3 {
    color: var(--primary-red);
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }

  p {
    color: var(--primary-black);
    font-size: 0.9rem;
  }
`;
