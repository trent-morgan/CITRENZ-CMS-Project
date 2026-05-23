import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import logoImg from './assets/logo.png';
import profileImg from './assets/profile_icon.png';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const user = localStorage.getItem("currentUser");
  const parsedUser = user ? JSON.parse(user) : null;
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        <Link to="/">
          <img src={logoImg} alt="CITRENZ Logo" style={styles.logoImage} />
        </Link>
      </div>

      <ul style={styles.navLinks}>
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
                <Link to="/dashboard" style={styles.cleanLink}>Dashboard</Link>
              </li>
              <li style={styles.dropdownItemSeparator}></li>
              <li style={styles.dropdownItem}>
                <Link to="/conference-creation" style={styles.cleanLink}>Create Conference</Link>
              </li>
            </ul>
          )}
        </li>

        <li style={styles.link}>
          <Link to="/conferences" style={styles.cleanLink}>Conferences</Link>
        </li>
        <li style={styles.link}>
            <Link to="/contact" style={styles.cleanLink}>Contact</Link>
        </li>
        <li style={styles.link}>
          <Link to="/about-us" style={styles.cleanLink}>About Us</Link>
        </li>
      </ul>

      <div 
        style={styles.profileContainer}
        onClick={() => {
          if (!parsedUser) return; // only toggle if logged in
          setProfileOpen(!profileOpen);
        }}
      >
        {/* Logged OUT state */}
        {!parsedUser && (
          <Link to="/login" style={styles.cleanLink}>
            <img src={profileImg} alt="Login" style={styles.profileImage} />
          </Link>
        )}

        {/* Logged IN state */}
        {parsedUser && (
          <>
            <span style={styles.userName}>
              {parsedUser.first_name + " " + parsedUser.last_name}
            </span>
            <img src={profileImg} alt="Profile Icon" style={styles.profileImage} />

            <span
              style={{
                ...styles.arrow,
                transform: profileOpen ? "rotate(180deg)" : "rotate(0deg)"
              }}
            >
              ▼
            </span>
          </>
        )}

        {/* Dropdown */}
        {parsedUser && profileOpen && (
          <ul style={styles.profileDropdown}>
            <li style={styles.dropdownItem}>
              <Link to="/profile" style={styles.cleanLink}>Profile</Link>
            </li>

            <li style={styles.dropdownItemSeparator}></li>

            <li 
              style={styles.dropdownItem}
              onClick={() => {
                localStorage.removeItem("currentUser");
                localStorage.removeItem("userLoggedIn");
                window.location.href = "/login";
              }}
            >
              Logout
            </li>
          </ul>
        )}
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
    height: '60px',
    backgroundColor: '#133860',
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
    fontSize: '0.9rem',
    color: '#ffffff',
    cursor: 'pointer',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  arrow: {
    fontSize: '0.6rem',
    transition: 'transform 0.2s ease',
    color: '#ffffff',   // ← this keeps it white
  },
  dropdownWrapper: {
    position: 'relative', 
    height: '70px',       
    display: 'flex',
    alignItems: 'center',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '65px',         
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
  cleanLink: { textDecoration: 'none', color: 'inherit' },
  logoContainer: { display: 'flex', alignItems: 'center', height: '100%' },
  logoImage: {
      height: '30px',             
      width: 'auto',
      display: 'block',
      backgroundColor: 'white',
      padding: '8px 15px',        
      borderRadius: '50px',       
      transition: 'all 0.3s ease', 
      cursor: 'pointer',
      // filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))', 
  },
  profileContainer: { display: 'flex', alignItems: 'center', height: '100%',cursor: 'pointer', },
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
  userName: {
    color: "white",
    marginLeft: "10px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "0.8rem",
  },

profileDropdown: {
  position: "absolute",
  top: '45px',         
  right: "0",
  backgroundColor: "#ffffff",
  minWidth: "150px",
  boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
  borderRadius: "8px",
  listStyle: "none",
  padding: "10px 0",
  border: "1px solid #E2E8F0",
  zIndex: 2000,
  },
};

export default Navbar;