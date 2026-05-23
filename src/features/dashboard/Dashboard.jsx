import React, { useEffect, useState } from "react";
import { getMyConferences, getMyPapers } from "./dashboardService";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [myConferences, setMyConferences] = useState([]);
  const [myPapers, setMyPapers] = useState([]);
  const navigate = useNavigate();

    const [selectedConference, setSelectedConference] = useState(null);
    const [showModal, setShowModal] = useState(false);

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
            const confs = await getMyConferences(user.email);
            const papers = await getMyPapers(user.email);

            setMyConferences(confs);
            setMyPapers(papers);
        }

        loadData();
    }, []);

    // ⭐ FIX: compute upcoming/past here
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

      <div style={styles.mainContainer}>

        {/* ⭐ My Conferences */}
        <section style={styles.sectionWrapper}>
          <section style={styles.sectionWrapper}>
  <h2 style={styles.sectionTitle}>Upcoming Conferences</h2>

  {upcomingConferences.length === 0 ? (
    <p style={styles.emptyMessage}>No upcoming conferences.</p>
  ) : (
    <div style={styles.widgetRow}>
      {upcomingConferences.map(conf => (
        <div key={conf.id} style={styles.widgetCard}>
          <h2 style={styles.widgetTitle}>{conf.title}</h2>
          <p style={{ fontSize: "0.8rem", color: "#6B7280" }}>{conf.startDate}</p>

          <span style={
            conf.reviewStatus === "pending"
              ? styles.statusPending
              : conf.reviewStatus === "denied"
              ? styles.statusDenied
              : styles.statusConfirmed
          }>
            {conf.reviewStatus.charAt(0).toUpperCase() + conf.reviewStatus.slice(1)}
          </span>

          <button
            style={styles.viewButton}
            onClick={() => {
              if (conf.reviewStatus === "confirmed") {
                navigate(`/conference-detail/${conf.id}`);
              } else {
                openModal(conf);
              }
            }}
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  )}
</section>

<section style={styles.sectionWrapper}>
  <h2 style={styles.sectionTitle}>Past Conferences</h2>

  {pastConferences.length === 0 ? (
    <p style={styles.emptyMessage}>No past conferences.</p>
  ) : (
    <div style={styles.widgetRow}>
      {pastConferences.map(conf => (
        <div key={conf.id} style={styles.widgetCard}>
          <h2 style={styles.widgetTitle}>{conf.title}</h2>
          <p style={{ fontSize: "0.8rem", color: "#6B7280" }}>{conf.startDate}</p>

          <span style={
            conf.reviewStatus === "pending"
              ? styles.statusPending
              : conf.reviewStatus === "denied"
              ? styles.statusDenied
              : styles.statusConfirmed
          }>
            {conf.reviewStatus.charAt(0).toUpperCase() + conf.reviewStatus.slice(1)}
          </span>

          <button
            style={styles.viewButton}
            onClick={() => {
              if (conf.reviewStatus === "confirmed") {
                navigate(`/conference-detail/${conf.id}`);
              } else {
                openModal(conf);
              }
            }}
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  )}
</section>

        </section>

        {/* ⭐ My Papers */}
        <section style={styles.sectionWrapper}>
          <h2 style={styles.sectionTitle}>My Papers</h2>

          {myPapers.length === 0 ? (
            <p style={styles.emptyMessage}>
              No papers found. Submit a paper to a conference to see it listed here.
            </p>
          ) : (
            <div style={styles.widgetRow}>
              {myPapers.map(paper => (
                <div key={paper.id} style={styles.widgetCard}>
                  <h3 style={styles.widgetTitle}>{paper.title}</h3>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
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
    color: "#2D3748"
    },

emptyMessage: {
    color: "#6B7280",
    fontSize: "1rem",
    fontStyle: "italic",
    padding: "10px 0"
    },

widgetRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px"
    },

widgetCard: {
    backgroundColor: "white",
    color: "#2D3748",
    padding: "20px",
    borderRadius: "12px",
    width: "250px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    },

widgetTitle: {
    margin: 0,
    fontSize: "1.1rem",
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
}

};

export default Dashboard;
