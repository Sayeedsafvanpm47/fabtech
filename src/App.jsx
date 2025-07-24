import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from '@emotion/styled';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import ChatWidget from './components/ChatWidget';

const MainContent = styled.main`
  margin-top: 80px; // Height of the fixed header
  min-height: calc(100vh - 80px);
`;

function App() {
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
          </Routes>
        </MainContent>
        <Footer />
        <ChatWidget />
      </div>
    </Router>
  );
}

export default App;
