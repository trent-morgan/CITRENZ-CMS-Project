import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { ref, get, set } from "firebase/database";
import profileImg from '../../assets/profile_icon.png';
import { getUserByEmail } from "./conferenceService";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function formatTime(time) {
  return new Date(`1970-01-01T${time}:00`).toLocaleTimeString("en-NZ", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });
}

const ConferenceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [conference, setConference] = useState(null);
  const [loading, setLoading] = useState(true);
  const [creator, setCreator] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);



  useEffect(() => {
    async function loadConference() {
      const snapshot = await get(ref(db, `conference/${id}`));

      if (snapshot.exists()) {
        setConference({ id, ...snapshot.val() });
      } else {
        setConference(null);
      }

      setLoading(false);
    }

    loadConference();
  }, [id]);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      // Wait until Firebase confirms the user is logged in
      if (!firebaseUser) return;

      // Wait until the conference is loaded
      if (!conference?.createdBy) return;

      try {
        const user = await getUserByEmail(conference.createdBy);
        console.log("FOUND USER:", user);
        setCreator(user);
      } catch (err) {
        console.error("ERROR LOADING CREATOR:", err);
      }
    });

    return () => unsubscribe();
  }, [conference]);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) return;

    async function checkRegistration() {
      const regRef = ref(db, `registrations/${id}/${user.uid}`);
      const snapshot = await get(regRef);

      if (snapshot.exists()) {
        setIsRegistered(true);
      }
    }

    checkRegistration();
  }, [id]);





  if (loading) {
    return <div style={styles.pageWrapper}>Loading conference...</div>;
  }

  if (!conference) {
    return (
      <div style={styles.pageWrapper}>
        <h1 style={styles.mainTitle}>Conference Not Found</h1>
        <button onClick={() => navigate('/conferences')} style={styles.backButton}>
          ← Back to Conferences
        </button>
      </div>
    );
  }

 const handleRegister = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in to register.");
      return;
    }

    try {
      const regRef = ref(db, `registrations/${id}/${user.uid}`);

      // Check if already registered
      const regCheck = await get(regRef);
      if (regCheck.exists()) {
        alert("You are already registered for this conference.");
        setIsRegistered(true);
        return;
      }

      // Register
      await set(regRef, {
        userId: user.uid,
        email: user.email,
        registeredAt: Date.now()
      });

      setIsRegistered(true);
      alert("You are now registered for this conference!");
    } catch (err) {
      console.error("REGISTRATION ERROR:", err);
      alert("Failed to register.");
    }
  };



  return (
    <div style={styles.pageWrapper}>
      {/* <div style={styles.backButtonContainer}>
        <button onClick={() => navigate('/conferences')} style={styles.backButton}>
          ← Back to List
        </button>
      </div> */}

      <header style={styles.headerSection}>
        <h1 style={styles.mainTitle}>{conference.title}</h1>
          <div style={styles.createdByContainer}>
            <p style={styles.createdBy}>Created by
              <img 
                src={profileImg}
                alt="Creator Icon" 
                style={{ width: 'auto', height: '30px', borderRadius: '50%', margin: '0 8px' }}
              /> 
              <span style={{ fontStyle: 'normal', fontWeight: 'bold' }}>{creator ? `${creator.first_name} ${creator.last_name}` : conference.createdBy}</span>
            </p>
          </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', marginTop: '8px' }}>
          <span style={conference.status === 'Open' ? styles.statusOpen : styles.statusClosed}>
          {conference.status}
        </span>
        
        </div>

      </header>

      <div style={styles.layoutGrid}>
        <main style={styles.mainContent}>
          
          <section style={styles.section}>
            <h2 style={styles.subTitle}>About this Conference</h2>
            <p style={styles.description}>{conference.description}</p>
          </section>

          <div style={styles.actionRow}>
            <button
              onClick={() => navigate('../paper-submission/' + conference.id)}
              style={styles.primaryButton}
            >
              Submit a Paper
            </button>
            <button
              onClick={handleRegister}
              style={styles.secondaryButton}
              disabled={isRegistered}
            >
              {isRegistered ? "Registered ✓" : "Register to Attend"}
            </button>
          </div>
        </main>

        <aside style={styles.sidebar}>
          
          <div style={styles.sidebarCard}>
            <h3 style={styles.sidebarTitle}>📅 Important Dates</h3>
            <div style={styles.dateItem}>
                <span style={styles.dateLabel}>Start Date</span>
                <span style={styles.dateValue}>{new Date(conference.startDate).toLocaleDateString("en-NZ", {
                year: "numeric",
                month: "long",
                day: "numeric"
              })}</span>
            </div>
            <div style={styles.dateItem}>
                <span style={styles.dateLabel}>Start Time</span>
                <span style={styles.dateValue}>{formatTime(conference.startTime)}</span>
            </div>
            {conference.importantDates?.map((item, index) => (
              <div key={index} style={styles.dateItem}>
                <span style={styles.dateLabel}>{item.label}</span>
                <span style={styles.dateValue}>{item.date}</span>
              </div>
            ))}
          </div>

          <div style={styles.sidebarCard}>
            <h3 style={styles.sidebarTitle}>ℹ️ Key Information</h3>

            <div style={styles.infoRow}>
              <strong>Theme:</strong> {conference.keyInfo?.themes}
            </div>

            <div style={styles.infoRow}>
              <strong>Venue:</strong> {conference.location}
            </div>

            <div style={styles.infoRow}>
              <strong>Contact:</strong>
              <span style={{ color: "#3182ce" }}>
                {conference.keyInfo?.contact}
              </span>
            </div>
          </div>
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
  backButtonContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    paddingBottom: '1rem',
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
  mainContainer: {
    backgroundColor: '#fff',
    borderRadius: '15px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    border: '1px solid #E2E8F0',
    padding: '2rem',
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
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '2rem',
    borderBottom: '1px solid #E2E8F0',
    paddingBottom: '2rem',
  },
  label: {
    fontSize: '0.85rem',
    color: '#718096',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: '1.2rem',
    margin: '5px 0 0 0',
    fontWeight: '600',
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
  
  layoutGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 350px', 
    gap: '40px',
    alignItems: 'start',
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
  description: {
    lineHeight: '1.6',
    color: '#4A5568',
    fontSize: '0.9rem',
  },

  

  '@media (max-width: 850px)': {
    layoutGrid: {
      gridTemplateColumns: '1fr',
    },
  },
};

export default ConferenceDetailPage;