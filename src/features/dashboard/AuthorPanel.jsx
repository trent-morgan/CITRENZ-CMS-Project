import React, { useEffect, useState } from "react";
import { getMyConferences, getMyPapers, getMyRegistrations } from "./dashboardService";
import { useNavigate } from "react-router-dom";

const AuthorPanel = () => {
  const [myConferences, setMyConferences] = useState([]);
  const [myPapers, setMyPapers] = useState([]);
  const [selectedConference, setSelectedConference] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const navigate = useNavigate();

    const handleDeletePaper = async (paperId) => {
    if (!window.confirm("Are you sure you want to delete this paper?")) return;

    // TODO: call your delete service
    // await deletePaper(paperId);

    setMyPapers(prev => prev.filter(p => p.id !== paperId));
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
      <h1 style={styles.mainTitle}>Author Panel</h1>

        {/* ===========================
            MY SUBMITTED PAPERS TABLE
        =========================== */}
        <h2 style={styles.sectionTitle}>My Submitted Papers</h2>

        {myPapers.length === 0 ? (
        <p style={styles.emptyMessage}>You have not submitted any papers yet.</p>
        ) : (
        <div style={styles.table}>
            <div style={styles.tableHeader}>
                <span style={styles.colTitle}>Title</span>
                <span style={styles.colConf}>Conference</span>
                <span style={styles.colDate}>Submission Date</span>
                <span style={styles.colStatus}>Status</span>
                <span style={styles.colAction}>Actions</span>
            </div>

            {myPapers.map(paper => (
            <div
                key={paper.id}
                style={{
                ...styles.tableRow,
                ...(hoveredRow === paper.id ? styles.tableRowHover : {})
                }}
                onMouseEnter={() => setHoveredRow(paper.id)}
                onMouseLeave={() => setHoveredRow(null)}
            >
                <span style={styles.colTitle}>{paper.title}</span>
                <span style={styles.colConf}>{paper.conferenceTitle}</span>
                <span style={styles.colDate}>{paper.submissionDate}</span>

                <span style={styles.colStatus}>
                {paper.status.charAt(0).toUpperCase() + paper.status.slice(1)}
                </span>
                <span style={styles.colAction}>
                  <div style={styles.actionButtons}>
                <button
                    style={styles.tableButton}
                    onClick={() => navigate(`/paper-detail/${paper.id}`)}
                >
                    View
                </button>

                <button
                    style={styles.tableButton2}
                    onClick={() => navigate(`/paper-detail/${paper.id}/edit`)}
                >
                    Update
                </button>

                <button
                    style={styles.tableButton2}
                    onClick={() => handleDeletePaper(paper.id)}
                >
                    Delete
                </button>
                </div>  
                </span>
                
            </div>
            ))}
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
    fontSize: "1.2rem",
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
  borderRadius: "10px",
  overflow: "hidden",
  border: "1px solid #E2E8F0",
  backgroundColor: "white",
  marginBottom: "2rem"
},

tableHeader: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
    backgroundColor: "#c0d7f7",
    padding: "14px 20px",
    fontWeight: "700",
    fontSize: "0.9rem",
    color: "#000000",
    borderBottom: "1px solid #E2E8F0"
},

tableRow: {
  display: "grid",
gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
  padding: "14px 20px",
  alignItems: "center",
  borderBottom: "1px solid #EDF2F7",
  fontSize: "0.9rem",
  color: "#4a5568",
  transition: "background 0.2s ease"
},

tableRowHover: {
  backgroundColor: "#F7FAFC"
},

colTitle: { textAlign: "left" },
colDate: { textAlign: "left" },
colStatus: { textAlign: "left" },
colAction: { textAlign: "left" },

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

tableButton2: {
  padding: "6px 12px",
  backgroundColor: "#efefef",
  color: "black",
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
    justifyContent: "center",
    gap: "20px",
    marginBottom: "3rem"
  },

  authorCard: {
    backgroundColor: "#6281ab",
    borderRadius: "10px",
    padding: "20px",
    color: "white",
    width: "250px",
    textAlign: "center"
  },
  reviewerCard: {
    backgroundColor: "#ab6262",
    borderRadius: "10px",
    padding: "20px",
    color: "white",
    width: "250px",
    textAlign: "center"
  },
  organizerCard: {
    backgroundColor: "#69ab62",
    borderRadius: "10px",
    padding: "20px",
    color: "white",
    width: "250px",
    textAlign: "center"
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
colConf: { width: "20%" },
actionButtons: {
  display: "flex",
  gap: "8px"
},
viewButton: {
  padding: "6px 10px",
  background: "#3B82F6",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
},
updateButton: {
  padding: "6px 10px",
  background: "#F59E0B",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
},
deleteButton: {
  padding: "6px 10px",
  background: "#EF4444",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
},
colTitle: {
  flex: "2",
  minWidth: "180px"
},
colConf: {
  flex: "2",
  minWidth: "180px"
},
colDate: {
  flex: "1",
  minWidth: "140px"
},
colStatus: {
  flex: "1",
  minWidth: "120px"
},
colAction: {
  flex: "1",
  minWidth: "160px",
  display: "flex",
  gap: "8px"
}



};

export default AuthorPanel;
