import React, { useState } from 'react';

const MOCK_CONFERENCES = [
  { id: 1, title: 'CITRENZ Annual Conference 2026', location: 'Christchurch', date: 'Oct 12-14, 2026', status: 'Open' },
  { id: 2, title: 'North Island IT Educators Workshop', location: 'Auckland', date: 'Nov 05, 2026', status: 'Open' },
  { id: 3, title: 'South Island Computing Symposium', location: 'Dunedin', date: 'Dec 01, 2026', status: 'Open' }
];

const ConferencesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const loading = false;

  const conferences = MOCK_CONFERENCES.filter(conf =>
    conf.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conf.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.pageWrapper}>
      {/* 1. Centered Header at the very top */}
      <h1 style={styles.mainTitle}>Conferences</h1>

      <div style={styles.mainContainer}>
        {/* LEFT SIDE: Sidebar (20%) */}
        <aside style={styles.sidebar}>
          <p className="info">Create a new conference</p>
          <button style={styles.sidebarButton}>Create Conference</button>
          
          <div style={styles.filterGroup}>
            <label style={styles.label}>Search</label>
            <div style={styles.border}>
              <input 
              type="text" 
              placeholder="Type to search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
              />
            </div>
          </div>

          <div style={styles.filterGroup}>
            <label style={styles.label}>Filters</label>
            <div style={styles.border}>
              <select style={styles.select}>
              <option>All Locations</option>
              <option>Christchurch</option>
              <option>Auckland</option>
              <option>Wellington</option>
              <option>Duniden</option>
              <option>Queenstown</option>
            </select>
            </div>
          </div>
        </aside>

        {/* RIGHT SIDE: Content (80%) */}
        <main style={styles.contentArea}>
          <header style={styles.header}>
            <h2 style={styles.title}>Available Conferences</h2>
            <p>Explore and join upcoming CITRENZ events.</p>
          </header>

          <div style={styles.cardGrid}>
            {conferences.map(conf => (
              <div key={conf.id} style={styles.card}>
                <span style={conf.status === 'Open' ? styles.statusOpen : styles.statusClosed}>
                  {conf.status}
                </span>
                <h3 style={styles.cardTitle}>{conf.title}</h3>
                <p style={styles.details}>{conf.location} • {conf.date}</p>
                <button style={styles.primaryButton}>View Details</button>
              </div>
            ))}
          </div>

          {conferences.length === 0 && (
            <p style={styles.noResults}>No conferences found matching "{searchTerm}"</p>
          )}
        </main>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: 'system-ui, sans-serif',
    padding: '4.5rem'
    // backgroundColor: '#f7fafc',
  },
  mainTitle: {
    textAlign: 'center',
    margin: 0,
    fontSize: '3rem',
    fontWeight: '700',
    color: '#2D3748',
    // backgroundColor: '#ffffff',
    // borderBottom: '1px solid #e2e8f0',
  },
  title: {
    textAlign: 'center',
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#2D3748',
    // backgroundColor: '#ffffff',
    // borderBottom: '1px solid #e2e8f0',
  },
  mainContainer: {
    display: 'flex',
    flex: 1, // Takes up remaining height
    paddingTop: '3.4rem'
  },
  sidebar: {
    width: '20%',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    // borderRight: '1px solid #e2e8f0',
  },
  contentArea: {
    width: '80%',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // This centers the cardGrid horizontally
    paddingLeft: '0px',

  },
  // ... rest of your styles stay exactly the same
  sidebarButton: {
    backgroundColor: '#3182ce',
    color: 'white',
    padding: '16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1.1rem'
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#4A5568',
  },
  searchInput: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #cbd5e0',
  },
  select: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #cbd5e0',
    backgroundColor: 'white',
  },
  cardGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginTop: '30px',
    width: '90%', // Takes up 90% of the 80% content area
    maxWidth: '1000px', // Prevents them from getting too wide on big screens
    backgroundColor: '#bdbdbd',
    padding: '30px',
    borderRadius: '15px',
  },
  card: {
    backgroundColor: 'white',
    padding: '25px 25px',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    border: '1px solid #edf2f7',
    width: '100%',
    boxSizing: 'border-box',
    // New horizontal layout rules:
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
  },
  cardTitle: {
    margin: 0,
    fontSize: '1.1rem',
    color: '#2D3748',
    flex: 2, // Grows to take up available middle space
  },
  details: {
    margin: 0,
    color: '#718096',
    fontSize: '0.9rem',
    flex: 1, // Takes up some space for location/date
    whiteSpace: 'nowrap', // Keeps it on one line
  },
  statusOpen: {
    backgroundColor: '#C6F6D5',
    color: '#22543D',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: 'bold',
  },
  statusClosed: {
    backgroundColor: '#FED7D7',
    color: '#822727',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: 'bold',
  },
  primaryButton: {
    width: 'auto', // Overrides the previous 100% width
    padding: '8px 20px',
    backgroundColor: '#3182ce',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  noResults: {
    textAlign: 'center',
    color: '#718096',
    marginTop: '50px',
  },
  border: {
    backgroundColor: '#bdbdbd',
    padding: '15px',
    borderRadius: '15px',
  }
};

export default ConferencesPage;