import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Contact = () => {

  return (
    <div style={styles.pageWrapper}>
        {/* 1. Centered Header at the very top */}
        <h1 style={styles.mainTitle}>Contact Us</h1>
        <p className="info">Have questions about CITRENZ CMS? Reach out and send us a message!</p>

        <div style={styles.mainContainer}>
            {/* RIGHT SIDE: Content (80%) */}

            <main style={styles.contentArea}>
                <label style={styles.label}>
                    Email Address <span style={styles.required}>*</span>
                </label>
                <input 
                type="text" 
                style={styles.detailInput}
                />

                <label style={styles.label}>
                    Email Address (Retyped) <span style={styles.required}>*</span>
                </label>
                <input 
                type="text" 
                style={styles.detailInput}
                />

                <label style={styles.label}>
                    Name <span style={styles.required}>*</span>
                </label>
                <input 
                type="text" 
                style={styles.detailInput}
                />

                <hr style={styles.separator} />

                <label style={styles.label}>
                    Subject <span style={styles.required}>*</span>
                </label>
                <input 
                type="text" 
                style={styles.detailInput}
                />

                <label style={styles.label}>
                    Message <span style={styles.required}>*</span>
                </label>
                <textarea 
                style={styles.messageInput} 
                rows="5" 
                />
            </main>

            <aside style={styles.sidebar}>
                <h2>Contact Details</h2>
                <div style={styles.contactDetail}>
                    <p style={styles.contactLabel}>Phone: </p>
                    <a href="" style={styles.link}>
                        +64 012 3456 789
                    </a>
                </div>
                <div style={styles.contactDetail}>
                    <p style={styles.contactLabel}>Free Call: </p>
                    <a href="" style={styles.link}>
                        +64 012 3456 789
                    </a>
                </div>
                <div style={styles.contactDetail}>
                    <p style={styles.contactLabel}>Email:</p>
                    <a href="" style={styles.link}>
                        contact@citrenz.org.nz
                    </a>
                </div>

                <h2>Postal Details</h2>
                <div style={styles.contactDetail}>
                    <a 
                        href="https://www.google.com/maps/search/?api=1&query=123+Example+Street+Christchurch+New+Zealand" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={styles.link}
                    >
                        123 Example Street, Christchurch
                    </a>
                </div>

            </aside>

        </div>
    </div>
  );
};

const styles = {
    pageWrapper: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        fontFamily: 'system-ui, sans-serif',
        padding: '1rem 1rem', // Reduced side padding for mobile
        maxWidth: '1200px',   // 🔥 Prevents drifting too far apart on big screens
        margin: '0 auto',      // 🔥 Centers the whole app on the screen
        width: '100%',
        boxSizing: 'border-box',
    },
    mainTitle: {
        textAlign: 'center',
        margin: '1rem 0',
        fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', // Scales font size based on screen width
        fontWeight: '700',
        color: '#2D3748',
    },
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap', // 🔥 Allows sidebar to drop below content on very small screens
        gap: '2rem',      // Adds consistent spacing between sidebar and content
        marginTop: '1rem',
    },
    sidebar: {
        flex: '1 1 250px', 
        maxWidth: '300px', 
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'flex-start', // 🔥 Change from 'center' to 'flex-start'
        textAlign: 'left',        // 🔥 Change from 'center' to 'left'
        paddingLeft: '30px',
    },
    contactDetail: {
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        alignItems: 'center',
    },
    contactLabel: {
        fontStyle: 'italic',
        color: '#3a3a3a'
    },
    link: {
        color: '#2E92C4',          // Matches your label color
        textDecoration: 'none',    // Removes the underline
        fontWeight: '500',
    },
// Optional: If you want it to change color when hovered (requires CSS or state)
    contentArea: {
        backgroundColor: '#f0f0f0',
        paddingLeft: '40px',
        paddingRight: '40px',
        paddingTop: '30px',
        paddingBottom: '40px',
        borderRadius: '15px',
        flex: '3 1 400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    label: {
        fontSize: '0.9rem',
        fontWeight: '600',
        color: '#4A5568',
        paddingBottom: '20px',
        paddingTop: '10px',

    },
    detailInput: {
        padding: '10px',
        borderRadius: '6px',
        border: '1px solid #cbd5e0',
        width: '100%',
        boxSizing: 'border-box',
        padding: '12px',
    },
    messageInput: {
        minHeight: '150px',       // Use height instead of padding to make it big
        borderRadius: '6px',
        border: '1px solid #cbd5e0',
        width: '100%',
        boxSizing: 'border-box',
        padding: '12px',          // Normal padding keeps the cursor at the top-left
        fontFamily: 'inherit',    // Textareas don't always inherit font by default
        resize: 'vertical',       // Allows the user to stretch the box vertically
    },
    separator: {
        border: '0',
        height: '1px',
        background: '#cbd5e0',/* A light gray to match your label color */
        margin: '20px 0',      /* Adds space above and below the line */
        width: '100%',
    },
    required: {
    color: '#E53E3E', // A clear red color
    marginLeft: '4px',
    },
};

export default Contact;