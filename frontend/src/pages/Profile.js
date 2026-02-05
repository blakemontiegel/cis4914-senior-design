import React from 'react';
import useAuth from '../hooks/useAuth'
import './Profile.css';

const Profile = () => {
  // TODO: user profile page with team info, settings, and account management
  const { user } = useAuth();

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {user ? (
        <div className="profile-details">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>No user loaded.</p>
      )}
      <p>Manage your account and team settings here.</p>
    </div>
  );
};

export default Profile;
