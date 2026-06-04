import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoImg from './assets/logo.png';
import profileImg from './assets/profile_icon.png';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  const user = localStorage.getItem("currentUser");
  const parsedUser = user ? JSON.parse(user) : null;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav style={styles.navbar}>
      
      {/* Logo */}
      <div style={styles.logoContainer}>
        <Link to="/">
          <img 
            src={logoImg} 
            alt="CITRENZ Logo" 
            style={isMobile ? styles.logoImageMobile : styles.logoImage} 
          />
        </Link>
      </div>

      {/* MOBILE RIGHT CONTROLS */}
      {isMobile && (
        <div style={styles.rightControls}>

          {/* Mobile Profile Icon */}
          {parsedUser && (
            <img 
              src={profileImg} 
              alt="Profile" 
              style={styles.profileImageMobile}
              onClick={() => {
                setProfileOpen(!profileOpen);
                setHamburgerOpen(false);
              }}
            />
          )}

          {/* Hamburger / X Icon */}
          <div 
            style={styles.hamburgerContainer}
            onClick={() => {
              setHamburgerOpen(!hamburgerOpen);
              setProfileOpen(false);
            }}
          >
            <div 
              style={{
                ...styles.hamburgerLine,
                transform: hamburgerOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
              }}
            ></div>

            <div 
              style={{
                ...styles.hamburgerLine,
                opacity: hamburgerOpen ? 0 : 1
              }}
            ></div>

            <div 
              style={{
                ...styles.hamburgerLine,
                transform: hamburgerOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none'
              }}
            ></div>
          </div>
        </div>
      )}

      {/* DESKTOP NAV */}
      {!isMobile && (
        <ul style={styles.navLinks}>
          <li style={styles.dropdownWrapper}>
            <div 
              style={styles.link}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Services 
              <span
                style={{
                  ...styles.arrow,
                  transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.25s ease"
                }}
              >
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
      )}

      {/* DESKTOP PROFILE (HIDDEN ON MOBILE) */}
      {!isMobile && (
        <div 
          style={styles.profileContainer}
          onClick={() => parsedUser && setProfileOpen(!profileOpen)}
        >
          {!parsedUser && (
            <Link to="/login" style={styles.cleanLink}>
              <img src={profileImg} alt="Login" style={styles.profileImage} />
            </Link>
          )}

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

          {parsedUser && profileOpen && (
            <ul style={styles.profileDropdown}>
              <li style={styles.dropdownItem}>
                <p style={{ fontWeight: '800', cursor: 'default', color: '#333' }}>
                  {parsedUser.email} 
                </p>
              </li>
              <li style={styles.dropdownItem}>
                <Link to="/profile" style={styles.cleanLink}>Profile</Link>
              </li>

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
      )}

      {/* MOBILE MENU (ANIMATED) */}
      {isMobile && (
        <ul 
          style={{
            ...styles.mobileMenu,
            maxHeight: hamburgerOpen ? "500px" : "0px"
          }}
        >
          <li 
            style={styles.mobileItem}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Services
            <span style={{ ...styles.arrow, marginLeft: 8 }}>
              {dropdownOpen ? "▲" : "▼"}
            </span>
          </li>

          {dropdownOpen && (
            <>
              <li style={styles.mobileSubItem}>
                <Link to="/dashboard" style={styles.cleanLink}>Dashboard</Link>
              </li>
              <li style={styles.mobileSubItem}>
                <Link to="/conference-creation" style={styles.cleanLink}>Create Conference</Link>
              </li>
            </>
          )}

          <li style={styles.mobileItem}>
            <Link to="/conferences" style={styles.cleanLink}>Conferences</Link>
          </li>
          <li style={styles.mobileItem}>
            <Link to="/contact" style={styles.cleanLink}>Contact</Link>
          </li>
          <li style={styles.mobileItem}>
            <Link to="/about-us" style={styles.cleanLink}>About Us</Link>
          </li>

          {/* SIGN UP (ONLY WHEN LOGGED OUT) */}
          {!parsedUser && (
            <li style={styles.mobileItem}>
              <Link to="/login" style={styles.cleanLink}>Sign In</Link>
            </li>
          )}

          {/* MOBILE PROFILE DROPDOWN (ONLY WHEN LOGGED IN) */}
          {parsedUser && profileOpen && (
            <>
              <li style={styles.mobileItem}>{parsedUser.email}</li>
              <li style={styles.mobileItem}>
                <Link to="/profile" style={styles.cleanLink}>Profile</Link>
              </li>
              <li 
                style={styles.mobileItem}
                onClick={() => {
                  localStorage.removeItem("currentUser");
                  localStorage.removeItem("userLoggedIn");
                  window.location.href = "/login";
                }}
              >
                Logout
              </li>
            </>
          )}
        </ul>
      )}

      {/* MOBILE PROFILE DROPDOWN (SEPARATE FROM HAMBURGER) */}
      {isMobile && (
        <ul 
          style={{
            ...styles.mobileMenu,
            maxHeight: profileOpen ? "300px" : "0px"
          }}
        >
          <li style={styles.mobileItem}>{parsedUser?.email}</li>

          <li style={styles.mobileItem}>
            <Link to="/profile" style={styles.cleanLink}>Profile</Link>
          </li>

          <li 
            style={styles.mobileItem}
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


    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    height: '60px',
    backgroundColor: '#133860',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },

  logoContainer: { display: 'flex', alignItems: 'center' },

  logoImage: {
    height: '30px',
    backgroundColor: 'white',
    padding: '8px 15px',
    borderRadius: '50px',
  },

  logoImageMobile: {
    height: '22px',
    backgroundColor: 'white',
    padding: '5px 10px',
    borderRadius: '40px',
  },

  rightControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },

  profileImageMobile: {
    height: '35px',
    width: 'auto',
    cursor: 'pointer',
  },

  hamburgerContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    cursor: 'pointer',
  },

  hamburgerLine: {
    width: '25px',
    height: '3px',
    backgroundColor: 'white',
    borderRadius: '3px',
    transition: 'all 0.3s ease',
  },

  mobileMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    backgroundColor: '#133860',
    overflow: 'hidden',
    transition: 'max-height 0.35s ease',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    zIndex: 1500,
  },

  mobileItem: {
    padding: '15px 25px',
    color: 'white',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
  },

  mobileSubItem: {
    padding: '10px 45px',
    color: 'white',
    backgroundColor: '#1c4a7a',
    fontSize: '0.9rem',
  },

  navLinks: {
    display: 'flex',
    gap: '40px',
    listStyle: 'none',
  },

  link: {
    color: 'white',
    fontWeight: '600',
    cursor: 'pointer',
  },

  arrow: {
    fontSize: '0.7rem',
    marginLeft: '5px',
    transition: 'transform 0.2s ease',
    color: 'white',
  },

  dropdownWrapper: {
    position: 'relative',
  },

  dropdownMenu: {
    position: 'absolute',
    top: '60px',
    left: 0,
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '10px 0',
    listStyle: 'none',
    minWidth: '180px',
  },

  dropdownItem: {
    padding: '10px 20px',
    cursor: 'pointer',
  },

  dropdownItemSeparator: {
    height: '1px',
    backgroundColor: '#ddd',
    margin: '5px 0',
  },

  profileContainer: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    position: 'relative',
  },

  profileImage: {
    height: '45px',
  },

  userName: {
    color: 'white',
    marginRight: '10px',
    fontWeight: '600',
  },

  profileDropdown: {
    position: 'absolute',
    top: '60px',
    right: 0,
    backgroundColor: 'white',
    borderRadius: '8px',
    listStyle: 'none',
    padding: '10px 0',
    minWidth: '150px',
  },

  cleanLink: { textDecoration: 'none', color: 'inherit' },
  link: {
  color: 'white',
  fontWeight: '600',
  cursor: 'pointer',
  display: 'flex',          // REQUIRED
  alignItems: 'center',     // REQUIRED
  gap: '6px',               // REQUIRED
  userSelect: 'none',       // optional but nice
},

};


export default Navbar;