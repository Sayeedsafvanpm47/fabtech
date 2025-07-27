import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import BlogCard from '../components/BlogCard';
import BlogCardSkeleton from '../components/BlogCardSkeleton';
import SEO from '../components/SEO';
import { FaSearch } from 'react-icons/fa';

const BlogContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: var(--primary-black);
  margin-bottom: 1rem;

  span {
    color: var(--primary-red);
  }
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 25px;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;

  input {
    border: none;
    outline: none;
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
  }

  svg {
    color: #666;
  }
`;

const CategoryFilter = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const CategoryButton = styled.button`
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 20px;
  background: ${props => props.active ? 'var(--primary-red)' : 'white'};
  color: ${props => props.active ? 'white' : '#666'};
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  }
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const LoadMoreButton = styled(motion.button)`
  display: block;
  margin: 0 auto;
  padding: 1rem 2rem;
  background: var(--primary-red);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [visiblePosts, setVisiblePosts] = useState(6);

  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: 'The Ultimate Guide to Deep Cleaning Your Home',
      excerpt: 'Discover professional tips and tricks for achieving a spotless home. Learn about the most effective cleaning techniques and products.',
      image: 'https://res.cloudinary.com/diunkrydn/image/upload/v1753607451/33771032_2208.i121.001.S.m005.c13.isometric_husband_hour_v7e9rz.svg',
      category: 'Cleaning Tips',
      author: 'Sarah Johnson',
      date: 'March 15, 2024',
      slug: 'ultimate-guide-deep-cleaning'
    },
    {
      id: 2,
      title: 'Eco-Friendly Cleaning Solutions for a Sustainable Home',
      excerpt: 'Learn how to keep your home clean while being environmentally conscious. Explore natural cleaning alternatives and sustainable practices.',
      image: 'https://res.cloudinary.com/diunkrydn/image/upload/v1753607449/12085694_20944192_mmp832.svg',
      category: 'Green Living',
      author: 'Mike Green',
      date: 'March 12, 2024',
      slug: 'eco-friendly-cleaning-solutions'
    },
    {
      id: 3,
      title: 'Common Pests in Qatar and How to Deal with Them',
      excerpt: 'A comprehensive guide to identifying and controlling common household pests in Qatar. Prevention tips and treatment options.',
      image: 'https://res.cloudinary.com/diunkrydn/image/upload/v1753607445/10780550_19198459_s3ciie.svg',
      category: 'Pest Control',
      author: 'Dr. Ahmed Hassan',
      date: 'March 10, 2024',
      slug: 'common-pests-qatar'
    },
    {
      id: 4,
      title: 'Maintaining Your Garden in Qatars Climate',
      excerpt: 'Expert advice on keeping your garden thriving in Qatars hot climate. Tips for plant selection, irrigation, and maintenance.',
      image: 'https://res.cloudinary.com/diunkrydn/image/upload/v1753607446/7943051_3808782_uat65c.svg',
      category: 'Landscaping',
      author: 'Lisa Chen',
      date: 'March 8, 2024',
      slug: 'garden-maintenance-qatar'
    },
    {
      id: 5,
      title: 'Essential Tips for Construction Project Management',
      excerpt: 'Key insights into managing construction projects effectively. From planning to execution, learn the best practices.',
      image: 'https://res.cloudinary.com/diunkrydn/image/upload/v1753607447/13295440_5165970_ezr2r0.svg',
      category: 'Construction',
      author: 'James Wilson',
      date: 'March 5, 2024',
      slug: 'construction-project-management'
    },
    {
      id: 6,
      title: 'Hospitality Excellence: Creating Memorable Guest Experiences',
      excerpt: 'Learn the secrets of providing exceptional hospitality services. Tips for guest satisfaction and service excellence.',
      image: 'https://res.cloudinary.com/diunkrydn/image/upload/v1753607449/13638853_5312965_jjl6fk.svg',
      category: 'Hospitality',
      author: 'Maria Rodriguez',
      date: 'March 3, 2024',
      slug: 'hospitality-excellence'
    },
    // Add more blog posts as needed
  ];

  const categories = ['All', 'Cleaning Tips', 'Green Living', 'Pest Control', 'Landscaping', 'Construction', 'Hospitality'];

  useEffect(() => {
    // Simulate loading posts
    setIsLoading(true);
    setTimeout(() => {
      setPosts(blogPosts);
      setIsLoading(false);
    }, 1500);
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLoadMore = () => {
    setVisiblePosts(prev => prev + 6);
  };

  return (
    <>
      <SEO
        title="Blog - Latest Updates and Tips"
        description="Read our latest blog posts about cleaning, maintenance, pest control, and more. Get expert tips and insights."
        keywords="blog, cleaning tips, maintenance, pest control, landscaping"
      />

      <BlogContainer>
        <Header>
          <Title>Our <span>Blog</span></Title>
          <Subtitle>
            Stay updated with the latest tips, trends, and insights about cleaning,
            maintenance, and property care.
          </Subtitle>
        </Header>

        <FilterSection>
          <SearchBar>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch />
          </SearchBar>

          <CategoryFilter>
            {categories.map(category => (
              <CategoryButton
                key={category}
                active={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </CategoryButton>
            ))}
          </CategoryFilter>
        </FilterSection>

        <BlogGrid>
          {isLoading ? (
            // Show skeletons while loading
            Array.from({ length: 6 }).map((_, index) => (
              <BlogCardSkeleton key={index} />
            ))
          ) : (
            // Show filtered posts
            filteredPosts.slice(0, visiblePosts).map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))
          )}
        </BlogGrid>

        {!isLoading && visiblePosts < filteredPosts.length && (
          <LoadMoreButton
            onClick={handleLoadMore}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Load More Articles
          </LoadMoreButton>
        )}
      </BlogContainer>
    </>
  );
};

export default Blog; 