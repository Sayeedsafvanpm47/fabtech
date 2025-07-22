import { motion } from 'framer-motion';

import SEO from '../components/SEO';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import slide1 from '../assets/images/slide1.jpg';
import slide2 from '../assets/images/slide2.jpg';
import slide3 from '../assets/images/slide3.jpg';
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

import { Player } from '@lottiefiles/react-lottie-player';
import { HeroSection, FeaturesSection, FeaturesGrid, FeatureCard, CTASection, Button, HeroContent, SlideContent,
   Overlay, TitleIcon ,IntroSection, IntroText, IntroGrid, IntroTitle, IntroTitleContainer, IntroImageContainer } from '../styles/pages/home';  

const Home = () => {
  const features = [
    {
      title: 'Deep Cleaning',
      description: 'From floors to ceilings, we make every corner sparkle — the kind of clean you’ll brag about.',
    },
    {
      title: 'Facility Management',
      description: 'We keep your building running like a well-oiled machine — clean, safe, and efficient.',
    },
    {
      title: 'Hospitality Support',
      description: 'Trained staff that brings 5-star service wherever you need it — with a smile.',
    },
    {
      title: 'Cleaners Supply',
      description: 'Need manpower? We’ve got skilled, uniformed cleaners ready to go when you are.',
    },
    {
      title: 'Pest Control',
      description: 'Bye bugs, bye stress. We eliminate pests and keep them gone — discreetly and effectively.',
    },
    {
      title: 'Construction Works',
      description: 'From renovations to fixes, post construction mess to clean up, we build it better and cleaner — no shortcuts.',
    },
    {
      title: 'Landscaping',
      description: 'Green, neat, and wow-worthy — we shape your outdoor spaces into scenes you’ll love.',
    },
    {
      title: 'Disinfection Services',
      description: 'Germs don’t stand a chance. We sanitize spaces with hospital-grade solutions — fast and safe.',
    }
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    arrows: false,
  };

  const slides = [
    {
      image: slide1,
      title: 'Welcome to',
      description: 'We deliver exceptional solutions tailored to your needs',
    },
    {
      image: slide2,
      title: 'Transform Your Business',
      description: 'Innovative solutions for modern challenges',
    },
    {
      image: slide3,
      title: 'Future of Success',
      description: 'Partner with us for sustainable growth',
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
        <Slider {...sliderSettings}>
          {slides.map((slide, index) => (
            <div key={index}>
              <SlideContent style={{ backgroundImage: `url(${slide.image})` }}>
                <Overlay />
                <HeroContent>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {slide.title} <span>YourBrand</span>
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {slide.description}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <Button>Get Started</Button>
                  </motion.div>
                </HeroContent>
              </SlideContent>
            </div>
          ))}
        </Slider>
      </HeroSection>
      <IntroSection>
        <IntroGrid>
          <IntroImageContainer>
            <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
        >
          <DotLottieReact
      src="https://res.cloudinary.com/diunkrydn/raw/upload/v1753185901/Meditation_u5y0oi.lottie"
      loop
      autoplay
      style={{ width: '360px', height: '300px' }}
    />
          </motion.div>
          </IntroImageContainer>
          <IntroTitleContainer>
          <IntroTitle>
          <p>Step Into Fabtech</p>
         </IntroTitle>
         <IntroText>
         Since 2016, we've been transforming spaces across Qatar with expert services in Cleaning, Facility Management, Civil Works, Pest Control, Hospitality, and more.

From spotless homes to smart buildings, we make spaces cleaner, safer, and more efficient, all with a team that gets things done right.

Clean. Build. Manage. Simplify.

That’s Fabtech.
         </IntroText>
          </IntroTitleContainer>
         
        </IntroGrid>
      </IntroSection>

      <IntroSection style={{ backgroundColor: 'beige'}}>
      
      <IntroGrid>
      <IntroTitleContainer>
            <IntroTitle style={{ fontSize: '4rem', fontWeight: 'bold', color: 'var(--primary-black)' }}>
              <p>Services We Offer</p>
            </IntroTitle>
          </IntroTitleContainer>
          <DotLottieReact
      src="https://res.cloudinary.com/diunkrydn/raw/upload/v1753187261/Services_nbruts.json"
      loop
      autoplay
      style={{ width: '375px', height: '375px' }}
    />
         
        </IntroGrid>
       
      </IntroSection>

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
              <h3>{feature.title}</h3> <TitleIcon />
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