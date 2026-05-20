import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const MOCK_CONFERENCES = [
  { 
    id: 1, 
    title: 'CITRENZ Annual Conference 2026', 
    location: 'Christchurch, New Zealand', 
    date: 'Oct 12-14, 2026', 
    status: 'Open', 
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus suscipit nec nisl sit amet tristique. Nunc eu mollis odio. Integer vehicula, ex a semper vestibulum, arcu lacus dignissim nisl, at iaculis tortor est semper nulla. Mauris laoreet nec lorem quis tempus. Sed nec ornare justo. Nulla facilisi. Aenean id ultrices magna. Mauris quis lacus tincidunt, commodo nibh non, tincidunt velit. In sed ante ante. Donec convallis, orci nec mattis tristique, dui nulla sodales quam, et malesuada velit metus at nulla. Integer id orci risus. Nullam placerat nunc lacus, et consectetur quam pulvinar ac. Maecenas id sem quis sem vehicula luctus. Curabitur quis orci ultricies ante malesuada posuere. Donec a nulla nec nulla tincidunt vulputate. Etiam fermentum tristique augue.',
    importantDates: [
      { label: 'Paper Submission Deadline', date: 'July 15, 2026' },
      { label: 'Conference Begins', date: 'October 12, 2026' }
    ],
    keyInfo: {
      themes: 'AI Integration in IT Deployment',
      contact: 'admin@citrenz.ac.nz'
    }
  },
];

const ConferenceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const conference = MOCK_CONFERENCES.find(conf => conf.id === parseInt(id));

  if (!conference) {
    return (
      <div style={styles.pageWrapper}>
        <h1 style={styles.mainTitle}>Conference Not Found</h1>
        <button onClick={() => navigate('/conferences')} style={styles.backButton}>← Back to Conferences</button>
      </div>
    );
  }

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.backButtonContainer}>
        <button onClick={() => navigate('/conferences')} style={styles.backButton}>
          ← Back to List
        </button>
      </div>

      <header style={styles.headerSection}>
        <h1 style={styles.mainTitle}>{conference.title}</h1>
        <span style={conference.status === 'Open' ? styles.statusOpen : styles.statusClosed}>
          {conference.status}
        </span>
      </header>

      <div style={styles.layoutGrid}>
        <main style={styles.mainContent}>
          <section style={styles.section}>
            <h2 style={styles.subTitle}>About this Conference</h2>
            <p style={styles.description}>{conference.description}</p>
          </section>

          <div style={styles.actionRow}>
            <button onClick={() => navigate('../paper-submission/' + conference.id)} style={styles.primaryButton}>
              Submit a Paper
            </button>
            <button style={styles.secondaryButton}>Register to Attend</button>
          </div>
        </main>

        <aside style={styles.sidebar}>
          <div style={styles.sidebarCard}>
            <h3 style={styles.sidebarTitle}>📅 Important Dates</h3>
            {conference.importantDates.map((item, index) => (
              <div key={index} style={styles.dateItem}>
                <span style={styles.dateLabel}>{item.label}</span>
                <span style={styles.dateValue}>{item.date}</span>
              </div>
            ))}
          </div>

          <div style={styles.sidebarCard}>
            <h3 style={styles.sidebarTitle}>ℹ️ Key Information</h3>
            <div style={styles.infoRow}>
              <strong>Theme:</strong> {conference.keyInfo.themes}
            </div>
            <div style={styles.infoRow}>
              <strong>Venue:</strong> {conference.location}
            </div>
            <div style={styles.infoRow}>
              <strong>Contact:</strong> <span style={{color: '#3182ce'}}>{conference.keyInfo.contact}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    paddingLeft: '4rem 5%',
    paddingRight: '4rem 5%',
    paddingTop: '2rem',
    paddingBottom: '2rem',

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
    alignItems: 'flex-start',
  },
  backButtonContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    paddingBottom: '1rem',
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
  },
  
  layoutGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 350px', 
    gap: '40px',
    alignItems: 'start',
  },
  
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  sidebarCard: {
    backgroundColor: '#F7FAFC',
    padding: '24px',
    borderRadius: '12px',
    border: '1px solid #E2E8F0',
  },
  sidebarTitle: {
    fontSize: '1.1rem',
    margin: '0 0 16px 0',
    color: '#2D3748',
    borderBottom: '2px solid #E2E8F0',
    paddingBottom: '8px',
  },
  
  dateItem: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '12px',
    paddingLeft: '10px',
    borderLeft: '3px solid #3182ce', 
  },
  dateLabel: {
    fontSize: '0.8rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#718096',
  },
  dateValue: {
    fontSize: '1rem',
    color: '#2D3748',
    fontWeight: '600',
  },

  infoRow: {
    fontSize: '0.95rem',
    marginBottom: '10px',
    color: '#4A5568',
  },
  description: {
    lineHeight: '1.6',
    color: '#4A5568',
    fontSize: '0.9rem',
  },

  '@media (max-width: 850px)': {
    layoutGrid: {
      gridTemplateColumns: '1fr',
    },
  },
};

export default ConferenceDetailPage;