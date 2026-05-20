import React, { useState } from 'react';
import { signIn } from './loginService'; 
import logoImg from '../../assets/logo.png';
import { useNavigate, Link } from 'react-router-dom'; 



const LoginPage = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({ email: '', password: '' });
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

    const { data, error: authError } = await signIn(formData.email, formData.password);

    if (authError) {
      setError(authError.message);
    } else {
      localStorage.setItem('currentUser', JSON.stringify(data));

      localStorage.setItem('userLoggedIn', 'true');

      if (data.role === "Admin") {
        navigate('/admin');
      } else {
        navigate('/profile');
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
            <label style={styles.label}>Email Address</label>
            <input
              name="email"
              type="email"
              style={styles.input}
              placeholder="name@institution.ac.nz"
              onChange={handleChange}
              value={formData.email}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              name="password"
              type="password"
              style={styles.input}
              placeholder="••••••••"
              onChange={handleChange}
              value={formData.password}
              required
            />
          </div>

          {/* <div style={styles.options}>
            <label style={styles.checkboxLabel}>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" style={styles.link}>Forgot password?</a>
          </div> */}

          <button 
            type="submit" 
            style={loading ? {...styles.button, opacity: 0.7, cursor: 'not-allowed'} : styles.button}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

          <p style={styles.footer}>
          Don't have an account?{' '}
          <span 
            onClick={() => navigate('/register')} 
            style={{ ...styles.link, cursor: 'pointer' }}
          >
            Sign-up
          </span>
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

export default LoginPage;