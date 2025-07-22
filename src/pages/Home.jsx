import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import SEO from '../components/SEO';

const HeroSection = styled.section`
  background: linear-gradient(135deg, var(--primary-black) 0%, #333 100%);
  color: var(--primary-white);
  padding: 6rem 0;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;

  h1 {
    font-size: 3rem;
    margin-bottom: 1.5rem;
    span {
      color: var(--primary-red);
    }
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color: var(--secondary-beige);
  }
`;

const Button = styled.button`
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

const FeaturesSection = styled.section`
  padding: 5rem 0;
  background-color: var(--primary-white);
`;

const FeaturesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled(motion.div)`
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

const CTASection = styled.section`
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

const Home = () => {
  const features = [
    {
      title: 'Feature 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      title: 'Feature 2',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      title: 'Feature 3',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
    },
  ];

  return (
    <>
      <SEO 
        title="Home"
        description="Welcome to YourBrand - Your trusted partner for professional services."
        keywords="yourbrand, services, professional, business"
      />

      <HeroSection>
        <HeroContent>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Welcome to <span>YourBrand</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We deliver exceptional solutions tailored to your needs
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button>Get Started</Button>
          </motion.div>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </FeaturesSection>

      <CTASection>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Get Started?</h2>
          <p>Join us today and experience the difference our services can make for your business.</p>
          <Button>Contact Us</Button>
        </motion.div>
      </CTASection>
    </>
  );
};

export default Home; 