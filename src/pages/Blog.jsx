import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaFilter, FaTimes, FaSortAmountDown } from 'react-icons/fa';
import { blogPostsTable } from '../utils/supabase';
import BlogCard from '../components/BlogCard';
import BlogCardSkeleton from '../components/BlogCardSkeleton';

const BlogContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 60vh;
`;

const Title = styled.h1`
  text-align: center;
  color: var(--primary-black);
  margin-bottom: 2rem;
  font-size: 2.5rem;

  span {
    color: var(--primary-red);
  }
`;

const ControlsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const SearchAndFilters = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  
  @media (min-width: 768px) {
    flex-direction: row;
    max-width: 600px;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 2.8rem;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: var(--primary-red);
    box-shadow: 0 0 0 3px rgba(220, 38, 127, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  pointer-events: none;
`;

const ClearSearchButton = styled.button`
  position: absolute;
  right: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.2rem;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    color: var(--primary-red);
    background: rgba(220, 38, 127, 0.1);
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const FilterSelect = styled.select`
  padding: 0.8rem 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  font-size: 0.9rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-red);
    box-shadow: 0 0 0 3px rgba(220, 38, 127, 0.1);
  }
`;

const SortSelect = styled(FilterSelect)``;

const CreateButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  background: var(--primary-red);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: #b91c1c;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(220, 38, 127, 0.3);
  }
`;

const ResultsInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  color: #6b7280;
  font-size: 0.9rem;
`;

const ResultsCount = styled.span`
  font-weight: 500;
`;

const ActiveFilters = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const FilterTag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background: rgba(220, 38, 127, 0.1);
  color: var(--primary-red);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  width: 100%;
`;

const AdminControls = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: rgba(255, 255, 255, 0.95);
  padding: 0.5rem;
  border-radius: 10px;
  z-index: 10;
  backdrop-filter: blur(8px);
`;

const CardWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  &:hover ${AdminControls} {
    opacity: 1;
  }
`;

const AdminButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: ${props => props.delete ? 'var(--primary-red)' : 'var(--primary-black)'};
  transition: all 0.2s ease;
  border-radius: 6px;

  &:hover {
    transform: scale(1.1);
    background: ${props => props.delete ? 'rgba(220, 38, 127, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  margin-top: 4rem;
  color: #666;

  p {
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }
`;

const NoResults = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding: 2rem;
  color: #6b7280;

  h3 {
    color: var(--primary-black);
    margin-bottom: 1rem;
  }
`;

// Sample blog post for reference
const sampleBlogPost = {
  id: 'sample',
  title: 'The Ultimate Guide to Deep Cleaning',
  slug: 'ultimate-guide-deep-cleaning',
  meta_description: 'Learn professional deep cleaning techniques and tips to transform your space.',
  image_url: 'https://res.cloudinary.com/diunkrydn/image/upload/v1753607451/33771032_2208.i121.001.S.m005.c13.isometric_husband_hour_v7e9rz.svg',
  content: 'This is a sample blog post content that demonstrates how your posts will look. Create your first post to get started!',
  category: 'Cleaning Tips',
  created_at: new Date().toISOString()
};

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Filter and search states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const checkAdminStatus = () => {
      const adminStatus = localStorage.getItem('isAdminLoggedIn') === 'true';
      setIsAdmin(adminStatus);
    };

    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const fetchedPosts = await blogPostsTable.getAllPosts();
        console.log('Fetched posts:', fetchedPosts);

        if (!Array.isArray(fetchedPosts)) {
          throw new Error('Invalid data format received from server');
        }

        setPosts(fetchedPosts.length > 0 ? fetchedPosts : [sampleBlogPost]);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err.message || 'Failed to load blog posts');
        setPosts([sampleBlogPost]);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
    fetchPosts();
  }, []);

  // Get unique categories from posts
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(posts.map(post => post.category || 'General'))];
    return uniqueCategories.sort();
  }, [posts]);

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts.filter(post => {
      const matchesSearch = 
        post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.meta_description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === 'all' || 
        (post.category || 'General') === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at) - new Date(a.created_at);
        case 'oldest':
          return new Date(a.created_at) - new Date(b.created_at);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [posts, searchTerm, selectedCategory, sortBy]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await blogPostsTable.deletePost(id);
      setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Failed to delete post. Please try again.');
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSortBy('newest');
  };

  const hasActiveFilters = searchTerm || selectedCategory !== 'all' || sortBy !== 'newest';

  if (loading) {
    return (
      <BlogContainer>
        <Title>Our <span>Blog</span></Title>
        <BlogGrid>
          {[1, 2, 3].map(i => <BlogCardSkeleton key={i} />)}
        </BlogGrid>
      </BlogContainer>
    );
  }

  if (error) {
    return (
      <BlogContainer>
        <Title>Our <span>Blog</span></Title>
        <EmptyState>
          <p>{error}</p>
          {isAdmin && (
            <CreateButton to="/post-blog">
              <FaPlus /> Create New Post
            </CreateButton>
          )}
        </EmptyState>
      </BlogContainer>
    );
  }

  return (
    <BlogContainer>
      <Title>Our <span>Blog</span></Title>
      
      <ControlsSection>
        <SearchAndFilters>
          <SearchContainer>
            <SearchIcon />
            <SearchInput
              type="text"
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <ClearSearchButton onClick={clearSearch}>
                <FaTimes size={12} />
              </ClearSearchButton>
            )}
          </SearchContainer>
          
          <FilterContainer>
            <FilterSelect
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </FilterSelect>
            
            <SortSelect
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">A-Z</option>
            </SortSelect>
          </FilterContainer>
        </SearchAndFilters>

        {isAdmin && (
          <CreateButton to="/post-blog">
            <FaPlus /> Create New Post
          </CreateButton>
        )}
      </ControlsSection>

      <ResultsInfo>
        <ResultsCount>
          {filteredAndSortedPosts.length} {filteredAndSortedPosts.length === 1 ? 'post' : 'posts'} found
        </ResultsCount>
        
        {hasActiveFilters && (
          <ActiveFilters>
            {searchTerm && (
              <FilterTag>
                Search: "{searchTerm}"
                <FaTimes 
                  size={10} 
                  style={{ cursor: 'pointer' }} 
                  onClick={clearSearch}
                />
              </FilterTag>
            )}
            {selectedCategory !== 'all' && (
              <FilterTag>
                Category: {selectedCategory}
                <FaTimes 
                  size={10} 
                  style={{ cursor: 'pointer' }} 
                  onClick={() => setSelectedCategory('all')}
                />
              </FilterTag>
            )}
            <button
              onClick={clearFilters}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary-red)',
                cursor: 'pointer',
                fontSize: '0.8rem',
                textDecoration: 'underline'
              }}
            >
              Clear all filters
            </button>
          </ActiveFilters>
        )}
      </ResultsInfo>

      {filteredAndSortedPosts.length === 0 ? (
        posts.length === 0 ? (
          <EmptyState>
            <p>No blog posts found.</p>
            {isAdmin && (
              <CreateButton to="/post-blog">
                <FaPlus /> Create New Post
              </CreateButton>
            )}
          </EmptyState>
        ) : (
          <NoResults>
            <h3>No posts match your search</h3>
            <p>Try adjusting your search terms or filters</p>
            <button
              onClick={clearFilters}
              style={{
                background: 'var(--primary-red)',
                color: 'white',
                border: 'none',
                padding: '0.8rem 1.5rem',
                borderRadius: '8px',
                cursor: 'pointer',
                marginTop: '1rem'
              }}
            >
              Clear Filters
            </button>
          </NoResults>
        )
      ) : (
        <BlogGrid>
          {filteredAndSortedPosts.map(post => (
            <CardWrapper key={post.id}>
              <BlogCard post={post} />
              {isAdmin && post.id !== 'sample' && (
                <AdminControls>
                  <Link to={`/edit-blog/${post.id}`}>
                    <AdminButton title="Edit post">
                      <FaEdit size={16} />
                    </AdminButton>
                  </Link>
                  <AdminButton
                    delete
                    title="Delete post"
                    onClick={() => handleDelete(post.id)}
                  >
                    <FaTrash size={16} />
                  </AdminButton>
                </AdminControls>
              )}
            </CardWrapper>
          ))}
        </BlogGrid>
      )}
    </BlogContainer>
  );
};

export default Blog;