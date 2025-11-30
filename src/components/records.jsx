import React, { useState, useEffect } from 'react';
import './records.css';

const Records = ({ onLogout, onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoverCard, setHoverCard] = useState({ show: false, content: null, position: { x: 0, y: 0 } });
  const [gratitudeChecked, setGratitudeChecked] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  // Static sample activities (PRESERVED)
  const sampleActivities = [
    {
      id: 1,
      title: 'Feeling Better Today',
      description: 'Wrote about therapy progress and anxiety management',
      date: '10/5/2024 at 02:30 PM',
      type: 'journal',
      tags: ['calm', 'hopeful', 'reflection']
    },
    {
      id: 2,
      title: 'Box Breathing Session',
      description: 'Completed 10-minute breathing exercise',
      date: '10/5/2024 at 09:15 AM',
      type: 'mindful',
      tags: ['10 min']
    },
    {
      id: 3,
      title: 'Peer Support Conversation',
      description: 'Had a meaningful conversation about coping strategies',
      date: '10/4/2024 at 05:45 PM',
      type: 'support',
      tags: []
    }
  ];

  // Backend activities list (MERGED with static)
  const [activities, setActivities] = useState(sampleActivities);

  // GET data from backend
  useEffect(() => {
    const fetchActivities = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:5000/api/records/all", {
          headers: { Authorization: token },
        });

        const data = await response.json();

        // Add backend activities below static ones
        const merged = [...sampleActivities, ...data];
        setActivities(merged);
      } catch (err) {
        console.error("Error fetching activities", err);
      }
    };

    fetchActivities();
  }, []);

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'journal', label: 'Journal' },
    { id: 'support', label: 'Support' },
    { id: 'mindful', label: 'Mindful' }
  ];

  // Hover cards (PRESERVED COMPLETELY)
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

  // FILTER
  const filteredActivities =
    activeFilter === 'all'
      ? activities
      : activities.filter(a => a.type.toLowerCase() === activeFilter);

  // HOVER
  const handleMouseEnter = (cardKey, e) => {
    setHoverCard({
      show: true,
      content: hoverCards[cardKey],
      position: { x: e.clientX - 150, y: e.clientY - 200 }
    });
  };

  const handleMouseLeave = () => {
    setHoverCard({ show: false, content: null, position: { x: 0, y: 0 } });
  };

  const handleMouseMove = (e) => {
    if (hoverCard.show) {
      setHoverCard(prev => ({
        ...prev,
        position: { x: e.clientX - 150, y: e.clientY - 200 }
      }));
    }
  };

  return (
    <div className="records-container">

      {/* Header */}
      <div className="header">
        <h1>My Records</h1>
        <div className="user-info">
          <button className="back-btn" onClick={() => onNavigate('open')}>← Back to Home</button>
          <div className="avatar">{user?.firstName?.slice(0,2)?.toUpperCase()}</div>
          <span>{user?.firstName} {user?.lastName}</span>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div
          className="stat-card"
          onMouseEnter={(e) => handleMouseEnter('journalStat', e)}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          <div className="stat-number">
            {activities.filter(a => a.type.toLowerCase() === "journal").length}
          </div>
          <div className="stat-label">Journal</div>
        </div>

        <div
          className="stat-card"
          onMouseEnter={(e) => handleMouseEnter('supportStat', e)}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          <div className="stat-number">
            {activities.filter(a => a.type.toLowerCase() === "support").length}
          </div>
          <div className="stat-label">Support</div>
        </div>

        <div
          className="stat-card"
          onMouseEnter={(e) => handleMouseEnter('mindfulStat', e)}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          <div className="stat-number">
            {activities.filter(a => a.type.toLowerCase() === "mindful").length}
          </div>
          <div className="stat-label">Mindful</div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        {filters.map(filter => (
          <button
            key={filter.id}
            className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <h2 className="section-title">All Activities</h2>

      {/* Activity List */}
      <div className="activity-list">
        {filteredActivities.map(activity => (
          <div key={activity._id || activity.id} className="activity-item">
            <div
              className="activity-title"
              onMouseEnter={(e) => handleMouseEnter(
                activity.title.includes('Feeling Better') ? 'feelingBetter' :
                activity.title.includes('Box Breathing') ? 'boxBreathing' :
                activity.title.includes('Gratitude') ? 'gratitude' : 'progress',
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
              {activity.tags?.map(tag => <span key={tag} className="tag">{tag}</span>)}
            </div>
          </div>
        ))}
      </div>

      {/* Hover Card */}
      {hoverCard.show && hoverCard.content && (
        <div
          className="hover-card active"
          style={{ left: `${hoverCard.position.x}px`, top: `${hoverCard.position.y}px` }}
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
              <strong>Insights:</strong>
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
