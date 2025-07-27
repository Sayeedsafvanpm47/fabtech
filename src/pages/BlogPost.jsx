import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FaUser, FaCalendar, FaArrowLeft, FaTags, FaEdit, FaTrash, FaClock } from 'react-icons/fa';
import { blogPostsTable } from '../utils/supabase';
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
    background: rgba(220, 38, 127, 0.1);
  }
`;

const AdminControls = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e9ecef;
`;

const AdminButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.edit ? `
    background: #007bff;
    color: white;
    
    &:hover {
      background: #0056b3;
    }
  ` : `
    background: #dc3545;
    color: white;
    
    &:hover {
      background: #c82333;
    }
  `}
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.8rem;
  color: var(--primary-black);
  margin-bottom: 1rem;
  line-height: 1.2;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  gap: 2rem;
  color: #666;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.95rem;
  }
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const Category = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--primary-red);
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(220, 38, 127, 0.3);
`;

const FeaturedImage = styled.div`
  width: 100%;
  height: 450px;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 3rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.02);
  }
  
  @media (max-width: 768px) {
    height: 250px;
  }
`;

const Content = styled.div`
  color: #444;
  line-height: 1.8;
  font-size: 1.1rem;
  max-width: none;

  p {
    margin-bottom: 1.8rem;
    text-align: justify;
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--primary-black);
    margin: 2.5rem 0 1.2rem;
    font-weight: 700;
    line-height: 1.3;
  }

  h1 { font-size: 2.2rem; }
  h2 { font-size: 1.9rem; }
  h3 { font-size: 1.6rem; }
  h4 { font-size: 1.4rem; }
  h5 { font-size: 1.2rem; }
  h6 { font-size: 1.1rem; }

  ul, ol {
    margin-bottom: 1.8rem;
    padding-left: 2rem;

    li {
      margin-bottom: 0.8rem;
      line-height: 1.7;
    }
  }

  blockquote {
    border-left: 4px solid var(--primary-red);
    padding: 1rem 1.5rem;
    margin: 2rem 0;
    background: #f8f9fa;
    border-radius: 0 8px 8px 0;
    font-style: italic;
    color: #555;
  }

  code {
    background: #f1f3f4;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
  }

  pre {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1.5rem 0;
    
    code {
      background: none;
      padding: 0;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 1.5rem 0;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }

  a {
    color: var(--primary-red);
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  
  div {
    width: 40px;
    height: 40px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid var(--primary-red);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  background: #f8d7da;
  color: #721c24;
  border-radius: 8px;
  margin: 2rem 0;
`;

const RelatedPosts = styled.div`
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 2px solid #f0f0f0;

  h3 {
    font-size: 1.8rem;
    color: var(--primary-black);
    margin-bottom: 2rem;
    font-weight: 700;
  }
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const RelatedPost = styled(motion.div)`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }

  .content {
    padding: 1.5rem;

    h4 {
      color: var(--primary-black);
      margin-bottom: 0.8rem;
      font-size: 1.1rem;
      font-weight: 600;
      line-height: 1.4;
    }

    .meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #666;
      font-size: 0.85rem;
      margin-top: 1rem;
    }

    .category {
      background: rgba(220, 38, 127, 0.1);
      color: var(--primary-red);
      padding: 0.2rem 0.6rem;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
    }
  }
`;

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = () => {
      const adminStatus = localStorage.getItem('isAdminLoggedIn') === 'true';
      setIsAdmin(adminStatus);
    };

    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch all posts to find the current one and related posts
        const allPosts = await blogPostsTable.getAllPosts();
        
        if (!Array.isArray(allPosts)) {
          throw new Error('Invalid data format received from server');
        }

        // Find current post by slug
        const currentPost = allPosts.find(p => p.slug === slug);
        
        if (!currentPost) {
          throw new Error('Post not found');
        }

        setPost(currentPost);

        // Find related posts (same category, excluding current post)
        const related = allPosts
          .filter(p => 
            (p.category || 'General') === (currentPost.category || 'General') && 
            p.id !== currentPost.id
          )
          .slice(0, 3);
        
        setRelatedPosts(related);

      } catch (err) {
        console.error('Error fetching post:', err);
        setError(err.message || 'Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
    fetchPost();
  }, [slug]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    try {
      await blogPostsTable.deletePost(post.id);
      alert('Post deleted successfully!');
      navigate('/blog');
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Failed to delete post. Please try again.');
    }
  };

  const handleEdit = () => {
    navigate(`/edit-blog/${post.id}`);
  };

  const calculateReadingTime = (content) => {
    if (!content) return 1;
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatContent = (content) => {
    if (!content) return '';
    
    // Convert line breaks to paragraphs if content doesn't have HTML tags
    if (!content.includes('<') && !content.includes('>')) {
      return content
        .split('\n\n')
        .map(paragraph => paragraph.trim())
        .filter(paragraph => paragraph.length > 0)
        .map(paragraph => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
        .join('');
    }
    
    return content;
  };

  if (loading) {
    return (
      <BlogPostContainer>
        <BackButton onClick={() => navigate('/blog')}>
          <FaArrowLeft /> Back to Blog
        </BackButton>
        <LoadingSpinner>
          <div></div>
        </LoadingSpinner>
      </BlogPostContainer>
    );
  }

  if (error || !post) {
    return (
      <BlogPostContainer>
        <BackButton onClick={() => navigate('/blog')}>
          <FaArrowLeft /> Back to Blog
        </BackButton>
        <ErrorMessage>
          <h2>Post Not Found</h2>
          <p>{error || 'The blog post you are looking for does not exist.'}</p>
        </ErrorMessage>
      </BlogPostContainer>
    );
  }

  const readingTime = calculateReadingTime(post.content);
  const fallbackImage = 'https://res.cloudinary.com/diunkrydn/image/upload/v1753607451/33771032_2208.i121.001.S.m005.c13.isometric_husband_hour_v7e9rz.svg';

  return (
    <>
      <SEO
        title={`${post.title} - Blog`}
        description={post.meta_description || post.title}
        keywords={`${(post.category || 'general').toLowerCase()}, blog, tips, guide`}
      />

      <BlogPostContainer>
        <BackButton 
          onClick={() => navigate('/blog')}
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft /> Back to Blog
        </BackButton>

        {isAdmin && (
          <AdminControls>
            <AdminButton edit onClick={handleEdit}>
              <FaEdit /> Edit Post
            </AdminButton>
            <AdminButton onClick={handleDelete}>
              <FaTrash /> Delete Post
            </AdminButton>
          </AdminControls>
        )}

        <Header>
          <Title>{post.title}</Title>
          <MetaInfo>
            <div>
              <FaCalendar />
              <span>{formatDate(post.created_at)}</span>
            </div>
            <div>
              <FaClock />
              <span>{readingTime} min read</span>
            </div>
          </MetaInfo>
          {post.category && (
            <Category>
              <FaTags />
              {post.category}
            </Category>
          )}
        </Header>

        <FeaturedImage>
          <img 
            src={post.image_url || fallbackImage} 
            alt={post.title}
            onError={(e) => {
              e.target.src = fallbackImage;
            }}
          />
        </FeaturedImage>

        <Content dangerouslySetInnerHTML={{ __html: formatContent(post.content) }} />

        {relatedPosts.length > 0 && (
          <RelatedPosts>
            <h3>Related Articles</h3>
            <RelatedGrid>
              {relatedPosts.map(relatedPost => (
                <RelatedPost
                  key={relatedPost.id}
                  onClick={() => navigate(`/blog/${relatedPost.slug}`)}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img 
                    src={relatedPost.image_url || fallbackImage} 
                    alt={relatedPost.title}
                    onError={(e) => {
                      e.target.src = fallbackImage;
                    }}
                  />
                  <div className="content">
                    <h4>{relatedPost.title}</h4>
                    <div className="meta">
                      <span>{formatDate(relatedPost.created_at)}</span>
                      {relatedPost.category && (
                        <span className="category">{relatedPost.category}</span>
                      )}
                    </div>
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