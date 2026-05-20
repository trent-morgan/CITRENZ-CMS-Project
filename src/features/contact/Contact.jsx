import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Contact = () => {

  return (
    <div style={styles.pageWrapper}>
        <h1 style={styles.mainTitle}>Contact Us</h1>
        <p className="info">Have questions about CITRENZ CMS? Reach out and send us a message!</p>

        <div style={styles.mainContainer}>

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
        padding: '1rem 1rem', 
        maxWidth: '1200px',   
        margin: '0 auto',      
        width: '100%',
        boxSizing: 'border-box',
    },
    mainTitle: {
        textAlign: 'center',
        margin: '1rem 0',
        fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', 
        fontWeight: '700',
        color: '#2D3748',
    },
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap', 
        gap: '2rem',      
        marginTop: '1rem',
    },
    sidebar: {
        flex: '1 1 250px', 
        maxWidth: '300px', 
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'flex-start', 
        textAlign: 'left',        
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
        color: '#2E92C4',          
        textDecoration: 'none',   
        fontWeight: '500',
    },
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
        minHeight: '150px',       
        borderRadius: '6px',
        border: '1px solid #cbd5e0',
        width: '100%',
        boxSizing: 'border-box',
        padding: '12px',          
        fontFamily: 'inherit',   
        resize: 'vertical',      
    },
    separator: {
        border: '0',
        height: '1px',
        background: '#cbd5e0',
        margin: '20px 0',      
        width: '100%',
    },
    required: {
    color: '#E53E3E', 
    marginLeft: '4px',
    },
};

export default Contact;