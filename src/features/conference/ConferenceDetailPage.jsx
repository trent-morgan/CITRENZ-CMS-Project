import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MOCK_CONFERENCES = [
  { id: 1, title: 'CITRENZ Annual Conference 2026', location: 'Christchurch', date: 'Oct 12-14, 2026', status: 'Open', description: 'The premier event for IT education and research in New Zealand.' },
  { id: 2, title: 'North Island IT Educators Workshop', location: 'Auckland', date: 'Nov 05, 2026', status: 'Open', description: 'A hands-on workshop focusing on modern web frameworks and AI integration.' },
  { id: 3, title: 'South Island Computing Symposium', location: 'Dunedin', date: 'Dec 01, 2026', status: 'Open', description: 'Exploring the future of cloud computing and decentralized networks.' }
];

const ConferenceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the conference that matches the ID from the URL
  const conference = MOCK_CONFERENCES.find(conf => conf.id === parseInt(id));

  // If no conference is found, show a simple error state
  if (!conference) {
    return (
      <div style={styles.pageWrapper}>
        <h1 style={styles.mainTitle}>Conference Not Found</h1>
        <button onClick={() => navigate('/conferences')} style={styles.backButton}>
          Back to Conferences
        </button>
      </div>
    );
  }

  return (
    <div style={styles.pageWrapper}>
      <header style={styles.headerSection}>
        <button onClick={() => navigate('/conferences')} style={styles.backButton}>
          ← Back to List
        </button>
        <h1 style={styles.mainTitle}>{conference.title}</h1>
        <span style={conference.status === 'Open' ? styles.statusOpen : styles.statusClosed}>
          {conference.status}
        </span>
      </header>

      <div style={styles.mainContainer}>
        <main style={styles.contentArea}>
          <div style={styles.infoGrid}>
            <div style={styles.infoCard}>
              <label style={styles.label}>Location</label>
              <p style={styles.infoText}>{conference.location}</p>
            </div>
            <div style={styles.infoCard}>
              <label style={styles.label}>Date</label>
              <p style={styles.infoText}>{conference.date}</p>
            </div>
          </div>

          <section style={styles.detailsSection}>
            <h2 style={styles.subTitle}>About this Conference</h2>
            <p style={styles.description}>
              {conference.description || "No detailed description provided."}
            </p>
          </section>

          <div style={styles.actionRow}>
            <button style={styles.primaryButton}>Submit a Paper</button>
            <button style={styles.secondaryButton}>Register to Attend</button>
          </div>
        </main>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    padding: '4rem 5%',
    fontFamily: 'system-ui, sans-serif',
    color: '#2D3748',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  headerSection: {
    marginBottom: '2rem',
    textAlign: 'center',
  },
  mainTitle: {
    fontSize: '2.5rem',
    fontWeight: '800',
    margin: '1rem 0',
  },
  backButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#3182ce',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
  },
  statusOpen: {
    backgroundColor: '#C6F6D5',
    color: '#22543D',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: 'bold',
  },
  mainContainer: {
    backgroundColor: '#fff',
    borderRadius: '15px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    border: '1px solid #E2E8F0',
    padding: '2rem',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '2rem',
    borderBottom: '1px solid #E2E8F0',
    paddingBottom: '2rem',
  },
  label: {
    fontSize: '0.85rem',
    color: '#718096',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: '1.2rem',
    margin: '5px 0 0 0',
    fontWeight: '600',
  },
  subTitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
  },
  description: {
    lineHeight: '1.6',
    color: '#4A5568',
    fontSize: '1.1rem',
  },
  actionRow: {
    display: 'flex',
    gap: '15px',
    marginTop: '3rem',
  },
  primaryButton: {
    backgroundColor: '#3182ce',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  secondaryButton: {
    backgroundColor: '#EDF2F7',
    color: '#2D3748',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
  }
};

export default ConferenceDetailPage;