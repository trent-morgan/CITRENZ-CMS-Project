import React, { useEffect, useState } from 'react';

const AdminPanel = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve the user data we saved during login
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // Redirect to login if no session exists
      window.location.href = '/';
    }
  }, []);

  if (!user) return <div style={styles.container}>Loading profile...</div>;

  return (
    <div style={styles.container}>
      <nav style={styles.sidebar}>
        <h2 style={styles.navTitle}>CITRENZ Admin</h2>
        <ul style={styles.navList}>
          <li style={styles.navItem}>Dashboard</li>
          <li style={styles.navItem}>Presentations</li>
          <li style={styles.navItem} onClick={() => {
            localStorage.removeItem('currentUser');
            window.location.href = '/';
          }}>Logout</li>
        </ul>
      </nav>

      <main style={styles.mainContent}>
        <header style={styles.header}>
          <h1>Welcome, {user.first_name} {user.last_name}</h1>
          <span style={styles.badge}>{user.role}</span>
        </header>

        <section style={styles.profileCard}>
          <h3>User Profile Data</h3>
          <hr />
          <div style={styles.infoGrid}>
            <p><strong>Organization:</strong> {user.organization}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>UUID:</strong> {user.id}</p>
          </div>
          <div style={styles.bioSection}>
            <strong>Bio:</strong>
            <p>{user.bio}</p>
          </div>
        </section>
      </main>
    </div>
  );
};

const styles = {
  container: { display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'sans-serif' },
  sidebar: { width: '250px', backgroundColor: '#1e3a8a', color: 'white', padding: '20px' },
  navTitle: { borderBottom: '1px solid #3b82f6', paddingBottom: '10px' },
  navList: { listStyle: 'none', padding: 0, marginTop: '20px' },
  navItem: { padding: '12px 0', cursor: 'pointer', borderBottom: '1px solid #1e40af' },
  mainContent: { flex: 1, padding: '40px' },
  header: { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' },
  badge: { backgroundColor: '#dcfce7', color: '#166534', padding: '4px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold' },
  profileCard: { backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' },
  infoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '20px' },
  bioSection: { marginTop: '20px', padding: '15px', backgroundColor: '#f1f5f9', borderRadius: '8px' }
};

export default AdminPanel;