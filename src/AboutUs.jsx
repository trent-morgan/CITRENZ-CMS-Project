import React from 'react';
import heroBG from './assets/christchurch.jpg';

const AboutUs = () => {
  const styles = {
    wrapper: {
      fontFamily: "'Inter', system-ui, sans-serif",
      margin: 0,
      padding: 0,
      width: '100%',
      color: '#1A202C',
      backgroundColor: '#fff',
    },
    heroSection: {
      width: '100%',
      backgroundImage: `linear-gradient(rgba(247, 250, 252, 0.8), rgba(247, 250, 252, 0.8)), url(${heroBG})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      borderBottom: '1px solid #E2E8F0',
      textAlign: 'center',
      padding: '10px 0', 
    },
    content: {
      padding: '80px 10%',
      width: '100%',
      boxSizing: 'border-box',
      maxWidth: '1400px',
      margin: '0 auto',
    },
    badge: {
      display: 'inline-block',
      backgroundColor: '#E2E8F0',
      color: '#2C5282',
      padding: '6px 16px',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: '700',
      letterSpacing: '1px',
      marginBottom: '20px',
    },
    title: {
      fontSize: 'clamp(2.5rem, 6vw, 4rem)',
      margin: '0 0 20px 0',
      fontWeight: '800',
      color: '#1A365D',
      lineHeight: '1.1',
    },
    subtitle: {
      fontSize: '1.25rem',
      fontWeight: '500',
      color: '#000000ac',
      maxWidth: '700px',
      margin: '0 auto',
      lineHeight: '1.6',
    },
    aboutSection: {
      width: '100%',
      backgroundColor: '#ffffff',
      paddingBottom: '100px',
    },
    sectionHeading: {
      textAlign: 'center',
      marginBottom: '40px',
      fontSize: '2.25rem',
      fontWeight: '700',
      color: '#2D3748',
    },
    textContainer: {
      maxWidth: '800px', // Prevents lines from being too long and hard to read
      margin: '0 auto',
      fontSize: '1.1rem',
      lineHeight: '1.8',
      color: '#4A5568',
    },
    paragraph: {
      marginBottom: '25px',
    }
  };

  return (
    <div style={styles.wrapper}>
      <header style={styles.heroSection}>
        <div style={styles.content}>
          <span style={styles.badge}>ESTABLISHED 2010</span>
          <h1 style={styles.title}>Computing and Information Technology Research and Education NZ</h1>
          <p style={styles.subtitle}>
            CITRENZ was formed in 2010 to drive excellence in computing qualifications and research across Aotearoa.
            This Conference Management System was created by Trent Morgan as part of the BCDE311 Software Development Project for CITRENZ</p>
        </div>
      </header>

      <section style={styles.aboutSection}>
        <div style={styles.content}>
          <h2 style={styles.sectionHeading}>About Us</h2>
          
          <div style={styles.textContainer}>
            <p style={styles.paragraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            
            <p style={styles.paragraph}>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.
            </p>
            
            <p style={styles.paragraph}>
              Aliquam sollicitudin ipsum ac diam. Praesent interdum, neque et sed cursus faucibus, leo libero consectetuer lorem, ac condimentum velit libero quis purus. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Fusce ut placerat orci nulla pellentesque dignissim enim.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;