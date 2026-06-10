import React, { useEffect, useState } from "react";
import { getMyConferences, getMyPapers, getMyRegistrations } from "./dashboardService";
import { useNavigate } from "react-router-dom";

const ReviewerPanel = () => {
  const [myConferences, setMyConferences] = useState([]);
  const [myPapers, setMyPapers] = useState([]);
  const [selectedConference, setSelectedConference] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const navigate = useNavigate();

  const handleCardClick = (role) => {
    if (role === "author") navigate("/author");
    if (role === "reviewer") navigate("/reviewer");
    if (role === "organizer") navigate("/organizer");
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
      <h1 style={styles.mainTitle}>Reviewer Panel</h1>

      {/* <h2 style={styles.sectionTitle}>My Reviews</h2> */}
      <p style={styles.emptyMessage}>Page under construction.</p>
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

emptyMessage: {
    color: "#6B7280",
    fontSize: "1.25rem",
    fontStyle: "italic",
    padding: "10px 0"
    },

};

export default ReviewerPanel;
