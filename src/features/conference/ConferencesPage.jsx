import React from 'react';
import { useConferences } from './useConferences';

const ConferencesPage = () => {
  const { searchTerm, setSearchTerm, conferences, loading } = useConferences();

  if (loading) {
    return (
      <div style={{ ...styles.wrapper, textAlign: 'center', padding: '100px' }}>
        <h2 style={{ color: '#718096' }}>Loading Conferences...</h2>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <header style={styles.heroSection}>
        <div style={styles.content}>
          <h1 style={styles.title}>Available Conferences</h1>
          <p style={styles.subtitle}>Explore and join upcoming CITRENZ events across New Zealand.</p>
          
          <input 
            type="text" 
            placeholder="Search conferences..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>
      </header>

      <section style={styles.actionSection}>
        <div style={styles.content}>
          <div style={styles.cardGrid}>
            {conferences.map(conf => (
              <div key={conf.id} style={styles.card}>
                <span style={conf.status === 'Open' ? styles.statusOpen : styles.statusClosed}>
                  {conf.status}
                </span>
                <h3 style={{ marginTop: '15px', color: '#2D3748' }}>{conf.title}</h3>
                <p style={styles.details}>{conf.location} • {conf.date}</p>
                <button style={styles.primaryButton}>View Details</button>
              </div>
            ))}
          </div>
          
          {conferences.length === 0 && (
            <p style={{ textAlign: 'center', color: '#718096', marginTop: '40px' }}>
              No conferences found matching "{searchTerm}"
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

const styles = { /* styles here */ };

export default ConferencesPage;