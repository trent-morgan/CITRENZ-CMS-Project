import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import AboutUs from './AboutUs';
import ConferencesPage from './features/conference/ConferencesPage';
import ConferenceDetailPage from './features/conference/ConferenceDetailPage';
import LoginPage from './features/login/Login';
import AdminPanel from './features/admin/AdminPanel';
import Contact from './features/contact/Contact';


// We create a wrapper component so we can use the 'useLocation' hook
const AppContent = () => {
  const location = useLocation();

  // Define which paths should NOT show the global Navbar/Footer
  // Adjust paths to match your actual route definitions
  const hideLayout = location.pathname === '/login' || location.pathname.startsWith('/admin');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* Conditionally render Navbar */}
      {!hideLayout && <Navbar />}

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/conferences" element={<ConferencesPage />} />
          <Route path="/conference-detail/:id" element={<ConferenceDetailPage />} />            
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/call-for-reviewers" element={<div style={styles.placeholder}>Call for Reviewers Page Coming Soon</div>} />
          <Route path="/call-for-papers" element={<div style={styles.placeholder}>Call for Papers Page Coming Soon</div>} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<div style={styles.placeholder}>Page Not Found</div>} />
        </Routes>
      </main>

      {/* Conditionally render Footer */}
      {!hideLayout && <Footer />}
      
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

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