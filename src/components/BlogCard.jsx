import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaClock, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

const Card = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(220, 38, 127, 0.03), rgba(220, 38, 127, 0.08));
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    
    &::before {
      opacity: 1;
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  padding-top: 55%;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  ${Card}:hover & img {
    transform: scale(1.08);
  }
`;

const CategoryBadge = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: var(--primary-red);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  z-index: 2;
  box-shadow: 0 2px 8px rgba(220, 38, 127, 0.3);
`;

const Content = styled.div`
  padding: 2rem 1.8rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  position: relative;
  z-index: 2;
`;

const Title = styled.h3`
  color: var(--primary-black);
  font-size: 1.4rem;
  margin-bottom: 1rem;
  line-height: 1.3;
  font-weight: 700;
  transition: color 0.3s ease;
  
  ${Card}:hover & {
    color: var(--primary-red);
  }
`;

const Description = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const MetaContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #888;
  font-size: 0.85rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  
  svg {
    color: var(--primary-red);
    opacity: 0.7;
  }
`;

const ReadMoreButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-red);
  font-weight: 600;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  
  svg {
    transition: transform 0.3s ease;
  }
  
  ${Card}:hover & {
    gap: 0.8rem;
    
    svg {
      transform: translateX(4px);
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: block;
  width: 100%;
  color: inherit;
`;

const BlogCard = ({ post }) => {
  if (!post) {
    console.error('BlogCard received no post data');
    return null;
  }

  const {
    title = '',
    meta_description = '',
    content = '',
    image_url = '',
    slug = '',
    created_at = new Date().toISOString(),
    category = 'General'
  } = post;

  if (!title || !slug) {
    console.error('BlogCard received invalid post data:', post);
    return null;
  }

  // Calculate reading time (average 200 words per minute)
  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const words = text.split(' ').length;
    const readingTime = Math.ceil(words / wordsPerMinute);
    return readingTime;
  };

  const readingTime = calculateReadingTime(content || meta_description || '');

  const formattedDate = new Date(created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const fallbackImage = 'https://res.cloudinary.com/diunkrydn/image/upload/v1753607451/33771032_2208.i121.001.S.m005.c13.isometric_husband_hour_v7e9rz.svg';

  return (
    <StyledLink to={`/blog/${slug}`}>
      <Card>
        <ImageContainer>
          <img 
            src={image_url || fallbackImage}
            alt={title}
            onError={(e) => {
              console.error('Failed to load image:', image_url);
              e.target.src = fallbackImage;
            }}
          />
          <CategoryBadge>{category}</CategoryBadge>
        </ImageContainer>
        <Content>
          <Title>{title}</Title>
          <Description>{meta_description}</Description>
          <MetaContainer>
            <MetaInfo>
              <MetaItem>
                <FaCalendarAlt size={12} />
                <span>{formattedDate}</span>
              </MetaItem>
              <MetaItem>
                <FaClock size={12} />
                <span>{readingTime} min read</span>
              </MetaItem>
            </MetaInfo>
            <ReadMoreButton>
              <span>Read More</span>
              <FaArrowRight size={12} />
            </ReadMoreButton>
          </MetaContainer>
        </Content>
      </Card>
    </StyledLink>
  );
};

export default BlogCard;