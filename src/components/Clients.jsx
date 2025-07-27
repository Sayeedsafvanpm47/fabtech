import { motion } from 'framer-motion';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ClientsSection = styled.section`
  padding: 4rem 0;
  background-color: #ffffff;
  overflow: hidden;
  max-width: 100%;
  border-radius: 15px;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: var(--primary-black);
`;

const ClientLogo = styled(motion.div)`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  
  img {
    max-width: 120px;
    height: 60px;
    object-fit: contain;
    filter: grayscale(100%);
    transition: all 0.3s ease;
    opacity: 0.7;
    
    &:hover {
      filter: grayscale(0%);
      opacity: 1;
      transform: scale(1.1);
    }
  }
`;

const SliderContainer = styled.div`
  margin: 0 auto;
  max-width: 1400px;
  padding: 0 20px;

  .slick-track {
    display: flex;
    align-items: center;
  }

  .slick-slide {
    opacity: 0.7;
    transition: opacity 0.3s ease;
  }

  .slick-slide:hover {
    opacity: 1;
  }
`;

const Clients = ({ logos = [] }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    swipe: false,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          speed: 4000,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          speed: 3000,
        }
      }
    ]
  };

  return (
    <ClientsSection>
      <SectionTitle>Our Clients</SectionTitle>
      <SliderContainer>
        <Slider {...settings}>
          {logos.map((logo, index) => (
            <ClientLogo key={index}>
              <img src={logo.url} alt={logo.name} title={logo.name} />
            </ClientLogo>
          ))}
        </Slider>
      </SliderContainer>
    </ClientsSection>
  );
};

export default Clients; 