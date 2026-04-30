import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MOCK_CONFERENCES = [
  { id: 1, title: 'CITRENZ Annual Conference 2026', location: 'Christchurch', date: 'Oct 12-14, 2026', status: 'Open' },
  { id: 2, title: 'North Island IT Educators Workshop', location: 'Auckland', date: 'Nov 05, 2026', status: 'Open' },
  { id: 3, title: 'South Island Computing Symposium', location: 'Dunedin', date: 'Dec 01, 2026', status: 'Open' },
  { id: 4, title: 'Future of Tech Education Summit', location: 'Wellington', date: 'Jan 20, 2027', status: 'Closed' }
];

const ConferencesPage = () => {

  const navigate = useNavigate(); // 2. Add this line inside the component

  const handleViewDetail = (id) => {
    // This will move the user to the detail page
    // Using backticks allows you to pass a dynamic ID (like your UUID)
    navigate(`/conference-detail/${id}`);
  };

  const [searchTerm, setSearchTerm] = useState('');
  const loading = false;

  const [showOnlyOpen, setShowOnlyOpen] = useState(false);

  const conferences = MOCK_CONFERENCES.filter(conf => {
  const matchesSearch = conf.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        conf.location.toLowerCase().includes(searchTerm.toLowerCase());
  
  // If checkbox is checked, only return 'Open' status. Otherwise, return all.
  const matchesStatus = showOnlyOpen ? conf.status === 'Open' : true;

  return matchesSearch && matchesStatus;
  });

  return (
    <div style={styles.pageWrapper}>
      {/* 1. Centered Header at the very top */}
      <h1 style={styles.mainTitle}>Conferences</h1>
      <p className="info">Want people to see your next upcoming conference? Create a new conference</p>

      <div style={styles.mainContainer}>
        {/* LEFT SIDE: Sidebar (20%) */}
        <aside style={styles.sidebar}>
          {/* <p className="info">Want people to see your next upcoming conference? Create a new conference</p> */}
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
              <label style={styles.checkboxContainer}>
                <input 
                  type="checkbox" 
                  checked={showOnlyOpen}
                  onChange={(e) => setShowOnlyOpen(e.target.checked)}
                  style={styles.checkbox}
                />
                <span style={styles.filterLabel}>Only Open</span>
              </label>
                <select style={styles.select}>
                <option>All Locations</option>
                <option>Christchurch</option>
                <option>Auckland</option>
                <option>Wellington</option>
                <option>Dunedin</option>
                <option>Queenstown</option>
              </select>
            </div>
          </div>
        </aside>

        {/* RIGHT SIDE: Content (80%) */}

        <main style={styles.contentArea}>
          {/* <header style={styles.header}>
            <h2 style={styles.title}>Available Conferences</h2>
            <p>Explore and join upcoming CITRENZ events.</p>
          </header> */}
          <div style={styles.cardGrid}>
            {conferences.map(conf => (
              <div key={conf.id} style={styles.card}>
                <span style={conf.status === 'Open' ? styles.statusOpen : styles.statusClosed}>
                  {conf.status}
                </span>
                <h3 style={styles.cardTitle}>{conf.title}</h3>
                <p style={styles.details}>{conf.location} • {conf.date}</p>
                <button style={styles.primaryButton} 
                  onClick={() => handleViewDetail(conf.id)}>
                  View Details
                </button>
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
    padding: '1rem 1rem', // Reduced side padding for mobile
    maxWidth: '1200px',   // 🔥 Prevents drifting too far apart on big screens
    margin: '0 auto',      // 🔥 Centers the whole app on the screen
    width: '100%',
    boxSizing: 'border-box',
  },
  mainTitle: {
    textAlign: 'center',
    margin: '1rem 0',
    fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', // Scales font size based on screen width
    fontWeight: '700',
    color: '#2D3748',
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap', // 🔥 Allows sidebar to drop below content on very small screens
    gap: '2rem',      // Adds consistent spacing between sidebar and content
    marginTop: '1rem',
  },
  sidebar: {
    flex: '1 1 250px', // 🔥 "Grow, Shrink, but try to stay at 250px"
    maxWidth: '300px', // Prevents sidebar from getting too huge
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  contentArea: {
    backgroundColor: '#f0f0f0',
    borderRadius: '15px',
    flex: '3 1 400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    /* 🔥 Added these for scrolling */
    height: 'calc(100vh - 12rem)', // Adjust 200px based on your header height
    overflowY: 'auto',             // Enables the scrollbar
    paddingRight: '10px',          // Space for the scrollbar
    scrollbarWidth: 'thin',        // Firefox styling
  },
  cardGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
    maxWidth: '1000px',

    padding: '30px',

    boxSizing: 'border-box',
    /* 🔥 Ensure the grid expands to fit all cards inside the scroll area */
    minHeight: 'min-content', 
  },
  card: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    border: '1px solid #edf2f7',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap', // 🔥 Allows button/details to wrap if the screen is too thin
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '15px',
  },
  cardTitle: {
    margin: 0,
    fontSize: '0.9rem',
    color: '#2D3748',
    minWidth: '200px', // Ensures title doesn't get squashed to 1 letter width
    flex: '2 1 0',
  },
  details: {
    margin: 0,
    color: '#718096',
    fontSize: '0.8rem',
    flex: '1 1 auto',
  },
  // ... Keep statusOpen, statusClosed, primaryButton, etc. as they were
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
    padding: '8px 20px',
    backgroundColor: '#3182ce',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  searchInput: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #cbd5e0',
    width: '100%',
    boxSizing: 'border-box',
  },
  select: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #cbd5e0',
    backgroundColor: 'white',
    width: '100%',
  },
  border: {
    backgroundColor: '#e2e8f0',
    padding: '15px',
    borderRadius: '15px',
  },
  sidebarButton: {
    backgroundColor: '#3182ce',
    color: 'white',
    padding: '16px',
    border: 'none',
    borderRadius: '15px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1.1rem'
  },
  label: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#4A5568',
  },
  header: {
    textAlign: 'center',
    marginBottom: '1rem'
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#2D3748',
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    backgroundColor: '#e2e8f0', // Matching your other filter borders
    padding: '15px',
    borderRadius: '15px',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  },
  filterLabel: {
    fontSize: '0.7rem',
    fontWeight: '500',
    color: '#000000',
  },
};

export default ConferencesPage;