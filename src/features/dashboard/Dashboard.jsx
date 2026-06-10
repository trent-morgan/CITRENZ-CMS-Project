import React, { useEffect, useState } from "react";
import { getMyConferences, getMyPapers, getMyRegistrations } from "./dashboardService";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [myConferences, setMyConferences] = useState([]);
  const [myPapers, setMyPapers] = useState([]);
  const [selectedConference, setSelectedConference] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const navigate = useNavigate();
  React.useEffect(() => {
    document.body.style.backgroundColor = "white";
    document.documentElement.style.backgroundColor = "white";
  }, []);

  const handleCardClick = (role) => {
    if (role === "author") navigate("/author-panel");
    if (role === "reviewer") navigate("/reviewer-panel");
    if (role === "organizer") navigate("/organizer-panel");
  };

  const openModal = (conf) => {
    setSelectedConference(conf);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedConference(null);
    setShowModal(false);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) return;

    async function loadData() {
      const created = await getMyConferences(user.email);
      const papers = await getMyPapers(user.email);
      const regs = await getMyRegistrations(user.id);

      const merged = [
        ...created.map(c => ({ ...c, _type: "created" })),
        ...regs.map(c => ({ ...c, _type: "registered" }))
      ];

      setMyConferences(merged);
      setMyPapers(papers);
    }

    loadData();
  }, []);

  // Compute upcoming/past
  const today = new Date();

  const upcomingConferences = myConferences.filter(conf => {
    const start = new Date(conf.startDate);
    return start >= today;
  });

  const pastConferences = myConferences.filter(conf => {
    const start = new Date(conf.startDate);
    return start < today;
  });

  return (
    <div style={styles.pageWrapper}>
      <h1 style={styles.mainTitle}>Dashboard</h1>

      <div style={styles.rolePanel}>

        {/* AUTHOR */}
        <div
          style={{
            ...styles.authorCard,
            ...(hoveredCard === "author" ? styles.cardHover : {})
          }}
          onMouseEnter={() => setHoveredCard("author")}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => handleCardClick("author")}
        >
          <h2 style={styles.roleTitle}>Author Panel</h2>
          <p style={styles.roleDesc}>Manage your papers and submissions.</p>
        </div>

        {/* REVIEWER */}
        <div
          style={{
            ...styles.reviewerCard,
            ...(hoveredCard === "reviewer" ? styles.cardHover : {})
          }}
          onMouseEnter={() => setHoveredCard("reviewer")}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => handleCardClick("reviewer")}
        >
          <h2 style={styles.roleTitle}>Reviewer Panel</h2>
          <p style={styles.roleDesc}>Review papers and provide feedback.</p>
        </div>

        {/* ORGANIZER */}
        <div
          style={{
            ...styles.organizerCard,
            ...(hoveredCard === "organizer" ? styles.cardHover : {})
          }}
          onMouseEnter={() => setHoveredCard("organizer")}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => handleCardClick("organizer")}
        >
          <h2 style={styles.roleTitle}>Organizer Panel</h2>
          <p style={styles.roleDesc}>Manage conferences and submissions.</p>
        </div>

      </div>

      {/* UPCOMING CONFERENCES */}
      <h2 style={styles.sectionTitle}>Upcoming Conferences</h2>

      {upcomingConferences.length === 0 ? (
        <p style={styles.emptyMessage}>No upcoming conferences.</p>
      ) : (
        <div style={styles.table}>
          <div style={styles.tableHeader}>
            <span style={styles.colTitle}>Title</span>
            <span style={styles.colDate}>Start Date</span>
            <span style={styles.colStatus}>Status</span>
            <span style={styles.colAction}>Action</span>
          </div>

          {upcomingConferences.map(conf => (
            <div
              key={conf.id}
              style={{
                ...styles.tableRow,
                ...(hoveredRow === conf.id ? styles.tableRowHover : {})
              }}
              onMouseEnter={() => setHoveredRow(conf.id)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <span style={styles.colTitle}>{conf.title}</span>
              <span style={styles.colDate}>{conf.startDate}</span>

              <span style={styles.colStatus}>
                {conf._type === "registered"
                  ? "Registered"
                  : conf.reviewStatus.charAt(0).toUpperCase() + conf.reviewStatus.slice(1)}
              </span>

              <button
                style={styles.tableButton}
                onClick={() => {
                  if (conf.reviewStatus === "confirmed") {
                    navigate(`/conference-detail/${conf.id}`);
                  } else {
                    openModal(conf);
                  }
                }}
              >
                View
              </button>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
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
  pageWrapper: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    fontFamily: "system-ui, sans-serif",
    padding: "1rem",
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
    boxSizing: "border-box"
  },

  mainTitle: {
    textAlign: "center",
    margin: "1rem 0 2rem 0",
    fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
    fontWeight: "700",
    color: "#2D3748"
  },

  mainContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "3rem"
  },

  sectionWrapper: {
    backgroundColor: '#f0f0f0',
    padding: "2rem",
    borderRadius: "15px",
    color: "white"
  },

sectionTitle: {
    marginBottom: "1.5rem",
    fontSize: "1.6rem",
    fontWeight: "700",
    color: "#2D3748",
    textAlign: "left",
    },

emptyMessage: {
    color: "#6B7280",
    fontSize: "1rem",
    fontStyle: "italic",
    padding: "10px 0"
    },

table: {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  overflowX: "auto",   
  borderRadius: "10px",
  border: "1px solid #E2E8F0",
  backgroundColor: "white",
  marginBottom: "2rem"
},


tableHeader: {
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr 1fr",
  backgroundColor: "#F7FAFC",
  padding: "14px 20px",
  fontWeight: "700",
  fontSize: "0.9rem",
  color: "#2D3748",
  borderBottom: "1px solid #E2E8F0",

  "@media (max-width: 700px)": {
    display: "none"
  }
},

tableRow: {
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr 1fr",
  padding: "14px 20px",
  alignItems: "center",
  borderBottom: "1px solid #EDF2F7",
  fontSize: "0.9rem",
  color: "#4A5568",
  transition: "background 0.2s ease",

  "@media (max-width: 700px)": {
    gridTemplateColumns: "1fr",
    rowGap: "8px",
    padding: "16px",
    border: "1px solid #E2E8F0",
    borderRadius: "10px",
    marginBottom: "12px"
  }
},

mobileLabel: {
  display: "none",
  fontWeight: "600",
  color: "#2D3748",
  marginRight: "6px",

  "@media (max-width: 700px)": {
    display: "inline-block"
  }
},

tableRowHover: {
  backgroundColor: "#F7FAFC"
},

colTitle: { textAlign: "left", whiteSpace: "normal", wordBreak: "break-word", minWidth: 0 },
colDate: { textAlign: "left", whiteSpace: "normal", wordBreak: "break-word", minWidth: 0 },
colStatus: { textAlign: "left", whiteSpace: "normal", wordBreak: "break-word", minWidth: 0 },
colAction: { textAlign: "left", whiteSpace: "normal", wordBreak: "break-word", minWidth: 0 },

tableButton: {
  padding: "6px 12px",
  backgroundColor: "#133860",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "0.85rem",
  fontWeight: "600"
},


statusPending: {
    marginTop: "10px",
    display: "inline-block",
    backgroundColor: "#f6e7c6",
    color: "#2D3748",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "0.75rem",
    fontWeight: "bold"
    },

statusDenied: {
    marginTop: "10px",
    display: "inline-block",
    backgroundColor: "#FED7D7",
    color: "#2D3748",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "0.75rem",
    fontWeight: "bold"
    },

statusConfirmed: {
    marginTop: "10px",
    display: "inline-block",
    backgroundColor: "#dbfed7",
    color: "#2D3748",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "0.75rem",
    fontWeight: "bold"
    },
statusRegistered: {
    marginTop: "10px",
    display: "inline-block",
    backgroundColor: "#d7dbfe",
    color: "#2D3748",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "0.75rem",
    fontWeight: "bold"
    },
viewButton: {
  marginTop: "12px",
  backgroundColor: "#3182ce",
  color: "white",
  padding: "8px 16px",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  cursor: "pointer",
  width: "100%"
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

modalContent: {
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "12px",
  width: "400px",
  maxWidth: "90%",
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  color: "#2D3748"
},

modalTitle: {
  marginBottom: "15px",
  fontSize: "1.4rem",
  fontWeight: "700"
},

closeButton: {
    backgroundColor: "#EDF2F7",
    color: "#2D3748",
    padding: "12px 24px",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "20px",
},
rolePanel: {
  display: "flex",
  flexDirection: "row",
  gap: "20px",
  marginBottom: "3rem",
  justifyContent: "center",
  flexWrap: "wrap",

  "@media (max-width: 700px)": {
    flexDirection: "column",
    alignItems: "stretch"
  }
},


  authorCard: {
    backgroundColor: "#6281ab",
    borderRadius: "10px",
    padding: "20px",
    color: "white",
    width: "100%",
    maxWidth: "260px",
    textAlign: "center",
    cursor: "pointer"
  },
  reviewerCard: {
    backgroundColor: "#ab9862",
    borderRadius: "10px",
    padding: "20px",
    color: "white",
    width: "100%",
    maxWidth: "260px",
    textAlign: "center",
    cursor: "pointer"
  },
  organizerCard: {
    backgroundColor: "#69ab62",
    borderRadius: "10px",
    padding: "20px",
    color: "white",
    width: "100%",
    maxWidth: "260px",
    textAlign: "center",
    cursor: "pointer"
  },

  roleTitle: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "white",
  },
cardHover: {
  transform: "translateY(-4px)",
  boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
},

};

export default Dashboard;
