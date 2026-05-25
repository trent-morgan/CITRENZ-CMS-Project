import React, { useEffect, useState } from 'react';
import { getPendingConferences, approveConference, denyConference } from "./adminService";


const AdminPanel = () => {
  const [user, setUser] = useState(null);
  const [pendingConferences, setPendingConferences] = useState([]);
  const [selectedConference, setSelectedConference] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (!savedUser) {
      window.location.href = '/';
      return;
    }

    const parsed = JSON.parse(savedUser);
    setUser(parsed);

    async function loadPending() {
      const allConfs = await getPendingConferences();
      const pending = allConfs.filter(c => c.reviewStatus === "pending");
      setPendingConferences(pending);
    }

    loadPending();
  }, []);

  const openModal = (conf) => {
    setSelectedConference(conf);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedConference(null);
    setShowModal(false);
  };

  if (!user) return <div style={styles.container}>Loading profile...</div>;

  return (
    <div style={styles.container}>
      <nav style={styles.sidebar}>
        <h2 style={styles.navTitle}>CITRENZ Admin</h2>
        <ul style={styles.navList}>
          <li style={styles.navItem}>Dashboard</li>
          <li style={styles.navItem}>Presentations</li>
          <li
            style={styles.navItem}
            onClick={() => {
              localStorage.removeItem('currentUser');
              window.location.href = '/';
            }}
          >
            Logout
          </li>
        </ul>
      </nav>

      <main style={styles.mainContent}>
        <header style={styles.header}>
          <h1>Welcome, {user.first_name} {user.last_name}</h1>
        </header>

        {/* ⭐ Pending Conferences Section */}
        <section style={styles.pendingCard}>
          <h2>Pending Conferences</h2>
          <hr />

          {pendingConferences.length === 0 ? (
            <p style={{ color: "#6B7280", fontStyle: "italic" }}>
              No pending conferences.
            </p>
          ) : (
            <div style={styles.pendingList}>
              {pendingConferences.map(conf => (
                <div key={conf.id} style={styles.pendingItem}>
                  <div>
                    <h3 style={{ margin: 0 }}>{conf.title}</h3>
                    <p style={{ margin: 0, fontSize: "0.85rem", color: "#4B5563" }}>
                      {conf.location} • {conf.startDate}
                    </p>
                  </div>

                  <button
                    style={styles.reviewButton}
                    onClick={() => openModal(conf)}
                  >
                    Review
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ⭐ User Profile Section */}
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
      {showModal && selectedConference && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>{selectedConference.title}</h2>
            <p><strong>Description:</strong> {selectedConference.description}</p>
            <p><strong>Location:</strong> {selectedConference.location}</p>
            <p><strong>Status:</strong> {selectedConference.status}</p>
            <p><strong>Review Status:</strong> {selectedConference.reviewStatus}</p>
            <p><strong>Start:</strong> {selectedConference.startDate} {selectedConference.startTime}</p>
            <p><strong>End:</strong> {selectedConference.endDate} {selectedConference.endTime}</p>

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button
                style={styles.approveButton}
                onClick={async () => {
                  await approveConference(selectedConference.id);
                  closeModal();
                  window.location.reload();
                }}
              >
                Post
              </button>

              <button
                style={styles.denyButton}
                onClick={async () => {
                  await denyConference(selectedConference.id);
                  closeModal();
                  window.location.reload();
                }}
              >
                Deny
              </button>
            </div>

            <button style={styles.closeButton} onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
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

  // ⭐ Pending Conferences Styles
  pendingCard: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    marginBottom: '30px'
  },
  pendingList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginTop: '20px'
  },
  pendingItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    backgroundColor: '#f1f5f9',
    borderRadius: '8px'
  },
  reviewButton: {
    padding: '8px 16px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  modalContent: {
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "12px",
  width: "400px",
  maxWidth: "90%",
  maxHeight: "80vh",          // ⭐ FIXED HEIGHT LIMIT
  overflowY: "auto",          // ⭐ ENABLE SCROLLING
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  color: "#2D3748",
  zIndex: 10000
},

modalOverlay: {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999
},

  approveButton: {
  backgroundColor: "#2563eb",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold"
  },

  denyButton: {
    backgroundColor: "#dc2626",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  },


  // ⭐ Profile Styles
  profileCard: { backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' },
  infoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '20px' },
  bioSection: { marginTop: '20px', padding: '15px', backgroundColor: '#f1f5f9', borderRadius: '8px' }
};

export default AdminPanel;
