import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [openSections, setOpenSections] = useState({
    recentGames: false,
    upcomingMatches: false,
  });

  const teams = [
    {
      id: '1',
      name: 'Team 1',
      recentGames: [
        { id: '1', opponent: 'Team 2', date: '2026-01-20' },
        { id: '2', opponent: 'Team 3', date: '2026-01-15' },
        { id: '3', opponent: 'Team 4', date: '2026-01-08' },
      ]
    },
    {
      id: '2',
      name: 'Team 2',
      recentGames: [
        { id: '1', opponent: 'Team 1', date: '2026-01-20' },
        { id: '2', opponent: 'Team 6', date: '2026-01-12' },
      ]
    }
  ];

  const recentGamesFeed = [
    { id: '1', teamId: '1', teamName: 'Team 1', opponent: 'Team 2', date: '2026-01-20' },
    { id: '2', teamId: '1', teamName: 'Team 1', opponent: 'Team 3', date: '2026-01-15' },
    { id: '1', teamId: '2', teamName: 'Team 2', opponent: 'Team 1', date: '2026-01-20' },
  ];

  const upcomingMatchesFeed = [
    { id: 'upcoming-1', teamId: '1', teamName: 'Team 1', opponent: 'Team 5', date: '2026-02-28' },
    { id: 'upcoming-2', teamId: '2', teamName: 'Team 2', opponent: 'Team 4', date: '2026-03-02' },
    { id: 'upcoming-3', teamId: '1', teamName: 'Team 1', opponent: 'Team 6', date: '2026-03-06' },
  ];

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const toggleSection = (sectionKey) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  return (
    <div className="home-container">
      <h1>Dashboard</h1>
      
      <div className="teams-list">
        {teams.map(team => (
          <div key={team.id} className="team-card">
            <Link to={`/team/${team.id}`} className="team-card-header">
              <h2>{team.name}</h2>
              <i className="fas fa-chevron-right"></i>
            </Link>
            
            <div className="recent-games">
              {team.recentGames.length > 0 ? (
                team.recentGames.slice(0, 3).map(game => (
                  <Link
                    key={game.id}
                    to={`/team/${team.id}/game/${game.id}`}
                    className="recent-game"
                  >
                    <span className="opponent">vs {game.opponent}</span>
                    <span className="date">{formatDate(game.date)}</span>
                  </Link>
                ))
              ) : (
                <p className="no-games">No recent games</p>
              )}
            </div>
          </div>
        ))}
        <div className="section-divider" role="separator" aria-label="Feed section">
          <span>Feeds</span>
        </div>

        <div className="feed-card">
          <button
            className="feed-header"
            onClick={() => toggleSection('recentGames')}
            aria-expanded={openSections.recentGames}
            aria-controls="recent-games-feed"
          >
            <h2>Recent Games</h2>
            <i className={`fas ${openSections.recentGames ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
          </button>

          {openSections.recentGames && (
            <div id="recent-games-feed" className="feed-content">
              {recentGamesFeed.map((game) => (
                <Link
                  key={`${game.teamId}-${game.id}`}
                  to={`/team/${game.teamId}/game/${game.id}`}
                  className="feed-item"
                >
                  <div>
                    <p className="feed-main">{game.teamName} vs {game.opponent}</p>
                    <p className="feed-sub">Game recap</p>
                  </div>
                  <span className="feed-date">{formatDate(game.date)}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="feed-card">
          <button
            className="feed-header"
            onClick={() => toggleSection('upcomingMatches')}
            aria-expanded={openSections.upcomingMatches}
            aria-controls="upcoming-matches-feed"
          >
            <h2>Upcoming Matches</h2>
            <i className={`fas ${openSections.upcomingMatches ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
          </button>

          {openSections.upcomingMatches && (
            <div id="upcoming-matches-feed" className="feed-content">
              {upcomingMatchesFeed.map((match) => (
                <Link
                  key={match.id}
                  to={`/team/${match.teamId}`}
                  className="feed-item"
                >
                  <div>
                    <p className="feed-main">{match.teamName} vs {match.opponent}</p>
                    <p className="feed-sub">Upcoming match</p>
                  </div>
                  <span className="feed-date">{formatDate(match.date)}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
