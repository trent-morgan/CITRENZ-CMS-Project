import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import logoImg from './assets/logo.png';
import profileImg from './assets/profile_icon.png'; 

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        {/* Linking the logo back to home is a standard UX practice */}
        <Link to="/">
          <img src={logoImg} alt="CITRENZ Logo" style={styles.logoImage} />
        </Link>
      </div>

      <ul style={styles.navLinks}>
        <li style={styles.link}>Services</li>
        {/* This is the updated link to your new page */}
        <li style={styles.link}>
          <Link to="/conferences" style={styles.cleanLink}>Conferences</Link>
        </li>
        <li style={styles.link}>Contact</li>
        <li style={styles.link}>About Us</li>
      </ul>

      <div style={styles.profileContainer}>
        <img src={profileImg} alt="Profile Icon" style={styles.profileImage} />
      </div>
    </nav>
  );
};

const styles = {
  // ... your existing styles ...
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 40px',
    height: '70px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #E2E8F0',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  navLinks: {
    display: 'flex',
    listStyle: 'none',
    gap: '50px',
    margin: 0,
    padding: 0,
  },
  link: {
    fontSize: '0.95rem',
    color: '#4A5568',
    cursor: 'pointer',
    fontWeight: '600',
  },
  // Add this to remove the default blue underline from the Link component
  cleanLink: {
    textDecoration: 'none',
    color: 'inherit', 
  },
  logoContainer: { display: 'flex', alignItems: 'center', height: '100%' },
  logoImage: { height: '35px', width: 'auto', display: 'block' },
  profileContainer: { display: 'flex', alignItems: 'center', height: '100%' },
  profileImage: { height: '40px', width: 'auto', display: 'block' }
};

export default Navbar;