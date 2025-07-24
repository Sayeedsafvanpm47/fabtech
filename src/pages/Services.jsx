import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import SEO from '../components/SEO';
import { useState } from 'react';
import DeepCleaningModal from '../components/modals/DeepCleaningModal';
import PestControlModal from '../components/modals/PestControlModal';
import CommonServiceModal from '../components/modals/CommonServiceModal';
import { FaStar, FaQuoteRight, FaCheck } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import GoogleReviews from '../components/GoogleReviews';

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

// New styled components for additional sections
const Section = styled.section`
  padding: 4rem 0;
  background: ${props => props.background || 'white'};
`;

const WhyChooseUsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;

  h3 {
    color: var(--primary-red);
    margin: 1rem 0;
    font-size: 1.3rem;
  }

  p {
    color: var(--primary-black);
    line-height: 1.6;
  }

  svg {
    color: var(--primary-red);
    font-size: 2.5rem;
  }
`;

const ReviewsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const ReviewCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 1rem;
  position: relative;

  .quote-icon {
    position: absolute;
    top: -15px;
    right: 20px;
    color: var(--primary-red);
    font-size: 2.5rem;
    opacity: 0.2;
  }

  .stars {
    color: #FFD700;
    margin-bottom: 1rem;
  }

  p {
    font-style: italic;
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  .reviewer-info {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    .reviewer {
      font-weight: bold;
      color: var(--primary-red);
    }

    .position {
      font-size: 0.9rem;
      color: #666;
    }
  }
`;

