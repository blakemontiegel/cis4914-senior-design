import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import logo from '../logo.svg';
import './Login.css';

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        // TODO: implement registration API call
        console.log('Registering with:', { username, email, password });
        // for now, just switch to login mode after "successful" registration
        setIsRegistering(false);
        setEmail('');
        setPassword('');
      } else {
        await login({ username, password });
        navigate('/');
      }
    } catch (error) {
      // TODO: add proper error handling and user feedback
      console.error('Authentication failed:', error);
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    // clear form when switching modes
    setUsername('');
    setEmail('');
    setPassword('');
    setShowPassword(false);
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <p className="welcome-text">Welcome!</p>
        <img src={logo} alt="Sideline Logo" className="login-logo" />
        <h1 className="login-title">Sideline</h1>
      </div>
      
      <div className="login-card">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          {isRegistering && (
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="form-input password-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>
          
          <button type="submit" className="login-button">
            {isRegistering ? 'Create Account' : 'Log In'}
          </button>
        </form>
        
        <button 
          type="button" 
          className="create-account-button"
          onClick={toggleMode}
        >
          {isRegistering ? 'Already have an account? Log In' : 'Create an Account'}
        </button>
      </div>
    </div>
  );
};

export default Login;
