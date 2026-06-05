import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { ref, get } from "firebase/database";
import profileImg from "../../assets/profile_icon.png";
import { getUserByEmail } from "./paperService";
import { getAuth } from "firebase/auth";

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString("en-NZ", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString("en-NZ", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });
}

const PaperDetailPage = () => {
  const { id } = useParams(); // paperId
  const navigate = useNavigate();

  const [paper, setPaper] = useState(null);
  const [conference, setConference] = useState(null);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPaper() {
      const snapshot = await get(ref(db, `paper/${id}`));

      if (!snapshot.exists()) {
        setPaper(null);
        setLoading(false);
        return;
      }

      const paperData = snapshot.val();
      setPaper({ id, ...paperData });

      // Load conference
      const confSnap = await get(ref(db, `conference/${paperData.conferenceId}`));
      if (confSnap.exists()) {
        setConference({ id: paperData.conferenceId, ...confSnap.val() });
      }

      // Load author
      if (paperData.createdBy) {
        const user = await getUserByEmail(paperData.createdBy);
        setAuthor(user);
      }

      setLoading(false);
    }

    loadPaper();
  }, [id]);

  if (loading) {
    return <div style={styles.pageWrapper}>Loading paper...</div>;
  }

  if (!paper) {
    return (
      <div style={styles.pageWrapper}>
        <h1 style={styles.mainTitle}>Paper Not Found</h1>
        <button onClick={() => navigate("/author")} style={styles.backButton}>
          ← Back to Author Panel
        </button>
      </div>
    );
  }

  return (
    <div style={styles.pageWrapper}>
      <header style={styles.headerSection}>
        <h1 style={styles.mainTitle}>{paper.title}</h1>

        <div style={styles.createdByContainer}>
          <p style={styles.createdBy}>
            Submitted by
            <img
              src={profileImg}
              alt="Author Icon"
              style={{
                width: "auto",
                height: "30px",
                borderRadius: "50%",
                margin: "0 8px"
              }}
            />
            <span style={{ fontWeight: "bold" }}>
              {author
                ? `${author.first_name} ${author.last_name}`
                : paper.createdBy}
            </span>
          </p>
        </div>

        <span
          style={
            paper.status === "submitted"
              ? styles.statusOpen
              : styles.statusClosed
          }
        >
          {paper.status.charAt(0).toUpperCase() + paper.status.slice(1)}
        </span>
      </header>

      <div style={styles.layoutGrid}>
        {/* MAIN CONTENT */}
        <main style={styles.mainContainer}>
          <section style={styles.section}>
            <h2 style={styles.subTitle}>Abstract</h2>
            <p style={styles.description}>{paper.abstract}</p>
          </section>

          {/* <div style={styles.actionRow}>
            <button
              style={styles.primaryButton}
              onClick={() => window.open(paper.fileUrl, "_blank")}
            >
              Download PDF
            </button>

            <button
              style={styles.secondaryButton}
              onClick={() => navigate(`/paper-update/${paper.id}`)}
            >
              Update Paper
            </button>
          </div> */}

            <section style={styles.section}>
                <h2 style={styles.subTitle}>Paper PDF</h2>

                <div style={styles.pdfContainer}>
                    <iframe
                    src={paper.fileUrl}
                    title="Paper PDF Viewer"
                    style={styles.pdfViewer}
                    />
                </div>
            </section>
        </main>

        {/* SIDEBAR */}
        <aside style={styles.sidebar}>
          <div style={styles.sidebarCard}>
            <h3 style={styles.sidebarTitle}>📄 Submission Details</h3>

            <div style={styles.dateItem}>
              <span style={styles.dateLabel}>Submitted</span>
              <span style={styles.dateValue}>
                {formatDate(paper.submittedAt)} at {formatTime(paper.submittedAt)}
              </span>
            </div>

            <div style={styles.infoRow}>
              <strong>Paper ID:</strong> {paper.id}
            </div>

            <div style={styles.infoRow}>
              <strong>Author Email:</strong> {paper.createdBy}
            </div>
          </div>

          {conference && (
            <div style={styles.sidebarCard}>
              <h3 style={styles.sidebarTitle}>🏛 Conference</h3>

              <div style={styles.infoRow}>
                <strong>Title:</strong> {conference.title}
              </div>

              <div style={styles.infoRow}>
                <strong>Venue:</strong> {conference.location}
              </div>

              <div style={styles.infoRow}>
                <strong>Start:</strong>{" "}
                {new Date(conference.startDate).toLocaleDateString("en-NZ")}
              </div>

              <button
                style={{ ...styles.primaryButton, marginTop: "1rem" }}
                onClick={() => navigate(`/conference-detail/${conference.id}`)}
              >
                View Conference
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    paddingLeft: '4rem 5%',
    paddingRight: '4rem 5%',
    paddingTop: '2rem',
    paddingBottom: '2rem',
    fontFamily: 'system-ui, sans-serif',
    color: '#2D3748',
    maxWidth: '1000px',
    margin: '0 auto',
  },

  headerSection: {
    marginBottom: '2rem',
    textAlign: 'center',
  },

  mainTitle: {
    fontSize: '3.5rem',
    fontWeight: '800',
    margin: '1rem 0',
    marginBottom: '2rem',
  },

  backButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#3182ce',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    alignItems: 'flex-start',
  },

  createdByContainer: {
    textAlign: 'center',
    width: '100%',
    marginBottom: '1rem',
    marginTop: '1rem',
  },

  createdBy: {
    fontSize: '0.8rem',
    color: '#718096',
  },

  statusOpen: {
    backgroundColor: '#C6F6D5',
    color: '#22543D',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: 'bold',
  },

  statusClosed: {
    backgroundColor: '#FED7D7',
    color: '#C53030',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: 'bold',
  },

  layoutGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 350px',
    gap: '40px',
    alignItems: 'start',
  },

  mainContainer: {
    backgroundColor: '#fff',
    borderRadius: '15px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    border: '1px solid #E2E8F0',
    padding: '2rem',
  },

  section: {
    marginBottom: '2rem',
    marginTop: '2rem',
  },

  subTitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
  },

  description: {
    lineHeight: '1.6',
    color: '#4A5568',
    fontSize: '1.1rem',
  },

  actionRow: {
    display: 'flex',
    gap: '15px',
    marginTop: '3rem',
  },

  primaryButton: {
    backgroundColor: '#3182ce',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },

  secondaryButton: {
    backgroundColor: '#EDF2F7',
    color: '#2D3748',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },

  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  sidebarCard: {
    backgroundColor: '#F7FAFC',
    padding: '24px',
    borderRadius: '12px',
    border: '1px solid #E2E8F0',
  },

  sidebarTitle: {
    fontSize: '1.1rem',
    margin: '0 0 16px 0',
    color: '#2D3748',
    borderBottom: '2px solid #E2E8F0',
    paddingBottom: '8px',
  },

  dateItem: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '12px',
    paddingLeft: '10px',
    borderLeft: '3px solid #3182ce',
  },

  dateLabel: {
    fontSize: '0.8rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#718096',
  },

  dateValue: {
    fontSize: '1rem',
    color: '#2D3748',
    fontWeight: '600',
  },

  infoRow: {
    fontSize: '0.95rem',
    marginBottom: '10px',
    color: '#4A5568',
  },

  '@media (max-width: 850px)': {
    layoutGrid: {
      gridTemplateColumns: '1fr',
    },
  },
  pdfContainer: {
    width: "100%",
    height: "600px",
    border: "1px solid #E2E8F0",
    borderRadius: "12px",
    overflow: "hidden",
    marginTop: "1rem",
    backgroundColor: "#F7FAFC",
    },

    pdfViewer: {
    width: "100%",
    height: "100%",
    border: "none",
    },

};


export default PaperDetailPage;
