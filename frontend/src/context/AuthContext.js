import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // TODO: validate token with backend
      setUser({ token });
    }
    setLoading(false);
  }, []);

  // TODO: replace with real API call
  const login = async (credentials) => {
    // mock successful login
    const mockToken = 'mock-jwt-token';
    localStorage.setItem('token', mockToken);
    setUser({ username: credentials.username, token: mockToken });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
