import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import SEO from '../components/SEO';
import { useState, useEffect, lazy, Suspense } from 'react';
import ServiceCardSkeleton from '../components/common/ServiceCardSkeleton';
import { FaStar, FaQuoteRight, FaCheck } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import GoogleReviews from '../components/GoogleReviews';

// Lazy load the modal components
const DeepCleaningModal = lazy(() => import('../components/modals/DeepCleaningModal'));
const PestControlModal = lazy(() => import('../components/modals/PestControlModal'));
const CommonServiceModal = lazy(() => import('../components/modals/CommonServiceModal'));

const ServicesContainer = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  padding: 2rem 1rem;
  background-color: var(--secondary-beige);
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px); 
  -webkit-backdrop-filter: blur(10px); 

  border: 1px solid rgba(255, 255, 255, 0.2); 
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.2);

  color: #000; 
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

    backdrop-filter: blur(10px); 
  -webkit-backdrop-filter: blur(10px); 

  border: 1px solid rgba(7, 7, 7, 0.1); 
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(2, 4, 36, 0.2);
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

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }

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
      backdrop-filter: blur(10px); 
  -webkit-backdrop-filter: blur(10px); 

  border: 1px solid rgba(255, 255, 255, 0.2); 

  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.2);
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
  const [loadedImages, setLoadedImages] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  
  // Set this to true only when you want to show the Elfsight widget
  const showElfsightWidget = false;

  const services = [
    {
      id: 'deepcleaning',
      title: 'Deep Cleaning',
      description: "Experience a spotless transformation with Fabtech's deep cleaning services. We tackle hidden dirt, grime, and germs beyond the surface. Whether it's your home, office, or commercial space, our expert team ensures a hygienic, fresh, and professionally cleaned environment.",
      image: "https://res.cloudinary.com/diunkrydn/image/upload/v1753607451/33771032_2208.i121.001.S.m005.c13.isometric_husband_hour_v7e9rz.svg"
    },
    {
      id: 'facilitymanagement',
      title: 'Facility Management',
      description: "Fabtech offers complete facility management solutions tailored to your needs. From routine maintenance and cleaning to specialized technical services, we ensure smooth, safe, and efficient operations for your property—commercial, residential, or industrial—across Doha.",
      image: "https://res.cloudinary.com/diunkrydn/image/upload/v1753607449/12085694_20944192_mmp832.svg"
    },
    {
      id: 'hospitalitysupport',
      title: 'Hospitality Support',
      description: "Fabtech provides reliable hospitality support services tailored for hotels, restaurants, and event venues. Our trained staff ensures top-notch guest experiences by handling housekeeping, front desk, concierge, and more—helping you deliver excellence with every interaction.",
      image: "https://res.cloudinary.com/diunkrydn/image/upload/v1753607449/13638853_5312965_jjl6fk.svg"
    },
    {
      id: 'cleanerssupply',
      title: 'Cleaners Supply',
      description: "Need dependable cleaning staff? Fabtech supplies well-trained, professional cleaners for homes, offices, and commercial spaces. Our manpower solutions are flexible, affordable, and tailored to meet your daily, weekly, or monthly cleaning requirements across Doha.",
      image: "https://res.cloudinary.com/diunkrydn/image/upload/v1753607448/21683324_Team_of_professional_workers_in_uniform_standing_together_pyrja4.svg"
    },
    {
      id: 'pestcontrol',
      title: 'Pest Control',
      description: "Protect your space with Fabtech's pest control services. Our expert team uses safe and effective methods to eliminate insects, rodents, and other pests—ensuring a clean, hygienic, and pest-free environment for residential, commercial, and industrial properties.",
      image: "https://res.cloudinary.com/diunkrydn/image/upload/v1753607445/10780550_19198459_s3ciie.svg"
    },
    {
      id: 'construction',
      title: 'Construction',
      description: "Fabtech delivers reliable construction services from groundwork to finishing. Our skilled team handles residential and commercial projects with attention to quality, timelines, and safety—ensuring durable structures and seamless project execution across Qatar.",
      image: "https://res.cloudinary.com/diunkrydn/image/upload/v1753607447/13295440_5165970_ezr2r0.svg"
    },
    {
      id: 'landscaping',
      title: 'Landscaping',
      description: "Transform your outdoor space with Fabtech's professional landscaping services. We design, install, and maintain beautiful gardens, lawns, and green areas for homes, businesses, and public spaces—bringing nature and aesthetic appeal to your surroundings.",
      image: "https://res.cloudinary.com/diunkrydn/image/upload/v1753607446/7943051_3808782_uat65c.svg"
    },
    {
      id: 'disinfection',
      title: 'Disinfection',
      description: "Keep your environment safe with Fabtech's disinfection services. Using hospital-grade disinfectants and advanced methods, we sanitize residential, office, and industrial spaces—eliminating viruses, bacteria, and pathogens for a healthier space.",
      image: "https://res.cloudinary.com/diunkrydn/image/upload/v1753607453/8488009_3933943_haj2kt.svg"
    },
  ];

  useEffect(() => {
    // Preload all service images
    const loadImages = async () => {
      setIsLoading(true);
      const imagePromises = services.map(service => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = service.image;
          img.onload = () => {
            setLoadedImages(prev => ({
              ...prev,
              [service.id]: true
            }));
            resolve();
          };
          img.onerror = () => {
            setLoadedImages(prev => ({
              ...prev,
              [service.id]: false
            }));
            resolve();
          };
        });
      });

      await Promise.all(imagePromises);
      setIsLoading(false);
    };

    loadImages();
  }, []);

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
    { url: "https://res.cloudinary.com/diunkrydn/image/upload/v1753604916/WhatsApp_Image_2025-07-27_at_11.04.07_1_pa6bec.jpg", alt: "Professional cleaning team" },
    { url: "https://res.cloudinary.com/diunkrydn/image/upload/v1753604916/WhatsApp_Image_2025-07-27_at_11.04.07_2_i07dgs.jpg", alt: "Deep cleaning service" },
    { url: "https://res.cloudinary.com/diunkrydn/image/upload/v1753604916/WhatsApp_Image_2025-07-27_at_11.04.06_jyow43.jpg", alt: "Pest control service" },
    { url: "https://res.cloudinary.com/diunkrydn/image/upload/v1753604917/WhatsApp_Image_2025-07-27_at_11.04.07_j4r6qn.jpg", alt: "Facility management" },
  ];

  const handleBookService = (service) => {
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  const renderServiceModal = () => {
    if (!selectedService) return null;

    return (
      <Suspense fallback={null}>
        {(() => {
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
        })()}
      </Suspense>
    );
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
              {isLoading ? (
                <ServiceCardSkeleton />
              ) : (
                <>
                  <ServiceImage>
                    <img 
                      src={service.image} 
                      alt={service.title}
                      loading="lazy"
                    />
                  </ServiceImage>
                  <ServiceContent>
                    <h2>{service.title}</h2>
                    <p style={{height: "250px", overflow: "hidden"}}>{service.description}</p>
                    <Button onClick={() => handleBookService(service)}>Book Service</Button>
                  </ServiceContent>
                </>
              )}
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