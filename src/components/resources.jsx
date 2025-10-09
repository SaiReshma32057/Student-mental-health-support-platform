import React, { useState } from 'react';
import './resources.css';

const Resources = ({ onBackToJournal, onNavigate, onLogout }) => {
  const [activeCategory, setActiveCategory] = useState('All Resources');
  const [activeDetail, setActiveDetail] = useState(null);
  const [resourceStatus, setResourceStatus] = useState({});

  const categories = ['All Resources', 'Mindfulness', 'Breathing', 'Journaling', 'Meditation'];

  const resources = [
    {
      id: 'mindful-journaling',
      title: 'Mindful Journaling',
      description: 'Learn how to practice mindfulness through journaling exercises that help you stay present and aware.',
      duration: '15 mins',
      status: 'Not Started',
      category: 'Journaling'
    },
    {
      id: 'gratitude-journaling',
      title: 'Gratitude Journaling',
      description: 'Develop a positive mindset by focusing on things you are grateful for each day.',
      duration: '10 mins',
      status: 'Not Started',
      category: 'Journaling'
    },
    {
      id: 'body-scan',
      title: 'Body Scan Meditation',
      description: 'A guided meditation to help you connect with your body and release tension.',
      duration: '20 mins',
      status: 'Not Started',
      category: 'Meditation'
    },
    {
      id: 'breathing-basics',
      title: 'Breathing Basics',
      description: 'Fundamental breathing techniques to help manage stress and anxiety.',
      duration: '10 mins',
      status: 'Not Started',
      category: 'Breathing'
    },
    {
      id: 'mindful-walking',
      title: 'Mindful Walking',
      description: 'Learn to practice mindfulness while walking to stay grounded throughout your day.',
      duration: '15 mins',
      status: 'Not Started',
      category: 'Mindfulness'
    },
    {
      id: 'stress-relief',
      title: 'Stress Relief Techniques',
      description: 'Quick and effective techniques to manage stress in the moment.',
      duration: '12 mins',
      status: 'Not Started',
      category: 'Mindfulness'
    }
  ];

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (category !== 'All Resources') {
      alert(`Showing resources for: ${category}`);
    }
  };

  const handleStartReading = (resourceId) => {
    setResourceStatus(prev => ({
      ...prev,
      [resourceId]: 'In Progress'
    }));
    showResourceDetail(resourceId);
  };

  const handleReviewAgain = (resourceId) => {
    showResourceDetail(resourceId);
  };

  const showResourceDetail = (resourceId) => {
    setActiveDetail(resourceId);
  };

  const hideResourceDetail = () => {
    setActiveDetail(null);
  };

  const filteredResources = activeCategory === 'All Resources' 
    ? resources 
    : resources.filter(resource => resource.category === activeCategory);

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress':
        return { backgroundColor: '#fff3cd', color: '#856404' };
      case 'Completed':
        return { backgroundColor: '#d4edda', color: '#155724' };
      default:
        return { backgroundColor: '#ecf0f1', color: '#2c3e50' };
    }
  };

  const renderResourceDetail = () => {
    if (!activeDetail) return null;

    const resource = resources.find(r => r.id === activeDetail);
    if (!resource) return null;

    return (
      <div className="resource-detail active">
        <button className="back-btn" onClick={hideResourceDetail}>
          ← Back to Resources
        </button>
        <h1>{resource.title}</h1>
        <div className="resource-meta">
          <div className="resource-duration">
            ⏱️ {resource.duration}
          </div>
          <div 
            className="resource-status"
            style={getStatusColor(resourceStatus[resource.id] || resource.status)}
          >
            {resourceStatus[resource.id] || resource.status}
          </div>
        </div>
        
        <p>{resource.description}</p>
        
        {(resource.id === 'mindful-journaling' || resource.id === 'gratitude-journaling') && (
          <div>
            <h3>Getting Started:</h3>
            <ul className="detail-list">
              <li>Find a quiet, comfortable space</li>
              <li>Set a timer if needed</li>
              <li>Have your journal or notebook ready</li>
              <li>Take a few deep breaths to center yourself</li>
            </ul>
            
            <h3>Daily Practice:</h3>
            <div className="checkbox-item">
              <input type="checkbox" id="practice1" />
              <label htmlFor="practice1">Morning reflection (5 minutes)</label>
            </div>
            <div className="checkbox-item">
              <input type="checkbox" id="practice2" />
              <label htmlFor="practice2">Evening review (10 minutes)</label>
            </div>
            
            <div className="tip-box">
              <strong>Tip:</strong> Consistency is more important than duration. Even 5 minutes daily can make a big difference.
            </div>
          </div>
        )}

        {resource.id === 'body-scan' && (
          <div>
            <h3>Body Scan Instructions:</h3>
            <ol className="detail-list">
              <li>Lie down or sit comfortably</li>
              <li>Close your eyes and take 3 deep breaths</li>
              <li>Start by bringing awareness to your toes</li>
              <li>Slowly move your attention up through your body</li>
              <li>Notice any sensations without judgment</li>
              <li>Complete the scan from head to toe</li>
            </ol>
          </div>
        )}

        <div className="detail-actions">
          <button className="btn btn-primary">
            {resourceStatus[resource.id] === 'In Progress' ? 'Continue' : 'Start Now'}
          </button>
          <button className="btn btn-outline">
            Save for Later
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="resources-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <h1>My Journal</h1>
        </div>
        <ul className="nav-links">
          <li onClick={onBackToJournal}>Journal</li>
          <li className="active">Resources</li>
          <li>Support</li>
          <li>Mindful</li>
          <li>Records</li>
          <li>Logout</li>
        </ul>
      </div>
      
      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h1>Mental Health Resources</h1>
          <div className="user-info">
            <div className="avatar">JS</div>
            <span>John Smith</span>
          </div>
        </div>

        {/* Progress Section */}
        <section className="progress-section">
          <h2>Your Learning Progress</h2>
          <div className="progress-stats">
            <div className="stat">
              <div className="stat-value">2</div>
              <div className="stat-label">Started</div>
            </div>
            <div className="stat">
              <div className="stat-value">0</div>
              <div className="stat-label">Completed</div>
            </div>
            <div className="stat">
              <div className="stat-value">6</div>
              <div className="stat-label">Available</div>
            </div>
          </div>
        </section>

        <div className="divider"></div>

        {/* Resource Categories */}
        <div className="categories">
          {categories.map(category => (
            <div
              key={category}
              className={`category ${activeCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </div>
          ))}
        </div>

        {/* Resource Detail View */}
        {renderResourceDetail()}

        {/* Resource Cards */}
        {!activeDetail && (
          <div className="resource-cards" id="resourceCards">
            {filteredResources.map(resource => (
              <div
                key={resource.id}
                className="resource-card"
                data-resource={resource.id}
                onClick={() => showResourceDetail(resource.id)}
              >
                <h2>{resource.title}</h2>
                <p className="resource-description">{resource.description}</p>
                <div className="resource-meta">
                  <div className="resource-duration">
                    ⏱️ {resource.duration}
                  </div>
                  <div 
                    className="resource-status"
                    style={getStatusColor(resourceStatus[resource.id] || resource.status)}
                  >
                    {resourceStatus[resource.id] || resource.status}
                  </div>
                </div>
                <div className="resource-actions">
                  <button
                    className={`btn ${resourceStatus[resource.id] === 'In Progress' ? 'btn-outline' : 'btn-primary'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartReading(resource.id);
                    }}
                  >
                    {resourceStatus[resource.id] === 'In Progress' ? 'Continue' : 'Start Reading'}
                  </button>
                  <button
                    className="btn btn-outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReviewAgain(resource.id);
                    }}
                  >
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;