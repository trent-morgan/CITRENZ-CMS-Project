import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer'; // Import the new Footer
import Home from './Home';
import AboutUs from './AboutUs';
import ConferencesPage from './features/conference/ConferencesPage';
import ConferenceDetailPage from './features/conference/ConferenceDetailPage';

function App() {
  return (
    <Router>
      {/* 
          The wrapper div below ensures the footer stays at the bottom.
          'minHeight: 100vh' makes the app take up the full screen height.
          'flexDirection: column' stacks Navbar, Content, and Footer.
      */}
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
        <Navbar />

        {/* 'flex: 1' makes this section expand to fill all available space */}
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* Conference Routes */}
            <Route path="/conferences" element={<ConferencesPage />} />
            <Route path="/conference-detail/:id" element={<ConferenceDetailPage />} />            
            
            {/* Main Pages */}
            <Route path="/about-us" element={<AboutUs />} />
            
            {/* Placeholder Routes for Services Dropdown */}
            <Route path="/call-for-reviewers" element={<div style={styles.placeholder}>Call for Reviewers Page Coming Soon</div>} />
            <Route path="/call-for-papers" element={<div style={styles.placeholder}>Call for Papers Page Coming Soon</div>} />
            <Route path="/admin" element={<div style={styles.placeholder}>Admin Panel Access Restricted</div>} />
            <Route path="/contact" element={<div style={styles.placeholder}>Contact Page</div>} />

            {/* 404 Route */}
            <Route path="*" element={<div style={styles.placeholder}>Page Not Found</div>} />
          </Routes>
        </main>

        <Footer />
        
      </div>
    </Router>
  );
}

// Simple styles for the placeholder pages
const styles = {
  placeholder: {
    padding: '100px 20px',
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#4A5568',
    fontFamily: 'system-ui, sans-serif'
  }
};

export default App;