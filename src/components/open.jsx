import React from 'react';
import './open.css';

const Open = ({ onNavigate, onLogout }) => {
  const menuItems = [
    { id: 'journal', label: 'Journal', icon: '📔', description: 'Write your thoughts and feelings' },
    { id: 'records', label: 'Records', icon: '📊', description: 'View your activity history' },
    { id: 'resources', label: 'Resources', icon: '📚', description: 'Helpful articles and guides' },
    { id: 'support', label: 'Support', icon: '🤝', description: 'Connect with peers' },
    { id: 'mindful', label: 'Mindful', icon: '🧘', description: 'Meditation and exercises' }
  ];

  const handleCircleClick = (itemId) => {
    onNavigate?.(itemId);
  };

  return (
    <div className="open-container">
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <h1 className="page-title">SAFESPACE</h1>
          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-number">2</span>
              <span className="stat-label">Started</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">0</span>
              <span className="stat-label">Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">6</span>
              <span className="stat-label">Available</span>
            </div>
          </div>
          <div className="user-info">
            <div className="avatar">ME</div>
            <span className="account-text">My Account</span>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-wrapper">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h2 className="welcome-quote">"Your journey to mental wellness begins here"</h2>
          <div className="mission-text">
            <p>SafeSpace is your personal sanctuary for mental health and wellbeing.</p>
            <p>We provide tools and support to help you navigate life's challenges with resilience and grace.</p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="cards-section">
          <div className="cards-grid">
            {menuItems.map((item) => (
              <div 
                key={item.id}
                className="card-item"
                onClick={() => handleCircleClick(item.id)}
              >
                <div className="card-header">
                  <div className="card-icon">{item.icon}</div>
                  <h3 className="card-label">{item.label}</h3>
                </div>
                <p className="card-description">{item.description}</p>
                <div className="card-status">
                  <span className="status-text">Not Started</span>
                  <div className="card-actions">
                    <button className="action-btn primary">Start Reading</button>
                    <button className="action-btn secondary">Review</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Open;