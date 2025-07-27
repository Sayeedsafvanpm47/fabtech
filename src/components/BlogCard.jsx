import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FaUser, FaCalendar, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Card = styled(motion.div)`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
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

  .category {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: var(--primary-red);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
  }
`;

const Content = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 1.4rem;
  color: var(--primary-black);
  margin-bottom: 1rem;
  line-height: 1.4;

  &:hover {
    color: var(--primary-red);
  }
`;

const Excerpt = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;

const MetaInfo = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  color: #888;
  font-size: 0.9rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const ReadMore = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-red);
  text-decoration: none;
  font-weight: 600;
  margin-top: auto;

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(5px);
  }
`;

const BlogCard = ({ post, index }) => {
  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <ImageContainer>
        <img src={post.image} alt={post.title} loading="lazy" />
        <span className="category">{post.category}</span>
      </ImageContainer>
      <Content>
        <MetaInfo>
          <div>
            <FaUser />
            <span>{post.author}</span>
          </div>
          <div>
            <FaCalendar />
            <span>{post.date}</span>
          </div>
        </MetaInfo>
        <Title>{post.title}</Title>
        <Excerpt>{post.excerpt}</Excerpt>
        <ReadMore to={`/blog/${post.slug}`}>
          Read More <FaArrowRight />
        </ReadMore>
      </Content>
    </Card>
  );
};

export default BlogCard; 