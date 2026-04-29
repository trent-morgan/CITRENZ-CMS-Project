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
      padding: '120px 0', 
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
    actionSection: {
      width: '100%',
      backgroundColor: '#ffffff',
      paddingBottom: '100px',
    },
    sectionHeading: {
      textAlign: 'center',
      marginBottom: '60px',
      fontSize: '2.25rem',
      fontWeight: '700',
      color: '#2D3748',
    },
    cardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '40px',
    },
    card: {
      padding: '50px 40px',
      borderRadius: '16px',
      border: '1px solid #F7FAFC',
      backgroundColor: '#fff',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
      textAlign: 'center',
    },
    iconCircle: {
      fontSize: '2.5rem',
      marginBottom: '20px',
    },
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

      <section style={styles.actionSection}>
        <div style={styles.content}>
          <h2 style={styles.sectionHeading}>Our Core Mission</h2>
          <div style={styles.cardGrid}>
            <div style={styles.card}>
              <div style={styles.iconCircle}>🎓</div>
              <h3>Academic Excellence</h3>
              <p>Promoting high-quality research and teaching standards across all New Zealand tertiary institutions.</p>
            </div>

            <div style={styles.card}>
              <div style={styles.iconCircle}>🤝</div>
              <h3>Industry Connection</h3>
              <p>Bridging the gap between students and the tech sector through Work-Integrated Learning and partnerships.</p>
            </div>

            <div style={styles.card}>
              <div style={styles.iconCircle}>🌐</div>
              <h3>National Network</h3>
              <p>Providing a unified voice for computing educators to influence policy and drive innovation in the curriculum.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;