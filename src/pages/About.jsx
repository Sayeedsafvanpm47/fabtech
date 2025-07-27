import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { FaRocket, FaUsers, FaAward, FaStar, FaQuoteLeft, FaChartLine, FaHandshake, FaLightbulb } from 'react-icons/fa';
import SEO from '../components/SEO';
import { AboutContainer, HeroSection, StorySection, StoryContent, StoryImage, ValuesSection, ValuesGrid, ValueCard, TeamSection, TeamGrid, TeamMember } from '../styles/pages/about';
import Clients from '../components/Clients';
import { clientLogos } from '../constants/ClientLogos';
// Additional styled components for new sections
const StatsSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
  padding: 0 2rem;
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(31, 38, 135, 0.3);
  }

  .icon {
    font-size: 2.5rem;
    color: var(--primary-white);
    margin-bottom: 1rem;
  }

  .number {
    font-size: 2.5rem;
    font-weight: bold;
    color: var(--primary-white);
    margin-bottom: 0.5rem;
  }

  .label {
    color: var(--primary-black);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.9rem;
  }
`;

const TestimonialSection = styled.section`
  background: rgba(255, 255, 255, 0.05);
  padding: 4rem 2rem;
  margin: 4rem 0;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  h2 {
    text-align: center;
    color: var(--primary-white);
    font-size: 2.5rem;
    margin-bottom: 3rem;

    span {
      color: var(--primary-black);
    }
  }
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const TestimonialCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  position: relative;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);

  .quote-icon {
    position: absolute;
    top: -10px;
    left: 2rem;
    background: var(--primary-red);
    color: white;
    padding: 0.5rem;
    border-radius: 50%;
    font-size: 1.2rem;
  }

  .content {
    color: #555;
    font-style: italic;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    margin-top: 1rem;
  }

  .author {
    display: flex;
    align-items: center;
    gap: 1rem;

    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary-red), #ff6b9d);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 1.2rem;
    }

    .info {
      .name {
        font-weight: bold;
        color: var(--primary-black);
        margin-bottom: 0.2rem;
      }
      .position {
        color: #666;
        font-size: 0.9rem;
      }
    }
  }
`;

const MissionSection = styled.section`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  padding: 4rem 2rem;
  margin: 4rem 0;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;

  h2 {
    color: var(--primary-white);
    font-size: 2.5rem;
    margin-bottom: 2rem;

    span {
      color: var(--primary-black);
    }
  }

  .mission-content {
    max-width: 800px;
    margin: 0 auto;
    color: var(--primary-black);
    font-size: 1.2rem;
    line-height: 1.8;
    margin-bottom: 2rem;
  }

  .mission-goals {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }
`;

const GoalCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .icon {
    font-size: 3rem;
    color: var(--primary-red);
    margin-bottom: 1rem;
  }

  h3 {
    color: var(--primary-black);
    margin-bottom: 1rem;
    font-size: 1.3rem;
  }

  p {
    color: #555;
    line-height: 1.6;
  }
`;

const TimelineSection = styled.section`
  margin: 4rem 0;
  padding: 0 2rem;

  h2 {
    text-align: center;
    color: var(--primary-white);
    font-size: 2.5rem;
    margin-bottom: 3rem;

    span {
      color: var(--primary-black);
    }
  }
`;

