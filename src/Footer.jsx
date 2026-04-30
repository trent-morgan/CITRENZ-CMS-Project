import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <p style={styles.copyright}>
        &copy; {currentYear} CITRENZ. All rights reserved. Developed by Trent Morgan.
      </p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#22263b',
    borderTop: '1px solid #E2E8F0',
    padding: '20px 40px',
    textAlign: 'center',
    marginTop: 'auto', // Keeps it at the bottom of the flex wrapper
  },
  copyright: {
    fontSize: '0.85rem',
    color: '#ffffff',
    margin: 0,
    fontWeight: '500',
    fontFamily: 'system-ui, sans-serif',
  },
};

export default Footer;