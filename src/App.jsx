import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute'; 

import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import AboutUs from './AboutUs';
import ConferencesPage from './features/conference/ConferencesPage';
import ConferenceDetailPage from './features/conference/ConferenceDetailPage';
import PaperSubmission from './features/paper/PaperSubmission';
import LoginPage from './features/login/Login';
import Register from './features/register/Register';
import AdminPanel from './features/admin/AdminPanel';
import Contact from './features/contact/Contact';
import Profile from './features/profile/Profile';

const AppContent = () => {
  const location = useLocation();

  const hideLayout = ['/register', '/login', '/admin'].some(path => 
    location.pathname.startsWith(path)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!hideLayout && <Navbar />}

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/conferences" element={<ConferencesPage />} />
          <Route path="/conference-detail/:id" element={<ConferenceDetailPage />} /> 
          
          <Route 
            path="/paper-submission/:id" 
            element={
              <ProtectedRoute>
                <PaperSubmission />
              </ProtectedRoute>
            } 
          />            
          
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/my-conferences" element={<div style={styles.placeholder}>Conference Dashboard Coming Soon</div>} />
          <Route path="/my-papers" element={<div style={styles.placeholder}>Papers Dashboard Coming Soon</div>} />

          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            } 
          />

          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<div style={styles.placeholder}>Page Not Found</div>} />
        </Routes>
      </main>

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