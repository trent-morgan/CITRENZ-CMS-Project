import React, { useEffect, useState } from "react";
import { getCurrentUser } from "./profileService";
import { useNavigate } from "react-router-dom";
import profileImg from '../../assets/profile_icon.png';


const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const profile = getCurrentUser();
    if (!profile) {
      navigate("/login");
      return;
    }
    setUser(profile);
  }, [navigate]);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div style={styles.page}>

        <div style={styles.header}>
        <img 
            src={profileImg}
            alt="Profile Icon" 
            style={styles.profileImage}
        />
        <h1 style={styles.title}>{user.first_name} {user.last_name}</h1>
        </div>

        <div style={styles.container}>

        <div style={styles.detailRow}>
            <span style={styles.label}>Email address:</span>
            <span style={styles.value}>{user.email}</span>
        </div>

        <div style={styles.detailRow}>
            <span style={styles.label}>Organization:</span>
            <span style={styles.value}>{user.organization}</span>
        </div>

        <div style={styles.detailRow}>
            <span style={styles.label}>Role:</span>
            <span style={styles.value}>{user.role}</span>
        </div>

        <div style={styles.detailRow}>
            <span style={styles.label}>Bio:</span>
            <span style={styles.value}>{user.bio}</span>
        </div>

        </div>
    </div>
    )
};

const styles = {
    profileImage: {
        height: '150px',             
        width: 'auto',
        display: 'block',
        backgroundColor: 'white',
        padding: '8px 15px',       
        borderRadius: '50px',       
    },
    header: {
        display: "flex",
        alignItems: "center",
        gap: "15px",

    },
    detailRow: {
        display: "flex",
        flexDirection: "column",   
        padding: "12px 0",
        borderBottom: "1px solid #eee",
        alignItems: "flex-start", 
    },

    label: {
        fontWeight: "700",         
        fontSize: "0.9rem",        
        color: "#333",
        marginBottom: "4px",       
    },
    value: {
        fontSize: "0.85rem",
        color: "#555",
        lineHeight: "1.4",
    },

    headerIcon: {
        width: "50px",
        height: "50px",
    },

    title: {
        margin: 0,
        margin: '1rem 0 2rem 0', 
        fontSize: '2rem', 
        fontWeight: '900', 
        color: '#2D3748' 
    },

    container: {
        background: "#fff",
        border: "1px solid #d1d5db",
        borderRadius: "12px",
        padding: "30px",
    },

    page: {
        padding: '3rem',
    },
};

export default Profile;