const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const FAQContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const FAQItem = styled.div`
  margin-bottom: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;

  .question {
    padding: 1rem;
    background: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    font-weight: 500;
    color: var(--primary-black);

    svg {
      transition: transform 0.3s;
      transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
      color: var(--primary-red);
    }
  }

  .answer {
    padding: ${props => props.isOpen ? '1rem' : '0 1rem'};
    max-height: ${props => props.isOpen ? '500px' : '0'};
    overflow: hidden;
    transition: all 0.3s;
    background: #f9f9f9;
    line-height: 1.6;
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const GalleryItem = styled(motion.div)`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  aspect-ratio: 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [openFAQ, setOpenFAQ] = useState(null);
  
  // Set this to true only when you want to show the Elfsight widget
  const showElfsightWidget = false;

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

  const features = [
    {
      icon: "🏆",
      title: "Experienced Team",
      description: "Our highly trained professionals bring years of expertise to every project."
    },
    {
      icon: "⭐",
      title: "Quality Service",
      description: "We maintain the highest standards of service quality and customer satisfaction."
    },
    {
      icon: "🌟",
      title: "24/7 Support",
      description: "Round-the-clock customer support to address all your concerns."
    },
    {
      icon: "💪",
      title: "Reliable Solutions",
      description: "Dependable services that you can count on, every single time."
    }
  ];

  const reviews = [
    {
      text: "Absolutely outstanding service! The team was not only professional but went above and beyond our expectations. They paid attention to every detail and left our space immaculate.",
      author: "Mohammed Al-Sayed",
      rating: 5,
      position: "Business Owner"
    },
    {
      text: "We've been using their services for our office complex for over a year now. Their consistency and reliability are unmatched. The staff is always courteous and thorough.",
      author: "Sara Al-Thani",
      rating: 5,
      position: "Property Manager"
    },
    {
      text: "The deep cleaning service transformed our home completely. Their team is well-trained, uses eco-friendly products, and delivers exceptional results. Highly recommended!",
      author: "Ahmed Khalil",
      rating: 5,
      position: "Homeowner"
    },
    {
      text: "Professional, punctual, and perfect execution! Their attention to detail and customer service is exceptional. They've made maintaining our facilities so much easier.",
      author: "Fatima Al-Mansouri",
      rating: 5,
      position: "Facility Director"
    }
  ];

  const faqs = [
    {
      question: "What areas do you service?",
      answer: "We provide services throughout Doha and surrounding areas. Contact us for specific location availability."
    },
    {
      question: "How do you price your services?",
      answer: "Our pricing is based on factors like property size, service type, and specific requirements. We provide detailed quotes after initial consultation."
    },
    {
      question: "Are your cleaning products eco-friendly?",
      answer: "Yes, we use environmentally friendly cleaning products that are safe for your family and pets while being effective."
    },
    {
      question: "Do you provide emergency services?",
      answer: "Yes, we offer emergency services for urgent situations. Contact our 24/7 helpline for immediate assistance."
    }
  ];

  const galleryImages = [
    { url: "https://res.cloudinary.com/diunkrydn/image/upload/v1753271854/housekeeper-holding-bottle-with-cleaner-liquid-hands_1_zvaskl.avif", alt: "Professional cleaning team" },
    { url: "https://res.cloudinary.com/diunkrydn/image/upload/v1753271854/housekeeper-holding-bottle-with-cleaner-liquid-hands_1_zvaskl.avif", alt: "Deep cleaning service" },
    { url: "https://res.cloudinary.com/diunkrydn/image/upload/v1753271854/housekeeper-holding-bottle-with-cleaner-liquid-hands_1_zvaskl.avif", alt: "Pest control service" },
    { url: "https://res.cloudinary.com/diunkrydn/image/upload/v1753271854/housekeeper-holding-bottle-with-cleaner-liquid-hands_1_zvaskl.avif", alt: "Facility management" },
    { url: "https://res.cloudinary.com/diunkrydn/image/upload/v1753271854/housekeeper-holding-bottle-with-cleaner-liquid-hands_1_zvaskl.avif", alt: "Construction service" },
    { url: "https://res.cloudinary.com/diunkrydn/image/upload/v1753271854/housekeeper-holding-bottle-with-cleaner-liquid-hands_1_zvaskl.avif", alt: "Landscaping project" }
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

        {/* <PricingSection>
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
        </PricingSection> */}

        {/* Why Choose Us Section */}
       
      </ServicesContainer>
      <Section style={{margin: "2rem", borderRadius: "15px"}} background="#fce905">
          <PageTitle>Why <span>Choose Us</span></PageTitle>
          <WhyChooseUsGrid>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                as={motion.div}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{backgroundColor: "black", cursor: "pointer"}} 
              >
                <div>{feature.icon}</div>
                <h3 style={{color: "white"}}>{feature.title}</h3>
                <p style={{color: "white"}}>{feature.description}</p>
              </FeatureCard>
            ))}
          </WhyChooseUsGrid>
        </Section>

        {/* Google Reviews Section */}
        <Section>
          <PageTitle>Client <span>Reviews</span></PageTitle>
          {showElfsightWidget ? (
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
              <GoogleReviews />
            </div>
          ) : (
            <ReviewsContainer>
              <ReviewsGrid>
                {reviews.map((review, index) => (
                  <ReviewCard
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <FaQuoteRight className="quote-icon" />
                    <div className="stars">
                      {[...Array(review.rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                    <p>"{review.text}"</p>
                    <div className="reviewer-info">
                      <span className="reviewer">- {review.author}</span>
                      <span className="position">{review.position}</span>
                    </div>
                  </ReviewCard>
                ))}
              </ReviewsGrid>
            </ReviewsContainer>
          )}
        </Section>

        {/* FAQ Section */}
        <Section background="var(--secondary-beige)">
          <PageTitle>Frequently Asked <span>Questions</span></PageTitle>
          <FAQContainer>
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                isOpen={openFAQ === index}
                as={motion.div}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div 
                  className="question"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  {faq.question}
                  <IoMdArrowDropdown />
                </div>
                <div className="answer">
                  {faq.answer}
                </div>
              </FAQItem>
            ))}
          </FAQContainer>
        </Section>

        {/* Gallery Section */}
        <Section>
          <PageTitle>Our <span>Gallery</span></PageTitle>
          <GalleryGrid>
            {galleryImages.map((image, index) => (
              <GalleryItem
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <img src={image.url} alt={image.alt} />
              </GalleryItem>
            ))}
          </GalleryGrid>
        </Section>

      {renderServiceModal()}
    </>
  );
};

export default Services; 