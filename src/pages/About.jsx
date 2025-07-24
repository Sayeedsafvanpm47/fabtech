import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import SEO from '../components/SEO';
import { AboutContainer, HeroSection, StorySection, StoryContent, StoryImage, ValuesSection, ValuesGrid, ValueCard, TeamSection, TeamGrid, TeamMember } from '../styles/pages/about';   


const About = () => {
  const values = [
    {
      title: 'Innovation',
      description: 'We constantly push boundaries and embrace new technologies.',
    },
    {
      title: 'Quality',
      description: 'We deliver excellence in every project we undertake.',
    },
    {
      title: 'Integrity',
      description: 'We maintain the highest standards of professional ethics.',
    },
    {
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and partnership.',
    },
  ];

  // const team = [
  //   {
  //     name: 'Fawaz Hadi',
  //     position: 'CEO & Founder',
  //   },
  //   {
  //     name: 'Jane Smith',
  //     position: 'Creative Director',
  //   },
  //   {
  //     name: 'Mike Johnson',
  //     position: 'Technical Lead',
  //   },
  //   {
  //     name: 'Sarah Williams',
  //     position: 'Marketing Manager',
  //   },
  // ];

  return (
    <>
      <SEO
        title="About Us"
        description="Learn about our company, our values, and the team behind our success."
        keywords="about us, company history, team, values"
      />

      <AboutContainer>
        <HeroSection>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About <span>YourBrand</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We are a passionate team of professionals dedicated to delivering exceptional solutions
            and creating lasting value for our clients.
          </motion.p>
        </HeroSection>

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
                Founded in 2020, YourBrand has grown from a small startup to a leading provider
                of innovative solutions. Our journey has been marked by continuous growth,
                learning, and adaptation to meet the evolving needs of our clients.
              </p>
              <p>
                Today, we serve clients across various industries, helping them achieve their
                business objectives through our comprehensive range of services and solutions.
              </p>
            </motion.div>
          </StoryContent>
          <StoryImage />
        </StorySection>

        <ValuesSection>
          <ValuesGrid>
            {values.map((value, index) => (
              <ValueCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </ValueCard>
            ))}
          </ValuesGrid>
        </ValuesSection>

        {/* <TeamSection>
          <h2>Our <span>Team</span></h2>
          <TeamGrid>
            {team.map((member, index) => (
              <TeamMember
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="image-container" />
                <h3>{member.name}</h3>
                <p>{member.position}</p>
              </TeamMember>
            ))}
          </TeamGrid>
        </TeamSection> */}
      </AboutContainer>
    </>
  );
};

export default About; 