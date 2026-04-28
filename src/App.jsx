import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import ConferencesPage from './features/conference/ConferencesPage';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <main>
          <Routes>
            {/* This renders Home when the path is exactly "/" */}
            <Route path="/" element={<Home />} />
            
            {/* This renders your new page when the path is "/conferences" */}
            <Route path="/conferences" element={<ConferencesPage />} />
            
            {/* Optional: Add a 404 Not Found route */}
            <Route path="*" element={<div style={{padding: '50px', textAlign: 'center'}}>Page Not Found</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;