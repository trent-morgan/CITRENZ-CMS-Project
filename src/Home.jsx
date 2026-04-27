import React from 'react';

const Home = () => {
  const conferenceDetails = {
    title: "CITRENZ Conference 2026",
    subtitle: "Computing and Information Technology Research and Education New Zealand",
    deadline: "October 15, 2026",
  };

  return (
    <div style={styles.wrapper}>
      {/* Hero Section - Full Width Background */}
      <header style={styles.heroSection}>
        <div style={styles.content}>
          <h1 style={styles.title}>{conferenceDetails.title}</h1>
          <p style={styles.subtitle}>{conferenceDetails.subtitle}</p>
          <div style={styles.badge}>
            Submissions Close: {conferenceDetails.deadline}
          </div>
        </div>
      </header>

      {/* Action Section - Alternating Background */}
      <section style={styles.actionSection}>
        <div style={styles.content}>
          <h2 style={styles.sectionHeading}>Portal Access</h2>
          <div style={styles.cardGrid}>
            <div style={styles.card}>
              <h3>Authors</h3>
              <p>Upload manuscripts and manage your submission history.</p>
              <button style={styles.primaryButton}>Submit Paper</button>
            </div>

            <div style={styles.card}>
              <h3>Reviewers</h3>
              <p>Access assigned papers and complete evaluation forms.</p>
              <button style={styles.secondaryButton}>Review Dashboard</button>
            </div>

            <div style={styles.card}>
              <h3>Administration</h3>
              <p>Manage tracks, reviewers, and final program scheduling.</p>
              <button style={styles.darkButton}>Admin Panel</button>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section - Light Gray Full Width */}
      <footer style={styles.footerSection}>
        <div style={styles.content}>
          <h4 style={{ marginBottom: '20px' }}>Critical Milestones</h4>
          <div style={styles.timelineGrid}>
            <div><strong>June 01</strong><br />Call for Papers Open</div>
            <div><strong>Oct 15</strong><br />Submission Deadline</div>
            <div><strong>Nov 20</strong><br />Author Notification</div>
            <div><strong>Dec 05</strong><br />Camera Ready Due</div>
          </div>
        </div>
      </footer>
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
    // This provides padding so text isn't touching the screen edge, 
    // but the background colors behind it will still be full-width.
    padding: '60px 5%', 
    width: '100%',
    boxSizing: 'border-box',
  },
  heroSection: {
    width: '100%',
    backgroundColor: '#F7FAFC', // Light cool gray
    borderBottom: '1px solid #E2E8F0',
    textAlign: 'center',
  },
  title: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)', // Responsive font size
    margin: '0 0 10px 0',
    fontWeight: '800',
    color: '#2D3748',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#718096',
    maxWidth: '800px',
    margin: '0 auto',
  },
  badge: {
    display: 'inline-block',
    backgroundColor: '#2D3748',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '4px',
    marginTop: '30px',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
  actionSection: {
    width: '100%',
    backgroundColor: '#ffffff',
  },
  sectionHeading: {
    textAlign: 'center',
    marginBottom: '40px',
    fontSize: '1.8rem',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
  },
  card: {
    padding: '40px',
    borderRadius: '8px',
    border: '1px solid #E2E8F0',
    transition: 'transform 0.2s ease',
    backgroundColor: '#fff',
  },
  primaryButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#3182CE',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '600',
    marginTop: '20px',
  },
  secondaryButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#E2E8F0',
    color: '#2D3748',
    border: 'none',
    borderRadius: '4px',
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
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '600',
    marginTop: '20px',
  },
  footerSection: {
    width: '100%',
    backgroundColor: '#F7FAFC',
    borderTop: '1px solid #E2E8F0',
  },
  timelineGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '20px',
    fontSize: '0.9rem',
    color: '#4A5568',
  }
};

export default Home;