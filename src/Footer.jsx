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
    backgroundColor: '#f0f0f0',
    padding: '20px 40px',
    textAlign: 'center',
    marginTop: 'auto',
  },
  copyright: {
    fontSize: '0.85rem',
    color: '#696969',
    margin: 0,
    fontWeight: '500',
    fontFamily: 'system-ui, sans-serif',
  },
};

export default Footer;