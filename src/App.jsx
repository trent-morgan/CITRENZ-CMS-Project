import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import AboutUs from './AboutUs';
import ConferencesPage from './features/conference/ConferencesPage';
import ConferenceDetailPage from './features/conference/ConferenceDetailPage';
import ConferenceCreation from './features/conference/ConferenceCreation';
import PaperSubmission from './features/paper/PaperSubmission';
import LoginPage from './features/login/Login';
import Register from './features/register/Register';
import AdminPanel from './features/admin/AdminPanel';
import Contact from './features/contact/Contact';
import Profile from './features/profile/Profile';
import Dashboard from './features/dashboard/Dashboard';
import AuthorPanel from './features/dashboard/AuthorPanel';
import ReviewerPanel from './features/dashboard/ReviewerPanel';
import OrganizerPanel from './features/dashboard/OrganizerPanel';
import PaperDetailPage from './features/paper/PaperDetail';

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
          <Route path="/dashboard" element={
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>} />
          <Route path="/conference-creation" element={
            <ProtectedRoute>
              <ConferenceCreation />
            </ProtectedRoute>} />

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
          
          <Route path="/author-panel" element={
            <ProtectedRoute>
              <AuthorPanel />
            </ProtectedRoute>
          } />

          <Route path="/reviewer-panel" element={
            <ProtectedRoute>
              <ReviewerPanel />
            </ProtectedRoute>
          } />

          <Route path="/organizer-panel" element={
            <ProtectedRoute>
              <OrganizerPanel />
            </ProtectedRoute>
          } />
          
          <Route path="/paper-detail/:id" element={
            <ProtectedRoute>
              <PaperDetailPage />
            </ProtectedRoute>
          } />
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