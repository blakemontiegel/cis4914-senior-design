import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Modal from '../components/Modal';
import VideoUploader from '../components/VideoUploader';
import './GameDetails.css';
import axios from 'axios';

const GameDetails = () => {
  const { gameId } = useParams();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [currentClip, setCurrentClip] = useState(0);
  const [selectedTag, setSelectedTag] = useState(null);
  const [clips, setClips] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);

  const game = {
    id: gameId,
    teamName: 'Team 1',
    opponent: 'Team 2',
    date: '2026-01-20'
  };

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
      day: 'numeric' 
    });
  };

  const quickTags = ['Goal', 'Save', 'Half', 'Great play'];

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get('http://localhost:5001/videos', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      });

        setClips(res.data);
      } catch (err) {
        console.error('Error fetching videos:', err);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    const fetchPlaybackUrl = async () => {
      if (!clips[currentClip]) return;

      try {
        const res = await axios.get(
          `http://localhost:5001/videos/${clips[currentClip]._id}/play`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );

        setVideoUrl(res.data.url);
      } catch (err) {
        console.error('Error getting playback URL:', err);
      }
    };
    fetchPlaybackUrl();
  }, [currentClip, clips]);

  return (
    <div className="game-details-page">
      <div className="game-matchup">
        <h1 className="matchup-title">
          <span>{game.teamName}</span>
          <span className="vs">vs</span>
          <span>{game.opponent}</span>
        </h1>
        <p>Total clips: {clips.length}</p>
        <p className="matchup-date">{formatDate(game.date)}</p>
      </div>

      <div className="main-player">
        <div className="video-container">
          {videoUrl ? (
            <video
              className="video-player"
              controls
              width="100%"
              key={videoUrl}
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="video-placeholder">
              <i className="fas fa-play"></i>
            </div>
          )}
        </div>
        <div className="video-controls">
          <input
            type="range"
            className="time-slider"
            min="0"
            max="100"
            defaultValue="0"
          />
          <div className="time-display">
            <span>0:00</span>
            <span>{clips[currentClip]?.duration || '0:00'}</span>
          </div>
        </div>
      </div>

      <div className="moment-tags">
        {quickTags.map((label) => (
          <button 
            key={label} 
            className={`tag-chip ${selectedTag === label ? 'selected' : ''}`}
            onClick={() => setSelectedTag(selectedTag === label ? null : label)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="clips-section">
        <div className="clips-header">
          <h3>All Clips</h3>
          <button className="add-clip-btn" onClick={() => setShowUploadModal(true)}>
            <i className="fas fa-plus"></i>
          </button>
        </div>
        <div className="clips-grid">
          {clips.map((clip, index) => (
            <div
              key={clip._id}
              className={`clip-card ${currentClip === index ? 'active' : ''}`}
              onClick={() => setCurrentClip(index)}
            >
              <div className="clip-thumbnail">
                <i className="fas fa-play"></i>
              </div>
              <span className="clip-duration">{clip.duration}</span>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="Upload from device"
      >
        <div className="game-upload-panel">
          <VideoUploader />
        </div>
      </Modal>

      <div className="bottom-action-bar">
        <button
          className="bar-btn"
          onClick={() => setShowUploadModal(true)}
        >
          <i className="fas fa-cloud-upload-alt"></i>
          Upload from device
        </button>
        <button 
          className={`bar-btn primary ${!selectedTag ? 'disabled' : ''}`}
          onClick={() => {
            if (!selectedTag) return;
          }}
          disabled={!selectedTag}
        >
          <i className="fas fa-flag"></i>
          Tag moment
        </button>
      </div>
    </div>
  );
};

export default GameDetails;
