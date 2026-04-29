import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import AboutUs from './AboutUs';
import ConferencesPage from './features/conference/ConferencesPage';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            
            <Route path="/conferences" element={<ConferencesPage />} />
            
            <Route path="/about-us" element={<AboutUs />} />
            
            <Route path="*" element={<div style={{padding: '50px', textAlign: 'center'}}>Page Not Found</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;