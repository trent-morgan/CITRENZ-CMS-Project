import React, { useEffect, useState } from 'react';
import heroBG from './assets/it_conference.jpg';
import adminIcon from './assets/admin_icon.png';
import reviewIcon from './assets/review_icon.png';
import publishIcon from './assets/publish_icon.png';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const conferenceDetails = {
    title: "Citrenz Conference 2026",
    subtitle: "Computing and Information Technology Research and Education New Zealand",
    deadline: "October 15, 2026",
  };

  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100); 
  }, []);


  return (
    <div style={styles.wrapper}>
      <header style={styles.heroSection}>
       <div style={{
          ...styles.content,
          ...styles.fadeIn,
          opacity: fadeIn ? 1 : 0,
          transform: fadeIn ? "translateY(0)" : "translateY(20px)"
        }}>
          <h1 style={styles.title}>{conferenceDetails.title}</h1>
          <p style={styles.subtitle}>{conferenceDetails.subtitle}</p>
          <div style={styles.badge}>
            Submissions Close: {conferenceDetails.deadline}
          </div>
        </div>
      </header>

      <section style={styles.actionSection}>
        <div style={styles.content}>
          <h2 style={styles.sectionHeading}>Portal Access</h2>
          <div style={styles.cardGrid}>
            
            <div style={styles.card}>
              <img src={publishIcon} alt="Authors" style={styles.cardIcon} />
              <h3>Authors</h3>
              <p>Upload manuscripts to a confernce.</p>
              <button onClick={() => navigate('/author-panel')} style={styles.primaryButton}>Submit Paper</button>
            </div>

            <div style={styles.card}>
              <img src={reviewIcon} alt="Reviewers" style={styles.cardIcon} />
              <h3>Reviewers</h3>
              <p>Access assigned papers and complete evaluation forms.</p>
              <button onClick={() => navigate('/reviewer-panel')} style={styles.secondaryButton}>Review Dashboard</button>
            </div>

            <div style={styles.card}>
              <img src={adminIcon} alt="Admin" style={styles.cardIcon} />
              <h3>Administration</h3>
              <p>Manage tracks, reviewers, and final program scheduling.</p>
              <button style={styles.darkButton}>Admin Panel</button>
            </div>
            
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px', fontSize: '0.9rem', color: '#718096' }}>
          Icons made by <a href="https://www.flaticon.com/authors/uniconlabs" title="Uniconlabs">Uniconlabs</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
        </div>
      </section>
    </div>
    
  );
};

const styles = {
  wrapper: {
    fontFamily: "'Inter', system-ui, sans-serif",
    margin: 0,
    padding: 0,
    width: '100%',
    color: '#1A202C',
  },
  content: {
    padding: '60px 5%',
    width: '100%',
    boxSizing: 'border-box',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  heroSection: {
    width: '100%',
    background: `linear-gradient(#133860, #2E92C4)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    borderBottom: '1px solid #E2E8F0',
    textAlign: 'center',
    padding: '60px 0', 
  },
  title: {
    fontSize: 'clamp(3rem, 5vw, 4.5rem)',
    margin: '0 0 10px 0',
    fontWeight: '1000',
    color: '#ffffff',
    lineHeight: '1.2',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#f0f0f0',
    maxWidth: '800px',
    margin: '0 auto',
  },
  badge: {
    display: 'inline-block',
    backgroundColor: '#3182CE',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '4px',
    marginTop: '30px',
    fontSize: '0.9rem',
    fontWeight: '600',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  actionSection: {
    width: '100%',
    backgroundColor: '#ffffff',
    paddingBottom: '80px',
  },
  sectionHeading: {
    textAlign: 'center',
    marginBottom: '50px',
    fontSize: '2.2rem',
    fontWeight: '700',
    color: '#000000'
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
  },
  card: {
    padding: '40px',
    borderRadius: '12px',
    border: '1px solid #E2E8F0',
    backgroundColor: '#fff',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
    textAlign: 'center',
  },
  primaryButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#3182CE',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    marginTop: '20px',
  },
  secondaryButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#EDF2F7',
    color: '#2D3748',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    marginTop: '20px',
  },
  darkButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#1A202C',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    marginTop: '20px',
  },
  cardIcon: {
    width: '100px', 
    height: '100px',
    marginBottom: '20px',
    objectFit: 'contain'
  },
  fadeIn: {
    transition: "opacity 2.2s ease-out, transform 2.2s ease-out",
    transform: "translateY(20px)",   
  },


};

export default Home;