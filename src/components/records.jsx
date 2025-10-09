import React, { useState, useEffect } from 'react';
import './records.css';

const Records = ({ onLogout, onNavigate, onBackToJournal }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoverCard, setHoverCard] = useState({ show: false, content: null, position: { x: 0, y: 0 } });
  const [gratitudeChecked, setGratitudeChecked] = useState(false);

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'journal', label: 'Journal' },
    { id: 'support', label: 'Support' },
    { id: 'mindful', label: 'Mindful' }
  ];

  const activities = [
    {
      id: 1,
      title: 'Feeling Better Today',
      description: 'Wrote about therapy progress and anxiety management',
      date: '10/5/2024 at 02:30 PM',
      type: 'Journal',
      tags: ['calm', 'hopeful', 'reflection']
    },
    {
      id: 2,
      title: 'Box Breathing Session',
      description: 'Completed 10-minute breathing exercise',
      date: '10/5/2024 at 09:15 AM',
      type: 'Mindful',
      tags: ['10 min']
    },
    {
      id: 3,
      title: 'Peer Support Conversation',
      description: 'Had a meaningful conversation about coping strategies',
      date: '10/4/2024 at 05:45 PM',
      type: 'Support',
      tags: []
    }
  ];

  const hoverCards = {
    journalStat: {
      title: 'Journal Entries',
      content: 'You have completed 3 journal entries this month. Journaling helps process emotions and track mental health progress.',
      details: [
        'Last entry: 10/5/2024',
        'Most common mood: Hopeful',
        'Monthly goal: 8 entries'
      ]
    },
    supportStat: {
      title: 'Support Activities',
      content: "You've participated in 2 support activities. These include peer conversations and support group sessions.",
      details: [
        'Last activity: 10/4/2024',
        'Support received: 5 messages',
        'Support given: 3 messages'
      ]
    },
    mindfulStat: {
      title: 'Mindfulness Sessions',
      content: "You've completed 2 mindfulness sessions. Regular practice improves emotional regulation and reduces stress.",
      details: [
        'Last session: 10/5/2024',
        'Total minutes: 25 mins',
        'Favorite technique: Box Breathing'
      ]
    },
    feelingBetter: {
      title: 'Feeling Better Today',
      content: 'This journal entry focused on therapy progress and anxiety management strategies.',
      insights: [
        'Noticed improvement in managing anxiety symptoms',
        'Identified effective coping strategies',
        'Expressed hope for continued progress'
      ]
    },
    boxBreathing: {
      title: 'Box Breathing Session',
      content: 'You completed a 10-minute box breathing exercise, which helps regulate the nervous system.',
      details: [
        'Duration: 10 minutes',
        'Heart rate: Decreased by 8 BPM',
        'Stress level: Reduced from 7 to 3'
      ]
    },
    gratitude: {
      title: 'Gratitude Practice',
      content: 'Regular gratitude practice increases positive emotions and improves overall wellbeing.',
      insights: [
        'Increased positive mood',
        'Better sleep quality',
        'Improved relationships',
        'Enhanced resilience to stress'
      ]
    },
    progress: {
      title: 'Weekly Progress',
      content: "You've been active 7 times this week, showing consistent engagement with your mental health practices.",
      details: [
        'Trend: 25% increase from last week',
        'Streak: 5 days in a row',
        'Achievement: Consistency Champion'
      ]
    }
  };

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
    console.log(`Filtering by: ${filterId}`);
  };

  const handleMouseEnter = (cardKey, e) => {
    const rect = e.target.getBoundingClientRect();
    setHoverCard({
      show: true,
      content: hoverCards[cardKey],
      position: {
        x: e.clientX - 150,
        y: e.clientY - 200
      }
    });
  };

  const handleMouseLeave = () => {
    setHoverCard({ show: false, content: null, position: { x: 0, y: 0 } });
  };

  const handleMouseMove = (e) => {
    if (hoverCard.show) {
      setHoverCard(prev => ({
        ...prev,
        position: {
          x: e.clientX - 150,
          y: e.clientY - 200
        }
      }));
    }
  };

  const handleGratitudeCheckbox = (checked) => {
    setGratitudeChecked(checked);
  };

  const filteredActivities = activeFilter === 'all' 
    ? activities 
    : activities.filter(activity => activity.type.toLowerCase() === activeFilter);

  return (
    <div className="records-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <h1>MindCare</h1>
        </div>
        <ul className="nav-links">
  <li onClick={onBackToJournal}>Journal</li> {/* Use onBackToJournal */}
  <li onClick={() => onNavigate('support')}>Support</li>
  <li onClick={() => onNavigate('resources')}>Resources</li>
  <li onClick={() => onNavigate('mindful')}>Mindful</li>
  <li className="active">Records</li>
  <li onClick={onLogout}>Logout</li>
</ul>
        
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h1 className="page-title">My Records</h1>
          <div className="user-info">
            <div className="avatar">JS</div>
            <span>John Smith</span>
          </div>
        </div>
        
        <div className="stats-grid">
          <div 
            className="stat-card" 
            onMouseEnter={(e) => handleMouseEnter('journalStat', e)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            <div className="stat-number">3</div>
            <div className="stat-label">Journal</div>
          </div>
          
          <div 
            className="stat-card"
            onMouseEnter={(e) => handleMouseEnter('supportStat', e)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            <div className="stat-number">2</div>
            <div className="stat-label">Support</div>
          </div>
          
          <div 
            className="stat-card"
            onMouseEnter={(e) => handleMouseEnter('mindfulStat', e)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            <div className="stat-number">2</div>
            <div className="stat-label">Mindful</div>
          </div>
        </div>
        
        <div className="filters">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => handleFilterClick(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        <h2 className="section-title">All Activities</h2>
        
        <div className="activity-list">
          {filteredActivities.map(activity => (
            <div key={activity.id} className="activity-item">
              <div 
                className="activity-title"
                onMouseEnter={(e) => handleMouseEnter(
                  activity.title.includes('Feeling Better') ? 'feelingBetter' : 
                  activity.title.includes('Box Breathing') ? 'boxBreathing' : 'feelingBetter', 
                  e
                )}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
              >
                {activity.title}
              </div>
              <div className="activity-description">{activity.description}</div>
              <div className="activity-meta">
                <div className="activity-date">{activity.date}</div>
                <div className="activity-type">{activity.type}</div>
              </div>
              <div className="activity-tags">
                {activity.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="gratitude-section">
          <h2 
            className="gratitude-title"
            onMouseEnter={(e) => handleMouseEnter('gratitude', e)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            Gratitude Practice
          </h2>
          <p className="activity-description">Listed three things I'm grateful for today</p>
          
          <div className="gratitude-item">
            <input 
              type="checkbox" 
              className="gratitude-checkbox" 
              checked={gratitudeChecked}
              onChange={(e) => handleGratitudeCheckbox(e.target.checked)}
            />
            <div className="gratitude-content">
              <div className="gratitude-date">10/3/2024 at 08:00 PM</div>
              <div className="gratitude-tags">
                <span className="tag">grateful</span>
                <span className="tag">positive</span>
                <span className="tag">gratitude</span>
              </div>
            </div>
          </div>
        </div>
        
        <div 
          className="progress-section"
          onMouseEnter={(e) => handleMouseEnter('progress', e)}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          <h2 className="progress-title">Weekly Progress</h2>
          <p className="progress-text">You've been active 7 times this week. Keep going! 🚠</p>
          <div className="progress-emoji">🎉</div>
        </div>
      </div>

      {/* Hover Card */}
      {hoverCard.show && hoverCard.content && (
        <div 
          className="hover-card active"
          style={{
            left: `${hoverCard.position.x}px`,
            top: `${hoverCard.position.y}px`
          }}
        >
          <h4>{hoverCard.content.title}</h4>
          <p>{hoverCard.content.content}</p>
          
          {hoverCard.content.details && (
            <div className="details">
              {hoverCard.content.details.map((detail, index) => (
                <div key={index} className="detail-item">{detail}</div>
              ))}
            </div>
          )}
          
          {hoverCard.content.insights && (
            <div className="insights">
              <strong>Key Insights:</strong>
              <ul>
                {hoverCard.content.insights.map((insight, index) => (
                  <li key={index}>{insight}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Records;