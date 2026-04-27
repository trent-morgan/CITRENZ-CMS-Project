import React from 'react';
import logoImg from './assets/logo.png'; 

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        <img src={logoImg} alt="CITRENZ Logo" style={styles.logoImage} />
        </div>
      <ul style={styles.navLinks}>
        <li style={styles.link}>Home</li>
        <li style={styles.link}>Submissions</li>
        <li style={styles.link}>Reviews</li>
        <li style={styles.link}>Profile</li>
      </ul>
      <button style={styles.loginBtn}>Login</button>
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
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#2D3748',
    letterSpacing: '-0.5px'
  },
  navLinks: {
    display: 'flex',
    listStyle: 'none',
    gap: '30px',
    margin: 0,
    padding: 0,
  },
  link: {
    fontSize: '0.95rem',
    color: '#4A5568',
    cursor: 'pointer',
    fontWeight: '500',
  },
  loginBtn: {
    backgroundColor: '#3182CE',
    color: 'white',
    border: 'none',
    padding: '8px 18px',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    height: '100%', // Ensures it centers vertically in the nav
  },
  logoImage: {
    height: '40px', // Adjust this to make your logo bigger or smaller
    width: 'auto',   // Maintains the aspect ratio
    display: 'block'
  }
};

export default Navbar;