import React from 'react';
import { Link } from 'react-router-dom'; 
import logoImg from './assets/logo.png';
import profileImg from './assets/profile_icon.png'; 

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        <Link to="/">
          <img src={logoImg} alt="CITRENZ Logo" style={styles.logoImage} />
        </Link>
      </div>

      <ul style={styles.navLinks}>
        <li style={styles.link}>Services</li>
        <li style={styles.link}>
          <Link to="/conferences" style={styles.cleanLink}>Conferences</Link>
        </li>
        <li style={styles.link}>Contact</li>
                <li style={styles.link}>
          <Link to="/about-us" style={styles.cleanLink}>About Us</Link>
        </li>


      </ul>
      <ul style={styles.navLinks}>
          <li style={styles.link}>
          <Link to="/conferences" style={styles.gradientLink} className="nav-gradient-btn">
            Create Conference
          </Link>
        </li>
      </ul>
      <div style={styles.profileContainer}>
        <img src={profileImg} alt="Profile Icon" style={styles.profileImage} />
      </div>
    </nav>
  );
};

const styles = {
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
    alignItems: 'center', 
  },
  link: {
    fontSize: '0.95rem',
    color: '#4A5568',
    cursor: 'pointer',
    fontWeight: '600',

  },
  cleanLink: {
    textDecoration: 'none',
    color: 'inherit', 
  },
  logoContainer: { display: 'flex', alignItems: 'center', height: '100%' },
  logoImage: { height: '35px', width: 'auto', display: 'block' },
  profileContainer: { display: 'flex', alignItems: 'center', height: '100%' },
  profileImage: { height: '45px', width: 'auto', display: 'block', filter: 'drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.17))' },
  gradientLink: {
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '0.8rem',
    color: '#ffffff', 
    
    backgroundImage: 'linear-gradient(to right, #3182CE, #2C5282)',
    
    padding: '8px 16px',
    borderRadius: '50px', 
    
    // transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    // display: 'inline-block',
    // boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
};

export default Navbar;