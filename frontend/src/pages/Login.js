import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import api from '../utils/api';
import logo from '../logo.svg';
import './Login.css';

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showResendVerification, setShowResendVerification] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const verifyToken = searchParams.get('verifyToken');
  const hasVerifiedToken = useRef(false);

  useEffect(() => {
  if (!verifyToken || hasVerifiedToken.current) return;

  hasVerifiedToken.current = true;

  const verifyEmail = async () => {
    try {
      const res = await api.get(`/auth/verify-email?token=${encodeURIComponent(verifyToken)}`);
      setMessage(res.data.message || 'Email verified successfully. You can now log in.');
      setError('');
      setIsRegistering(false);
      setShowResendVerification(false);

      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete('verifyToken');
      setSearchParams(nextParams, { replace: true });
    } catch (err) {
      console.error('Email verification failed:', err);
      setError(err.response?.data?.message || 'Email verification failed.');
      setMessage('');

      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete('verifyToken');
      setSearchParams(nextParams, { replace: true });
    }
  };

  verifyEmail();
}, [verifyToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setShowResendVerification(false);

    try {
      if(isRegistering) {
        // call backend to create user
        const res = await api.post('/auth/register', {
          username,
          email,
          password,
        });

        setMessage(
          res.data?.message || 'Account created. Check your email to verify your account.'
        );
        setIsRegistering(false);
        setPassword('');
      }else {
        // login mode
        const result = await login({ username, password });
        if(result.success) {
          navigate('/');
        }else {
          setError(result.message || 'Login failed.');
          if (result.requiresEmailVerification) {
            setShowResendVerification(true);
          }
        }
      }
    } catch (err) {
      console.error('Authentication failed:', err);
      const message = err.response?.data?.message || (isRegistering ? 'Registration failed.' : 'Login failed.');
      setError(message);
      setMessage('');

      if (err.response?.data?.requiresEmailVerification) {
        setShowResendVerification(true);
      }
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    // clear form when switching modes
    setUsername('');
    setEmail('');
    setPassword('');
    setShowPassword(false);
    setError('');
    setMessage('');
    setShowResendVerification(false);
  };

  const handleForgotPassword = () => {
    setError('Password reset is not available yet.');
    setMessage('');
  };

  const handleResendVerification = async () => {
    setError('');
    setMessage('');

    try {
      await api.post('/auth/resend-verification', { email });
      setMessage('Verification email sent. Please check your inbox.');
      setShowResendVerification(false);
    } catch (err) {
      console.error('Resend verification failed:', err);
      setError(err.response?.data?.message || 'Could not resend verification email.');
    }
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

          {error && <p className="error-text">{error}</p>}
          {message && <p className="success-text">{message}</p>}
          
          <button type="submit" className="login-button">
            {isRegistering ? 'Create Account' : 'Log In'}
          </button>

          {!isRegistering && (
            <>
              <button
                type="button"
                className="forgot-password-button"
                onClick={handleForgotPassword}
              >
                Forgot your password?
              </button>

              {showResendVerification && (
                <button
                  type="button"
                  className="forgot-password-button"
                  onClick={handleResendVerification}
                  disabled={!email}
                >
                  Resend verification email
                </button>
              )}
            </>
          )}
        </form>
        
        <button 
          type="button" 
          className="create-account-button"
          onClick={toggleMode}
        >
          {isRegistering ? 'Already have an account?\nLog In' : 'Create an Account'}
        </button>
      </div>
    </div>
  );
};

export default Login;
