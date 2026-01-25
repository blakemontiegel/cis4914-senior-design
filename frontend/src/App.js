import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

// components
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// pages
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';

// context
import { AuthProvider } from './context/AuthContext';

function AppContent() {
  const location = useLocation();
  // hide navbar on login page
  const showNavbar = location.pathname !== '/login';

  return (
    <div className="App">
      {showNavbar && <Navbar />}
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  // wrap everything in AuthProvider to make auth state available app-wide
  // router needs to be inside AuthProvider so protected routes can access auth context
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
