import React, { useState } from 'react';
import { signUp } from './registerService'; 
import logoImg from '../../assets/logo.png';
import { Link } from 'react-router-dom'; 


const RegistrationPage = () => {
  const [formData, setFormData] = useState({ 
    fullName: '', 
    email: '', 
    institution: '', 
    password: '' 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error: authError } = await signUp(formData);

    if (authError) {
      setError(authError.message);
    } else {
      localStorage.setItem('currentUser', JSON.stringify(data));

      if (data.role === 'admin') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/dashboard'; 
      }
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <header style={styles.header}>
        <Link to="/" style={styles.logoLink}>
            <img src={logoImg} alt="CITRENZ Logo" style={styles.logoImage} />
        </Link>
        </header>

        <form onSubmit={handleSubmit}>
          {error && <div style={styles.errorBanner}>{error}</div>}

          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              name="fullName"
              type="text"
              style={styles.input}
              onChange={handleChange}
              value={formData.fullName}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              name="email"
              type="email"
              style={styles.input}
              onChange={handleChange}
              value={formData.email}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Institution</label>
            <input
              name="institution"
              type="text"
              style={styles.input}
              onChange={handleChange}
              value={formData.institution}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              name="password"
              type="password"
              style={styles.input}
              onChange={handleChange}
              value={formData.password}
              required
            />
          </div>

          <button 
            type="submit" 
            style={loading ? {...styles.button, opacity: 0.7, cursor: 'not-allowed'} : styles.button}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p style={styles.footer}>
          Already have an account? <a href="/login" style={styles.link}>Sign-in</a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(120deg, #143767, #6C98B1)',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    padding: '70px 40px',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '70px 40px',
    borderRadius: '20px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    width: '100%',
    maxWidth: '400px', 
    boxSizing: 'border-box',
  },
  header: {
  display: 'flex',
  flexDirection: 'column', 
  alignItems: 'center',   
  marginBottom: '30px',
  },
  title: {
    color: '#1e3a8a',
    fontSize: '28px',
    margin: '0',
    fontWeight: '800',
  },
  subtitle: {
    color: '#6b7280',
    fontSize: '14px',
    marginTop: '4px',
  },
  errorBanner: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '14px',
    textAlign: 'center',
    border: '1px solid #fecaca',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
  display: 'block',      
  textAlign: 'left',     
  width: '100%',        
  marginBottom: '5px',   
  fontSize: '14px',
  fontWeight: '600',
  color: '#4A5568',      
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  options: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '25px',
    fontSize: '14px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#374151',
  },
  button: {
    width: '100%',
    backgroundColor: '#133860',
    color: '#ffffff',
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  footer: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '14px',
    color: '#6b7280',
  },
  link: {
    color: '#2E92C4',
    textDecoration: 'none',
    fontWeight: '500',
  },
  logoImage: { 
  height: '45px', 
  width: 'auto',
  },
};

export default RegistrationPage;