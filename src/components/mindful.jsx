import React, { useState } from 'react';
import './mindful.css';

const Mindfulness = ({ onNavigate, onLogout }) => {
  const [activeCategory, setActiveCategory] = useState('breathing');
  const [hoverCard, setHoverCard] = useState({ show: false, content: null, position: { x: 0, y: 0 } });

  const categories = [
    { id: 'breathing', label: 'Breathing' },
    { id: 'body-scan', label: 'Body Scan' },
    { id: 'sounds', label: 'Sounds' }
  ];

  const meditationSessions = [
    {
      id: 'breathing-478',
      title: '4-7-8 Breathing',
      description: 'A simple breathing technique to reduce anxiety and promote relaxation',
      duration: null,
      category: 'breathing'
    },
    {
      id: 'box-breathing',
      title: 'Box Breathing',
      description: 'Equal count breathing pattern used by Navy SEALs for stress management',
      duration: null,
      category: 'breathing'
    },
    {
      id: 'body-scan',
      title: 'Full Body Scan',
      description: 'Progressive relaxation technique to release tension from head to toe',
      duration: null,
      category: 'body-scan'
    },
    {
      id: 'quick-body-check',
      title: 'Quick Body Check',
      description: 'Brief body awareness exercise perfect for busy schedules',
      duration: '500',
      category: 'body-scan'
    },
    {
      id: 'ocean-waves',
      title: 'Ocean Waves',
      description: 'Gentle ocean sounds to help you relax and focus',
      duration: '2000',
      category: 'sounds'
    },
    {
      id: 'forest-rain',
      title: 'Forest Rain',
      description: 'Peaceful rainfall in a forest setting',
      duration: '1500',
      category: 'sounds'
    }
  ];

  const hoverCards = {
    breathingCategory: {
      title: 'Breathing Exercises',
      content: 'Breathing techniques help calm your nervous system and reduce stress. These exercises focus on controlling your breath to influence your mental state.',
      benefits: [
        'Reduces anxiety and stress',
        'Improves focus and concentration',
        'Lowers blood pressure',
        'Enhances emotional regulation'
      ]
    },
    breathing478: {
      title: '4-7-8 Breathing Technique',
      content: 'This technique involves breathing in for 4 seconds, holding for 7 seconds, and exhaling for 8 seconds.',
      instructions: [
        'Inhale quietly through your nose for 4 seconds',
        'Hold your breath for 7 seconds',
        'Exhale completely through your mouth for 8 seconds',
        'Repeat 3-7 times'
      ],
      benefits: [
        'Promotes relaxation',
        'Reduces anxiety quickly',
        'Helps with sleep issues'
      ]
    },
    boxBreathing: {
      title: 'Box Breathing Technique',
      content: 'Also known as square breathing, this technique involves equal durations for each phase of breathing.',
      instructions: [
        'Inhale through your nose for 4 seconds',
        'Hold your breath for 4 seconds',
        'Exhale through your mouth for 4 seconds',
        'Hold your breath for 4 seconds',
        'Repeat for several minutes'
      ],
      benefits: [
        'Improves focus under stress',
        'Balances the nervous system',
        'Enhances mental clarity'
      ]
    },
    bodyScan: {
      title: 'Full Body Scan Meditation',
      content: 'This practice involves systematically focusing attention on different parts of the body to release tension.',
      instructions: [
        'Lie down comfortably and close your eyes',
        'Bring awareness to your feet and toes',
        'Slowly move attention up through your legs, torso, arms, and head',
        'Notice sensations without judgment',
        'Release tension in each area as you focus on it'
      ],
      benefits: [
        'Reduces physical tension',
        'Increases body awareness',
        'Promotes deep relaxation'
      ]
    },
    quickBodyCheck: {
      title: 'Quick Body Check',
      content: 'A rapid scan of your body to identify areas of tension and release them quickly.',
      instructions: [
        'Take three deep breaths',
        'Quickly scan from head to toe',
        'Notice any areas of tension',
        'Breathe into those areas and release tension',
        'Return to your activity feeling refreshed'
      ],
      benefits: [
        'Takes only 30-60 seconds',
        'Reduces immediate stress',
        'Increases present-moment awareness'
      ]
    },
    oceanWaves: {
      title: 'Ocean Waves Sound Meditation',
      content: 'Using the rhythmic sound of ocean waves to calm the mind and promote relaxation.',
      instructions: [
        'Find a comfortable position',
        'Close your eyes and focus on the sound of waves',
        'Let your breathing sync with the wave rhythm',
        'When your mind wanders, gently return to the sounds',
        'Continue for the duration of the session'
      ],
      benefits: [
        'Induces relaxation response',
        'Masks distracting noises',
        'Improves sleep quality'
      ]
    },
    forestRain: {
      title: 'Forest Rain Sound Meditation',
      content: 'Immersive experience of gentle rainfall in a forest environment to promote calmness.',
      instructions: [
        'Sit or lie down comfortably',
        'Imagine yourself in a peaceful forest',
        'Focus on the sound of raindrops on leaves',
        'Breathe deeply and let tension melt away',
        'Visualize the forest cleansing your mind'
      ],
      benefits: [
        'Reduces mental chatter',
        'Connects with nature',
        'Enhances creative thinking'
      ]
    }
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleStartSession = (sessionTitle) => {
    alert(`Starting session: ${sessionTitle}`);
    // In a real app, this would navigate to the meditation session page
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

  const filteredSessions = activeCategory === 'breathing' 
    ? meditationSessions.filter(session => session.category === 'breathing')
    : activeCategory === 'body-scan'
    ? meditationSessions.filter(session => session.category === 'body-scan')
    : meditationSessions.filter(session => session.category === 'sounds');

  return (
    <div className="mindfulness-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <h1>MindCare</h1>
        </div>
        <ul className="nav-links">
          <li onClick={() => onNavigate?.('journal')}>Journal</li>
          <li onClick={() => onNavigate?.('support')}>Support</li>
          <li onClick={() => onNavigate?.('resources')}>Resources</li>
          <li className="active">Mindful</li>
          <li onClick={() => onNavigate?.('records')}>Records</li>
          <li onClick={onLogout}>Logout</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h1 className="page-title">Mindfulness & Meditation</h1>
          <div className="user-info">
            <div className="avatar">JS</div>
            <span>John Smith</span>
          </div>
        </div>
        
        <div className="category-nav">
          {categories.map(category => (
            <div
              key={category.id}
              className={`category-link ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category.id)}
              onMouseEnter={(e) => handleMouseEnter('breathingCategory', e)}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
            >
              {category.label}
            </div>
          ))}
        </div>
        
        <div className="meditation-grid">
          {filteredSessions.map(session => (
            <div 
              key={session.id} 
              className="meditation-card"
              onMouseEnter={(e) => handleMouseEnter(
                session.id === 'breathing-478' ? 'breathing478' :
                session.id === 'box-breathing' ? 'boxBreathing' :
                session.id === 'body-scan' ? 'bodyScan' :
                session.id === 'quick-body-check' ? 'quickBodyCheck' :
                session.id === 'ocean-waves' ? 'oceanWaves' : 'forestRain', 
                e
              )}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
            >
              <h2 className="card-title">
                {session.title}
                {session.duration && <span className="duration">{session.duration}</span>}
              </h2>
              <p className="card-description">{session.description}</p>
              <button 
                className="start-btn"
                onClick={() => handleStartSession(session.title)}
              >
                Start Session
              </button>
            </div>
          ))}
        </div>
        
        <div className="divider"></div>
        
        <h2 className="page-title">Quick Exercises</h2>
        
        <div className="meditation-grid">
          {meditationSessions.filter(session => session.duration).map(session => (
            <div 
              key={session.id} 
              className="meditation-card"
              onMouseEnter={(e) => handleMouseEnter(
                session.id === 'quick-body-check' ? 'quickBodyCheck' :
                session.id === 'ocean-waves' ? 'oceanWaves' : 'forestRain', 
                e
              )}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
            >
              <h2 className="card-title">
                {session.title}
                <span className="duration">{session.duration}</span>
              </h2>
              <p className="card-description">{session.description}</p>
              <button 
                className="start-btn"
                onClick={() => handleStartSession(session.title)}
              >
                Start Session
              </button>
            </div>
          ))}
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
          
          {hoverCard.content.instructions && (
            <div className="instructions">
              <strong>How to practice:</strong>
              <ol>
                {hoverCard.content.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>
          )}
          
          {hoverCard.content.benefits && (
            <div className="benefits">
              {hoverCard.content.benefits.map((benefit, index) => (
                <div key={index} className="benefit-item">{benefit}</div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Mindfulness;