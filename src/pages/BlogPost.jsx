import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FaUser, FaCalendar, FaArrowLeft, FaTags } from 'react-icons/fa';
import SEO from '../components/SEO';

const BlogPostContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const BackButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: var(--primary-red);
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  margin-bottom: 2rem;
  border-radius: 20px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(var(--primary-red-rgb), 0.1);
  }
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: var(--primary-black);
  margin-bottom: 1rem;
  line-height: 1.3;
`;

const MetaInfo = styled.div`
  display: flex;
  gap: 2rem;
  color: #666;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const Category = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--primary-red);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
`;

const FeaturedImage = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 2rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Content = styled.div`
  color: #444;
  line-height: 1.8;
  font-size: 1.1rem;

  p {
    margin-bottom: 1.5rem;
  }

  h2 {
    color: var(--primary-black);
    font-size: 1.8rem;
    margin: 2rem 0 1rem;
  }

  ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.5rem;
    }
  }
`;

const RelatedPosts = styled.div`
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;

  h3 {
    font-size: 1.5rem;
    color: var(--primary-black);
    margin-bottom: 1.5rem;
  }
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const RelatedPost = styled(motion.div)`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }

  .content {
    padding: 1rem;

    h4 {
      color: var(--primary-black);
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
    }

    p {
      color: #666;
      font-size: 0.9rem;
    }
  }
`;

// Sample blog posts data (you can move this to a separate file)
const blogPosts = [
  {
    id: 1,
    title: 'The Ultimate Guide to Deep Cleaning Your Home',
    excerpt: 'Discover professional tips and tricks for achieving a spotless home. Learn about the most effective cleaning techniques and products.',
    content: `
      <h2>Introduction</h2>
      <p>Deep cleaning your home is more than just a regular cleaning routine. It's about getting into those often-neglected areas and ensuring a truly clean and healthy living environment.</p>

      <h2>Essential Deep Cleaning Tools</h2>
      <ul>
        <li>High-quality microfiber cloths</li>
        <li>Multi-purpose cleaning solutions</li>
        <li>Scrub brushes of various sizes</li>
        <li>Steam cleaner for tough stains</li>
        <li>Extendable dusters for high areas</li>
      </ul>

      <h2>Room-by-Room Deep Cleaning Guide</h2>
      <p>Each room requires specific attention to detail. Here's how to approach each space in your home:</p>

      <h3>Kitchen Deep Cleaning</h3>
      <p>The kitchen is one of the most important areas to deep clean. Focus on:</p>
      <ul>
        <li>Cleaning inside and behind appliances</li>
        <li>Degreasing hood vents and filters</li>
        <li>Sanitizing countertops and cutting boards</li>
        <li>Deep cleaning the sink and disposal</li>
      </ul>

      <h3>Bathroom Deep Cleaning</h3>
      <p>Bathrooms require special attention to prevent mold and ensure proper sanitation:</p>
      <ul>
        <li>Scrubbing grout lines</li>
        <li>Cleaning exhaust fans</li>
        <li>Disinfecting all surfaces</li>
        <li>Treating any mold or mildew</li>
      </ul>

      <h2>Professional Tips and Tricks</h2>
      <p>Here are some expert tips to make your deep cleaning more effective:</p>
      <ul>
        <li>Always work from top to bottom in any room</li>
        <li>Use natural cleaning solutions when possible</li>
        <li>Pay attention to high-touch areas</li>
        <li>Don't forget often-overlooked spots like light switches and doorknobs</li>
      </ul>
    `,
    image: 'https://res.cloudinary.com/diunkrydn/image/upload/v1753607451/33771032_2208.i121.001.S.m005.c13.isometric_husband_hour_v7e9rz.svg',
    category: 'Cleaning Tips',
    author: 'Sarah Johnson',
    date: 'March 15, 2024',
    slug: 'ultimate-guide-deep-cleaning'
  },
  // ... other blog posts
];

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  // Find the current post
  const post = blogPosts.find(p => p.slug === slug);

  // Find related posts (same category, excluding current post)
  const relatedPosts = blogPosts
    .filter(p => p.category === post?.category && p.id !== post?.id)
    .slice(0, 3);

  if (!post) {
    return (
      <BlogPostContainer>
        <BackButton onClick={() => navigate('/blog')}>
          <FaArrowLeft /> Back to Blog
        </BackButton>
        <h1>Post not found</h1>
      </BlogPostContainer>
    );
  }

  return (
    <>
      <SEO
        title={`${post.title} - Blog`}
        description={post.excerpt}
        keywords={`${post.category.toLowerCase()}, blog, tips, guide`}
      />

      <BlogPostContainer>
        <BackButton onClick={() => navigate('/blog')}>
          <FaArrowLeft /> Back to Blog
        </BackButton>

        <Header>
          <Title>{post.title}</Title>
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
          <Category>
            <FaTags />
            {post.category}
          </Category>
        </Header>

        <FeaturedImage>
          <img src={post.image} alt={post.title} />
        </FeaturedImage>

        <Content dangerouslySetInnerHTML={{ __html: post.content }} />

        {relatedPosts.length > 0 && (
          <RelatedPosts>
            <h3>Related Articles</h3>
            <RelatedGrid>
              {relatedPosts.map(relatedPost => (
                <RelatedPost
                  key={relatedPost.id}
                  onClick={() => navigate(`/blog/${relatedPost.slug}`)}
                  whileHover={{ y: -5 }}
                >
                  <img src={relatedPost.image} alt={relatedPost.title} />
                  <div className="content">
                    <h4>{relatedPost.title}</h4>
                    <p>{relatedPost.date}</p>
                  </div>
                </RelatedPost>
              ))}
            </RelatedGrid>
          </RelatedPosts>
        )}
      </BlogPostContainer>
    </>
  );
};

export default BlogPost; 