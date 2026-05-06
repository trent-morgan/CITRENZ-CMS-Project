import React, { useState } from 'react'; // Added useState
import { Link } from 'react-router-dom';
import logoImg from './assets/logo.png';
import profileImg from './assets/profile_icon.png';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        <Link to="/">
          <img src={logoImg} alt="CITRENZ Logo" style={styles.logoImage} />
        </Link>
      </div>

      <ul style={styles.navLinks}>
        {/* SERVICES DROPDOWN */}
        <li 
          style={styles.dropdownWrapper}
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <div style={styles.link}>
            Services 
            <span style={{ 
              ...styles.arrow, 
              transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' 
            }}>
              ▼
            </span>
          </div>

          {dropdownOpen && (
            <ul style={styles.dropdownMenu}>
              <li style={styles.dropdownItem}>
                <Link to="/call-for-reviewers" style={styles.cleanLink}>Call for Reviewers</Link>
              </li>
              <li style={styles.dropdownItem}>
                <Link to="/call-for-papers" style={styles.cleanLink}>Call for Papers</Link>
              </li>
              <li style={styles.dropdownItemSeparator}></li>
              <li style={styles.dropdownItem}>
                <Link to="/admin" style={{...styles.cleanLink, color: '#3182ce'}}>Admin Panel</Link>
              </li>
            </ul>
          )}
        </li>

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
        <Link to="/login" >
          <img src={profileImg} alt="Profile Icon" style={styles.profileImage} />
        </Link>
      </div>
    </nav>
  );
};

const styles = {
  // ... existing styles ...
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
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  arrow: {
    fontSize: '0.6rem',
    transition: 'transform 0.2s ease',
  },
  // NEW DROPDOWN STYLES
  dropdownWrapper: {
    position: 'relative', // Critical for positioning the menu
    height: '70px',       // Match navbar height
    display: 'flex',
    alignItems: 'center',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '65px',         // Sits right below navbar
    left: '0',
    backgroundColor: '#ffffff',
    minWidth: '180px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    borderRadius: '8px',
    listStyle: 'none',
    padding: '10px 0',
    border: '1px solid #E2E8F0',
    zIndex: 1001,
  },
  dropdownItem: {
    padding: '10px 20px',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'background 0.2s',
    cursor: 'pointer',
  },
  dropdownItemSeparator: {
    height: '1px',
    backgroundColor: '#E2E8F0',
    margin: '5px 0',
  },
  // ... existing styles ...
  cleanLink: { textDecoration: 'none', color: 'inherit' },
  logoContainer: { display: 'flex', alignItems: 'center', height: '100%' },
  logoImage: { height: '35px', width: 'auto', display: 'block' },
  profileContainer: { display: 'flex', alignItems: 'center', height: '100%' },
  profileImage: { height: '45px', width: 'auto', display: 'block' },
  gradientLink: {
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '0.8rem',
    color: '#ffffff',
    backgroundImage: 'linear-gradient(to right, #48a1f4, #3e72b1)',
    padding: '8px 16px',
    borderRadius: '50px',
  },
};

export default Navbar;