import { motion } from 'framer-motion';

import SEO from '../components/SEO';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Clients from '../components/Clients';
import { clientLogos } from '../constants/ClientLogos';
import { useNavigate } from 'react-router-dom';

import slide1 from '../assets/images/slide1.jpg';
import slide2 from '../assets/images/slide2.jpg';
import slide3 from '../assets/images/slide3.jpg';
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

import { Player } from '@lottiefiles/react-lottie-player';
import { HeroSection, FeaturesSection, FeaturesGrid, FeatureCard, CTASection, Button, HeroContent, SlideContent,
   Overlay, TitleIcon,LottieContainer ,IntroSection, IntroText, IntroGrid, IntroTitle, IntroTitleContainer, IntroImageContainer } from '../styles/pages/home';  
import { image } from 'framer-motion/client';

const Home = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      title: 'Deep Cleaning',
      description: "From floors to ceilings, we make every corner sparkle — the kind of clean you'll brag about.",
      image : 'https://res.cloudinary.com/diunkrydn/image/upload/v1753191488/cleaning-mop-svgrepo-com_ugmx0q.svg'
    },
    {
      title: 'Facility Management',
      description: "We keep your building running like a well-oiled machine — clean, safe, and efficient.",
      image: 'https://res.cloudinary.com/diunkrydn/image/upload/v1753192087/building-svgrepo-com_uxsnqw.svg'
    },
    {
      title: 'Hospitality Support',
      description: 'Trained staff that brings 5-star service wherever you need it — with a smile.',
      image: 'https://res.cloudinary.com/diunkrydn/image/upload/v1753192338/family-restaurant-male-clerk-svgrepo-com_cagdh2.svg'
    },
    {
      title: 'Cleaners Supply',
      description: "Need manpower? We've got skilled, uniformed cleaners ready to go when you are.",
      image: 'https://res.cloudinary.com/diunkrydn/image/upload/v1753192432/cleaner-svgrepo-com_gyxeet.svg'
    },
    {
      title: 'Pest Control',
      description: 'Bye bugs, bye stress. We eliminate pests and keep them gone — discreetly and effectively.',
      image: 'https://res.cloudinary.com/diunkrydn/image/upload/v1753192493/rat-svgrepo-com_rawzye.svg'
    },
    {
      title: 'Construction Works',
      description: 'From renovations to fixes, post construction mess to clean up, we build it better and cleaner — no shortcuts.',
      image: 'https://res.cloudinary.com/diunkrydn/image/upload/v1753192527/construction-crane-lifter-svgrepo-com_znrcx2.svg'
    },
    {
      title: 'Landscaping',
      description: "Green, neat, and wow-worthy — we shape your outdoor spaces into scenes you'll love.",
      image: 'https://res.cloudinary.com/diunkrydn/image/upload/v1753192575/gardening-grass-svgrepo-com_mrpa8b.svg'
    },
    {
      title: 'Disinfection Services',
      description: "Germs don't stand a chance. We sanitize spaces with hospital-grade solutions — fast and safe.",
      image: 'https://res.cloudinary.com/diunkrydn/image/upload/v1753192634/alcohol-disinfection-svgrepo-com_qsnbx4.svg'
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
    adaptiveHeight: true,
    pauseOnHover: false,
    pauseOnFocus: false,
  };

  // Client carousel settings with mobile optimizations
  const clientSettings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    arrows: false,
    pauseOnHover: false,
    pauseOnFocus: false,
    swipe: false,
    touchMove: false,
    responsive: [
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
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };

  const slides = [
    {
      image: 'https://res.cloudinary.com/diunkrydn/image/upload/v1753271854/housekeeper-holding-bottle-with-cleaner-liquid-hands_1_zvaskl.avif',
      title: 'Welcome to',
      description: 'We deliver exceptional solutions tailored to your needs',
    },
    {
      image: 'https://res.cloudinary.com/diunkrydn/image/upload/v1753271855/wallpaper_wauxsj.avif',
      title: 'Transform Your Space',
      description: 'Innovative Cleaning solutions for modern challenges',
    },
    {
      image: 'https://res.cloudinary.com/diunkrydn/image/upload/v1753271855/construction-site-silhouettes_k3b2hl.avif',
      title: 'We Build Better Spaces',
      description: 'Partner with us for a cleaner and safer space',
    },
  ];

  return (
    <>
      <SEO 
        title="Home"
        description="Welcome to Fabtech Services - Your trusted partner for professional services."
        keywords="yourbrand, services, professional, business"
      />

      <HeroSection>
        <Slider {...sliderSettings}>
          {slides.map((slide, index) => (
            <div key={index}>
              <SlideContent style={{ backgroundImage: `url(${slide.image})` , backgroundSize: 'cover', backgroundPosition: 'center' }} >
                <Overlay />
                <HeroContent>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {slide.title} <span>Fabtech Services</span>
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
             <LottieContainer>
                <DotLottieReact
                  src="https://res.cloudinary.com/diunkrydn/raw/upload/v1753185901/Meditation_u5y0oi.lottie"
                  loop
                  autoplay
                  style={{ 
                    width: '100%', 
                    height: '100%'
                  }}
                />
              </LottieContainer>
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

              That's Fabtech.
            </IntroText>
          </IntroTitleContainer>
        </IntroGrid>
      </IntroSection>

      <IntroSection style={{ backgroundColor: 'beige'}}>
        <IntroGrid>
          <IntroTitleContainer>
            <IntroTitle style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 'bold', color: 'var(--primary-black)' }}>
              <p>Services We Offer</p>
            </IntroTitle>
            <IntroText>
              Fabtech Services delivers expert solutions in cleaning, hospitality, disinfection, facility management, trading, and contracting. Our team ensures quality service and customer satisfaction, whether managing spaces or handling projects. We're dedicated to meeting your needs with efficiency and care.
            </IntroText>
          </IntroTitleContainer>
          <IntroImageContainer>
            <DotLottieReact
              src="https://res.cloudinary.com/diunkrydn/raw/upload/v1753187261/Services_nbruts.json"
              loop
              autoplay
              style={{ 
                width: '100%', 
                height: 'auto',
                maxWidth: '375px',
                minHeight: '250px'
              }}
            />
          </IntroImageContainer>
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
              <div style={{display: 'flex', alignItems: 'center', gap: '10px', minHeight: '4rem'}}>
                <span>
                  <img 
                    style={{
                      width: '40px', 
                      height: '40px', 
                      marginBottom: '20px',
                      flexShrink: 0
                    }} 
                    src={feature.image} 
                    alt={feature.title} 
                  />
                </span>
                <h3>{feature.title}</h3> 
              </div> 
              <p>{feature.description}</p>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </FeaturesSection>

      <Clients logos={clientLogos} settings={clientSettings} />

      <CTASection>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Get Started?</h2>
          <p>Join us today and experience the difference our services can make for your business.</p>
          <Button onClick={() => navigate('/contact')}>Contact Us</Button>
        </motion.div>
      </CTASection>
    </>
  );
};

export default Home;