const Timeline = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 100%;
    background: linear-gradient(to bottom, var(--primary-red), #ff6b9d);
    border-radius: 2px;

    @media (max-width: 768px) {
      left: 20px;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  margin-bottom: 3rem;
  width: 50%;
  padding: 0 2rem;

  ${props => props.left ? `
    left: 0;
    text-align: right;
  ` : `
    left: 50%;
    text-align: left;
  `}

  @media (max-width: 768px) {
    width: 100%;
    left: 40px !important;
    text-align: left;
  }

  .timeline-content {
    background: white;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      width: 0;
      height: 0;
      border: 15px solid transparent;

      ${props => props.left ? `
        right: -30px;
        border-left-color: white;
      ` : `
        left: -30px;
        border-right-color: white;
      `}

      @media (max-width: 768px) {
        left: -30px !important;
        right: auto !important;
        border-right-color: white !important;
        border-left-color: transparent !important;
      }
    }

    .year {
      color: var(--primary-red);
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    .title {
      color: var(--primary-black);
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .description {
      color: #555;
      line-height: 1.6;
    }
  }

  .timeline-dot {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background: var(--primary-red);
    border: 4px solid white;
    border-radius: 50%;
    box-shadow: 0 0 0 4px rgba(235, 4, 4, 0.3);

    ${props => props.left ? `
      right: -2rem;
    ` : `
      left: -2rem;
    `}

    @media (max-width: 768px) {
      left: -2rem !important;
      right: auto !important;
    }
  }
`;

const About = () => {
  const values = [
    {
      title: 'Innovation',
      description: 'We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions.',
      icon: <FaLightbulb />
    },
    {
      title: 'Quality',
      description: 'We deliver excellence in every project we undertake, ensuring the highest standards.',
      icon: <FaAward />
    },
    {
      title: 'Integrity',
      description: 'We maintain the highest standards of professional ethics and transparent communication.',
      icon: <FaHandshake />
    },
    {
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and partnership to achieve extraordinary results.',
      icon: <FaUsers />
    },
  ];

  const stats = [
    { number: '500+', label: 'Projects Completed', icon: <FaRocket /> },
    { number: '150+', label: 'Happy Clients', icon: <FaUsers /> },
    { number: '10+', label: 'Years Experience', icon: <FaChartLine /> },
    { number: '98%', label: 'Client Satisfaction', icon: <FaStar /> },
  ];

  const testimonials = [
    {
      content: "Working with YourBrand has been an absolute game-changer for our business. Their innovative approach and attention to detail exceeded our expectations.",
      author: "John Smith",
      position: "CEO, TechCorp Inc.",
      avatar: "JS"
    },
    {
      content: "The team's professionalism and expertise are unmatched. They delivered our project on time and within budget, with exceptional quality.",
      author: "Sarah Johnson",
      position: "Marketing Director, StartupXYZ",
      avatar: "SJ"
    },
    {
      content: "I highly recommend YourBrand for anyone looking for reliable, innovative solutions. Their customer service is outstanding.",
      author: "Mike Davis",
      position: "Founder, Innovation Labs",
      avatar: "MD"
    }
  ];

  const goals = [
    {
      icon: <FaRocket />,
      title: "Drive Innovation",
      description: "To continuously push the boundaries of what's possible and lead industry innovation."
    },
    {
      icon: <FaUsers />,
      title: "Empower Teams",
      description: "To help businesses unlock their full potential through collaborative solutions."
    },
    {
      icon: <FaChartLine />,
      title: "Sustainable Growth",
      description: "To create lasting value and contribute to the sustainable growth of our clients."
    }
  ];

  const timeline = [
    {
      year: "2016",
      title: "Company Founded",
      description: "Fabtech Services W.L.L was established with a vision to provide the best services to our clients."
    },
    {
      year: "2020",
      title: "Active participation during covid-19 pandemic",
      description: "We provided disinfection services to the government and private sector to help them during the pandemic."
    },
    {
      year: "2022",
      title: "Team Expansion",
      description: "Grew our team and gained more satisfied clients."
    },

    {
      year: "2025",
      title: "Future Vision",
      description: "Continuing to lead with awesome facility management services and grow our team."
    }
  ];

  return (
    <>
      <SEO
        title="About Us - Fabtech Services W.L.L"
        description="Learn about our company, our values, and the team behind our success. Discover our journey of innovation and excellence."
        keywords="about us, company history, team, values, innovation, quality"
      />

      <AboutContainer>
        <HeroSection>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About <span>Fabtech</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Fabtech Services WLL is a leading provider of Hospitality, Cleaning, and Disinfection services in Qatar, offering innovative and cost-effective facility management solutions since 2016. Backed by a skilled team and advanced technology, we serve a wide range of sectors including hospitals, hotels, schools, malls, and residential buildings. Our services also cover industrial and event cleaning, office support staffing, and professional disinfection for all types of facilities.
          </motion.p>
        </HeroSection>

        <StatsSection>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="icon">{stat.icon}</div>
              <div className="number">{stat.number}</div>
              <div className="label">{stat.label}</div>
            </StatCard>
          ))}
        </StatsSection>

        <StorySection>
          <StoryContent>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2>Our Story</h2>
              <p>
              Fabtech Services WLL was established in 2008 with a mission to deliver reliable and high-quality cleaning and facility management solutions in Qatar. During the COVID-19 pandemic, we played an active role in supporting communities through our disinfection services, ensuring safe environments across homes, offices, and public spaces.
              </p>
              <p>
              Our standout deep cleaning service has become a client favorite—affordable, effective, and trusted for its attention to detail. Backed by a skilled team and modern techniques, we continue to provide dependable cleaning and support services tailored to the needs of homes, businesses, and institutions.
              </p>
              <p>
                Our success is built on the foundation of trust, innovation, and an unwavering commitment 
                to delivering results that exceed expectations. 
              </p>
            </motion.div>
          </StoryContent>
          <StoryImage />
        </StorySection>

        <MissionSection>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2>Our <span>Mission</span></h2>
            <div className="mission-content">
              To empower businesses with innovative solutions that drive growth, efficiency, and success. 
              We are committed to being the catalyst that transforms challenges into opportunities, 
              helping our clients navigate the complexities of the modern business landscape with confidence.
            </div>
            <div className="mission-goals">
              {goals.map((goal, index) => (
                <GoalCard
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="icon">{goal.icon}</div>
                  <h3>{goal.title}</h3>
                  <p>{goal.description}</p>
                </GoalCard>
              ))}
            </div>
          </motion.div>
        </MissionSection>

        <ValuesSection>
          <motion.h2
            style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--primary-black)', fontSize: '2.5rem' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Our <span style={{ color: 'var(--primary-red)' }}>Values</span>
          </motion.h2>
          <ValuesGrid>
            {values.map((value, index) => (
              <ValueCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
              >
                <div style={{ fontSize: '2.5rem', color: 'var(--primary-red)', marginBottom: '1rem' }}>
                  {value.icon}
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </ValueCard>
            ))}
          </ValuesGrid>
        </ValuesSection>

        <TimelineSection>
          <h2>Our <span>Journey</span></h2>
          <Timeline>
            {timeline.map((item, index) => (
              <TimelineItem
                key={index}
                left={index % 2 === 0}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="timeline-content">
                  <div className="year">{item.year}</div>
                  <div className="title">{item.title}</div>
                  <div className="description">{item.description}</div>
                </div>
                <div className="timeline-dot"></div>
              </TimelineItem>
            ))}
          </Timeline>
        </TimelineSection>
        <Clients logos={clientLogos} />

        <TestimonialSection>
          <h2>What Our <span>Clients Say</span></h2>
          <TestimonialGrid>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="quote-icon">
                  <FaQuoteLeft />
                </div>
                <div className="content">"{testimonial.content}"</div>
                <div className="author">
                  <div className="avatar">{testimonial.avatar}</div>
                  <div className="info">
                    <div className="name">{testimonial.author}</div>
                    <div className="position">{testimonial.position}</div>
                  </div>
                </div>
              </TestimonialCard>
            ))}
          </TestimonialGrid>
        </TestimonialSection>
      </AboutContainer>
    </>
  );
};

export default About;