import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Replace this with your actual auth logic 
  // (e.g., checking localStorage or a global state)
  const isAuthenticated = localStorage.getItem('userLoggedIn') === 'true';

  if (!isAuthenticated) {
    // Redirect to login, but save the location they were trying to go to
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;