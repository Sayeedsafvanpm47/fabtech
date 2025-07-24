import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import SEO from '../components/SEO';
import { useState } from 'react';
import DeepCleaningModal from '../components/modals/DeepCleaningModal';
import PestControlModal from '../components/modals/PestControlModal';
import CommonServiceModal from '../components/modals/CommonServiceModal';

const ServicesContainer = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  padding: 2rem 1rem;
  background-color: var(--secondary-beige);
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
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
    height: 230px;
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
    transform: translateY(-4px);
  }
`;

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 'deepcleaning',
      title: 'Deep Cleaning',
      description: "Experience a spotless transformation with Fabtech's deep cleaning services. We tackle hidden dirt, grime, and germs beyond the surface. Whether it's your home, office, or commercial space, our expert team ensures a hygienic, fresh, and professionally cleaned environment."
    },
    {
      id: 'facilitymanagement',
      title: 'Facility Management',
      description: "Fabtech offers complete facility management solutions tailored to your needs. From routine maintenance and cleaning to specialized technical services, we ensure smooth, safe, and efficient operations for your property—commercial, residential, or industrial—across Doha.",
    },
    {
      id: 'hospitalitysupport',
      title: 'Hospitality Support',
      description: "Fabtech provides reliable hospitality support services tailored for hotels, restaurants, and event venues. Our trained staff ensures top-notch guest experiences by handling housekeeping, front desk, concierge, and more—helping you deliver excellence with every interaction.",
    },
    {
      id: 'cleanerssupply',
      title: 'Cleaners Supply',
      description: "Need dependable cleaning staff? Fabtech supplies well-trained, professional cleaners for homes, offices, and commercial spaces. Our manpower solutions are flexible, affordable, and tailored to meet your daily, weekly, or monthly cleaning requirements across Doha.",
    },
    {
      id: 'pestcontrol',
      title: 'Pest Control',
      description: "Protect your space with Fabtech's pest control services. Our expert team uses safe and effective methods to eliminate insects, rodents, and other pests—ensuring a clean, hygienic, and pest-free environment for residential, commercial, and industrial properties.",
    },
    {
      id: 'construction',
      title: 'Construction',
      description: "Fabtech delivers reliable construction services from groundwork to finishing. Our skilled team handles residential and commercial projects with attention to quality, timelines, and safety—ensuring durable structures and seamless project execution across Qatar.",
    },
    {
      id: 'landscaping',
      title: 'Landscaping',
      description: "Transform your outdoor space with Fabtech's professional landscaping services. We design, install, and maintain beautiful gardens, lawns, and green areas for homes, businesses, and public spaces—bringing nature and aesthetic appeal to your surroundings.",
    },
    {
      id: 'disinfection',
      title: 'Disinfection',
      description: "Keep your environment safe with Fabtech's disinfection services. Using hospital-grade disinfectants and advanced methods, we sanitize residential, office, and industrial spaces—eliminating viruses, bacteria, and pathogens for a healthier space.",
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

  const handleBookService = (service) => {
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  const renderServiceModal = () => {
    if (!selectedService) return null;

    switch (selectedService.id) {
      case 'deepcleaning':
        return (
          <DeepCleaningModal
            isOpen={true}
            onClose={handleCloseModal}
            service={selectedService}
          />
        );
      case 'pestcontrol':
        return (
          <PestControlModal
            isOpen={true}
            onClose={handleCloseModal}
            service={selectedService}
          />
        );
      default:
        return (
          <CommonServiceModal
            isOpen={true}
            onClose={handleCloseModal}
            service={selectedService}
          />
        );
    }
  };

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
                <Button onClick={() => handleBookService(service)}>Book Service</Button>
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

      {renderServiceModal()}
    </>
  );
};

export default Services; 