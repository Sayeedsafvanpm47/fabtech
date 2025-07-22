import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import SEO from '../components/SEO';

const ServicesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PageTitle = styled.h1`
  text-align: center;
  color: var(--primary-black);
  margin-bottom: 3rem;
  font-size: 2.5rem;

  span {
    color: var(--primary-red);
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const ServiceCard = styled(motion.div)`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform var(--transition-speed);

  &:hover {
    transform: translateY(-5px);
  }
`;

const ServiceImage = styled.div`
  height: 200px;
  background-color: var(--primary-black);
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 30%;
    background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  }
`;

const ServiceContent = styled.div`
  padding: 1.5rem;

  h2 {
    color: var(--primary-red);
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  p {
    color: var(--primary-black);
    margin-bottom: 1rem;
    line-height: 1.6;
  }
`;

const PricingSection = styled.section`
  background-color: var(--secondary-beige);
  padding: 4rem 0;
  margin-top: 4rem;
`;

const PricingContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const PricingCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h3 {
    color: var(--primary-red);
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  .price {
    font-size: 2.5rem;
    color: var(--primary-black);
    margin-bottom: 1.5rem;

    span {
      font-size: 1rem;
      color: #666;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin-bottom: 2rem;

    li {
      margin-bottom: 0.8rem;
      color: var(--primary-black);
    }
  }
`;

const Button = styled.button`
  background-color: var(--primary-red);
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: transform var(--transition-speed);

  &:hover {
    transform: translateY(-2px);
  }
`;

const Services = () => {
  const services = [
    {
      id: 'service1',
      title: 'Service 1',
      description: 'Comprehensive solution for your business needs with cutting-edge technology.',
    },
    {
      id: 'service2',
      title: 'Service 2',
      description: 'Professional consulting services to help your business grow and succeed.',
    },
    {
      id: 'service3',
      title: 'Service 3',
      description: 'Custom development solutions tailored to your specific requirements.',
    },
    {
      id: 'service4',
      title: 'Service 4',
      description: 'Strategic planning and implementation for optimal business outcomes.',
    },
  ];

  const pricingPlans = [
    {
      title: 'Basic',
      price: '29',
      features: [
        'Feature 1',
        'Feature 2',
        'Feature 3',
        'Email Support',
      ],
    },
    {
      title: 'Professional',
      price: '99',
      features: [
        'All Basic Features',
        'Feature 4',
        'Feature 5',
        'Priority Support',
      ],
    },
    {
      title: 'Enterprise',
      price: '299',
      features: [
        'All Pro Features',
        'Feature 6',
        'Feature 7',
        '24/7 Support',
      ],
    },
  ];

  return (
    <>
      <SEO
        title="Services"
        description="Explore our comprehensive range of professional services designed to help your business succeed."
        keywords="services, business solutions, consulting, development"
      />

      <ServicesContainer>
        <PageTitle>Our <span>Services</span></PageTitle>

        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              id={service.id}
            >
              <ServiceImage />
              <ServiceContent>
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                <Button>Learn More</Button>
              </ServiceContent>
            </ServiceCard>
          ))}
        </ServicesGrid>

        <PricingSection>
          <PageTitle>Pricing <span>Plans</span></PageTitle>
          <PricingContainer>
            {pricingPlans.map((plan, index) => (
              <PricingCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3>{plan.title}</h3>
                <div className="price">
                  ${plan.price}<span>/month</span>
                </div>
                <ul>
                  {plan.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <Button>Choose Plan</Button>
              </PricingCard>
            ))}
          </PricingContainer>
        </PricingSection>
      </ServicesContainer>
    </>
  );
};

export default Services; 