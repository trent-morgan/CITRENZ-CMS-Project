import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const MOCK_CONFERENCES = [
  { id: 1, title: 'CITRENZ Annual Conference 2026', location: 'Christchurch', date: 'Oct 12-14, 2026', status: 'Open' },
  { id: 2, title: 'North Island IT Educators Workshop', location: 'Auckland', date: 'Nov 05, 2026', status: 'Open' },
  { id: 3, title: 'South Island Computing Symposium', location: 'Dunedin', date: 'Dec 01, 2026', status: 'Open' },
  { id: 4, title: 'Future of Tech Education Summit', location: 'Wellington', date: 'Jan 20, 2027', status: 'Closed' },
  { id: 5, title: 'Cybersecurity in NZ Schools', location: 'Hamilton', date: 'Feb 15, 2027', status: 'Open' },
  { id: 6, title: 'AI Integration in Tertiary Ed', location: 'Nelson', date: 'March 10, 2027', status: 'Open' },
  { id: 7, title: 'Cloud Computing Workshop', location: 'Napier', date: 'April 05, 2027', status: 'Closed' },
];

const ConferencesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [showOnlyOpen, setShowOnlyOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('quick');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedLocation, showOnlyOpen, activeTab]);

  const handleViewDetail = (id) => {
    navigate(`/conference-detail/${id}`);
  };

  const filteredConferences = MOCK_CONFERENCES.filter(conf => {
    const matchesSearch = activeTab === 'quick' ? (
      conf.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conf.location.toLowerCase().includes(searchTerm.toLowerCase())
    ) : true;

    const matchesLocation = activeTab === 'advanced' && selectedLocation !== 'All Locations' ? (
      conf.location === selectedLocation
    ) : true;

    const matchesStatus = activeTab === 'advanced' && showOnlyOpen ? (
      conf.status === 'Open'
    ) : true;

    return matchesSearch && matchesLocation && matchesStatus;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentConferences = filteredConferences.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredConferences.length / itemsPerPage);

  const locations = ['All Locations', ...new Set(MOCK_CONFERENCES.map(c => c.location))];

  return (
    <div style={styles.pageWrapper}>
      <h1 style={styles.mainTitle}>Conferences</h1>

      <div style={styles.mainContainer}>
        <section style={styles.searchComponent}>
          <div style={styles.tabHeader}>
            <button 
              onClick={() => setActiveTab('quick')}
              style={activeTab === 'quick' ? styles.tabActive : styles.tabInactive}
            >
              Quick Search
            </button>
            <button 
              onClick={() => setActiveTab('advanced')}
              style={activeTab === 'advanced' ? styles.tabActive : styles.tabInactive}
            >
              Advanced Search
            </button>
          </div>

          <div style={styles.tabContent}>
            {activeTab === 'quick' && (
              <div style={styles.inputContainer}>
                <input 
                  type="text" 
                  placeholder="Search by name, topic, or location..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={styles.searchInputTabbed}
                />
              </div>
            )}

            {activeTab === 'advanced' && (
              <div style={styles.advancedFiltersGroup}>
                <div style={styles.filterGroupInline}>
                  <label style={styles.advancedLabel}>Filter by Location</label>
                  <select 
                    style={styles.advancedSelect}
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    {locations.map(loc => <option key={loc}>{loc}</option>)}
                  </select>
                </div>

                <div style={styles.filterGroupInline}>
                  <label style={styles.advancedLabel}>Conference Status</label>
                  <label style={styles.advancedCheckboxContainer}>
                    <input 
                      type="checkbox" 
                      checked={showOnlyOpen}
                      onChange={(e) => setShowOnlyOpen(e.target.checked)}
                      style={styles.checkbox}
                    />
                    <span style={styles.filterLabelTabbed}>Show Only Open Conferences</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </section>

        <main style={styles.contentArea}>
          <div style={styles.cardGrid}>
            {currentConferences.map(conf => (
              <div key={conf.id} style={styles.card}>
                <div style={styles.cardInfoGroup}>
                  <span style={conf.status === 'Open' ? styles.statusOpen : styles.statusClosed}>
                    {conf.status}
                  </span>
                  <h3 style={styles.cardTitle}>{conf.title}</h3>
                  <p style={styles.details}>{conf.location} • {conf.date}</p>
                </div>
                <button style={styles.primaryButton} 
                  onClick={() => handleViewDetail(conf.id)}>
                  View Details
                </button>
              </div>
            ))}
          </div>

          {filteredConferences.length === 0 && (
            <p style={styles.noResults}>No conferences found.</p>
          )}

          {totalPages > 1 && (
            <div style={styles.paginationContainer}>
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                style={currentPage === 1 ? styles.pageBtnDisabled : styles.pageBtn}
              >
                Previous
              </button>
              
              <span style={styles.pageInfo}>
                Page <strong>{currentPage}</strong> of {totalPages}
              </span>

              <button 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                style={currentPage === totalPages ? styles.pageBtnDisabled : styles.pageBtn}
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: { display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', padding: '1rem', maxWidth: '1200px', margin: '0 auto', width: '100%', boxSizing: 'border-box' },
  mainTitle: { textAlign: 'center', margin: '1rem 0 2rem 0', fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: '700', color: '#2D3748' },
  mainContainer: { display: 'flex', flexDirection: 'column', gap: '2rem' },
  
  searchComponent: { backgroundColor: '#133860', borderRadius: '15px', overflow: 'hidden' },
  tabHeader: { display: 'flex', width: '100%', borderBottom: '1px solid #a0aec0'},
  tabActive: { flex: 1, padding: '1.5rem 1rem', backgroundColor: 'transparent', color: '#1a202c', border: 'none', borderBottom: '4px solid #58a5cc', cursor: 'pointer', fontWeight: '700', fontSize: '1rem', color: '#FFFFFF' },
  tabInactive: { flex: 1, padding: '1.5rem 1rem', backgroundColor: 'transparent', color: '#4A5568', border: 'none', borderBottom: '4px solid transparent', cursor: 'pointer', fontWeight: '600', fontSize: '1rem',color: '#ffffffad'},
  tabContent: { padding: '2.5rem 2rem', height: '80px' },
  inputContainer: { display: 'flex', justifyContent: 'center' },
  searchInputTabbed: { padding: '1.2rem 1.5rem', borderRadius: '8px', border: '1px solid #a0aec0', width: '100%', maxWidth: '900px', backgroundColor: 'white', fontSize: '1rem' },
  
  advancedFiltersGroup: { display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' },
  filterGroupInline: { display: 'flex', flexDirection: 'column', gap: '10px', flex: '1 1 300px', maxWidth: '400px' },
  advancedLabel: { fontSize: '0.9rem', fontWeight: '600', color: '#ffffff', textTransform: 'uppercase' },
  advancedSelect: { padding: '1rem', borderRadius: '8px', border: '1px solid #a0aec0', backgroundColor: 'white' },
  advancedCheckboxContainer: { display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', height: '52px', backgroundColor: 'white', padding: '0 1rem', borderRadius: '8px', border: '1px solid #a0aec0' },
  checkbox: { width: '18px', height: '18px' },
  filterLabelTabbed: { fontSize: '0.95rem', color: '#2D3748' },

  contentArea: {
    backgroundColor: '#f0f0f0',
    borderRadius: '15px',
    width: '100%',
    padding: '20px 0', 
  },
    cardGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    padding: '0 20px',
    boxSizing: 'border-box',
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '15px',
  },
  cardInfoGroup: { display: 'flex', alignItems: 'center', gap: '20px', flex: '1', flexWrap: 'wrap' },
  cardTitle: { margin: 0, fontSize: '1.2rem', color: '#2D3748', flex: '2 1 250px' },
  details: { margin: 0, color: '#718096', fontSize: '0.85rem' },
  statusOpen: { backgroundColor: '#C6F6D5', color: '#22543D', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' },
  statusClosed: { backgroundColor: '#FED7D7', color: '#822727', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' },
  primaryButton: { padding: '10px 24px', backgroundColor: '#3182ce', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' },
  
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    padding: '30px 20px',
  },
  pageBtn: {
    padding: '8px 16px',
    backgroundColor: '#3182ce',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  pageBtnDisabled: {
    padding: '8px 16px',
    backgroundColor: '#cbd5e0',
    color: '#718096',
    border: 'none',
    borderRadius: '6px',
    cursor: 'not-allowed',
  },
  pageInfo: {
    fontSize: '0.9rem',
    color: '#4A5568',
  },
  noResults: { textAlign: 'center', padding: '40px', color: '#718096' }
};

export default ConferencesPage;