import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { initEmailJS } from './utils/emailService';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AdminLogin from './pages/AdminLogin';
import PostBlog from './pages/PostBlog';
import EditBlog from './pages/EditBlog';
import ChatWidget from './components/ChatWidget';
import './App.css';

const MainContent = styled.main`
  margin-top: 80px; // Height of the fixed header
  min-height: calc(100vh - 80px);
`;

function App() {
  useEffect(() => {
    initEmailJS();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/post-blog" element={<PostBlog />} />
            <Route path="/edit-blog/:id" element={<EditBlog />} />
          </Routes>
        </MainContent>
        <Footer />
        <ChatWidget />
      </div>
    </Router>
  );
}

export default App;
