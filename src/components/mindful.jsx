import React, { useState, useEffect } from 'react';
import './mindful.css';

const Mindfulness = ({ onNavigate, onLogout }) => {
  const [activeCategory, setActiveCategory] = useState('breathing');
  const [activeSession, setActiveSession] = useState(null);
  const [sessionProgress, setSessionProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

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
      duration: '5 min',
      category: 'breathing',
      type: 'breathing',
      steps: [
        { type: 'inhale', duration: 4, instruction: 'Inhale through your nose' },
        { type: 'hold', duration: 7, instruction: 'Hold your breath' },
        { type: 'exhale', duration: 8, instruction: 'Exhale through your mouth' }
      ],
      totalDuration: 300,
      info: {
        title: '4-7-8 Breathing Technique',
        description: 'This technique involves breathing in for 4 seconds, holding for 7 seconds, and exhaling for 8 seconds. Developed by Dr. Andrew Weil, it\'s based on pranayama, an ancient yogic practice that helps regulate the breath.',
        instructions: [
          'Inhale quietly through your nose for 4 seconds',
          'Hold your breath for 7 seconds',
          'Exhale completely through your mouth for 8 seconds',
          'Repeat this cycle 3-7 times'
        ],
        benefits: [
          'Reduces anxiety and stress quickly',
          'Helps with sleep issues and insomnia',
          'Promotes relaxation response',
          'Improves oxygen circulation',
          'Calms the nervous system'
        ],
        tips: [
          'Practice in a quiet place where you won\'t be disturbed',
          'Sit with your back straight or lie down comfortably',
          'Place the tip of your tongue against the roof of your mouth',
          'Exhale completely through your mouth between cycles'
        ]
      }
    },
    {
      id: 'box-breathing',
      title: 'Box Breathing',
      description: 'Equal count breathing pattern used by Navy SEALs for stress management',
      duration: '5 min',
      category: 'breathing',
      type: 'breathing',
      steps: [
        { type: 'inhale', duration: 4, instruction: 'Inhale through your nose' },
        { type: 'hold', duration: 4, instruction: 'Hold your breath' },
        { type: 'exhale', duration: 4, instruction: 'Exhale through your mouth' },
        { type: 'hold', duration: 4, instruction: 'Hold your breath' }
      ],
      totalDuration: 300,
      info: {
        title: 'Box Breathing Technique',
        description: 'Also known as square breathing or four-square breathing, this technique involves equal durations for each phase of breathing. It\'s widely used by military personnel, athletes, and professionals to maintain calm under pressure.',
        instructions: [
          'Inhale through your nose for 4 seconds',
          'Hold your breath for 4 seconds',
          'Exhale through your mouth for 4 seconds',
          'Hold your breath for 4 seconds',
          'Repeat for several minutes'
        ],
        benefits: [
          'Improves focus and concentration',
          'Reduces stress and anxiety',
          'Balances the autonomic nervous system',
          'Enhances mental clarity and decision-making',
          'Promotes emotional regulation'
        ],
        tips: [
          'Visualize drawing a square with each breath cycle',
          'Practice during stressful situations to regain composure',
          'Use it as a quick reset during busy workdays',
          'Combine with mindfulness for enhanced benefits'
        ]
      }
    },
    {
      id: 'body-scan',
      title: 'Full Body Scan',
      description: 'Progressive relaxation technique to release tension from head to toe',
      duration: '10 min',
      category: 'body-scan',
      type: 'guided',
      steps: [
        { duration: 60, instruction: 'Focus on your feet and toes... release tension' },
        { duration: 60, instruction: 'Move to your ankles and calves... let go of stress' },
        { duration: 60, instruction: 'Bring awareness to your knees and thighs... relax' },
        { duration: 60, instruction: 'Focus on your hips and lower back... release' },
        { duration: 60, instruction: 'Move to your stomach and chest... breathe deeply' },
        { duration: 60, instruction: 'Bring awareness to your shoulders... let them drop' },
        { duration: 60, instruction: 'Focus on your arms and hands... release tension' },
        { duration: 60, instruction: 'Move to your neck and throat... relax' },
        { duration: 60, instruction: 'Bring awareness to your face and head... release' },
        { duration: 60, instruction: 'Scan your entire body... complete relaxation' }
      ],
      totalDuration: 600,
      info: {
        title: 'Full Body Scan Meditation',
        description: 'This mindfulness practice involves systematically focusing attention on different parts of the body to develop awareness and release physical tension. It helps bridge the connection between mind and body.',
        instructions: [
          'Lie down comfortably or sit in a relaxed position',
          'Close your eyes and take a few deep breaths',
          'Bring awareness to your feet and toes, noticing any sensations',
          'Slowly move attention up through each part of your body',
          'Notice sensations without judgment - warmth, tension, relaxation',
          'Release tension in each area as you focus on it',
          'Complete the scan from head to toe'
        ],
        benefits: [
          'Reduces physical tension and muscle stiffness',
          'Increases body awareness and interoception',
          'Promotes deep relaxation and stress reduction',
          'Improves sleep quality',
          'Enhances mind-body connection'
        ],
        tips: [
          'Practice in a quiet, comfortable environment',
          'Use a gentle, non-judgmental attitude toward sensations',
          'If your mind wanders, gently return to body awareness',
          'Practice regularly to develop greater body sensitivity',
          'Combine with deep breathing for enhanced relaxation'
        ]
      }
    }
  ];

  useEffect(() => {
    let interval;
    if (isPlaying && activeSession) {
      interval = setInterval(() => {
        setTimer(prev => {
          const newTime = prev + 1;
          const progress = (newTime / activeSession.totalDuration) * 100;
          setSessionProgress(progress);
          
          if (activeSession.type === 'guided' || activeSession.type === 'breathing') {
            let timeElapsed = 0;
            for (let i = 0; i < activeSession.steps.length; i++) {
              timeElapsed += activeSession.steps[i].duration;
              if (newTime <= timeElapsed) {
                if (i !== currentStep) {
                  setCurrentStep(i);
                }
                break;
              }
            }
          }
          
          if (newTime >= activeSession.totalDuration) {
            handleEndSession();
            return 0;
          }
          
          return newTime;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, activeSession, currentStep]);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleStartSession = (session) => {
    setActiveSession(session);
    setTimer(0);
    setSessionProgress(0);
    setCurrentStep(0);
    setIsPlaying(true);
  };

  const handlePauseSession = () => {
    setIsPlaying(false);
  };

  const handleResumeSession = () => {
    setIsPlaying(true);
  };

  const handleEndSession = () => {
    setIsPlaying(false);
    setActiveSession(null);
    setTimer(0);
    setSessionProgress(0);
    setCurrentStep(0);
    if (activeSession) {
      alert(`Great job! You completed ${activeSession.title}`);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getCurrentInstruction = () => {
    if (!activeSession?.steps) return '';
    return activeSession.steps[currentStep]?.instruction || '';
  };

  const getBreathingVisual = () => {
    if (!activeSession?.steps) return null;
    const currentBreathingStep = activeSession.steps[currentStep];
    
    switch (currentBreathingStep?.type) {
      case 'inhale':
        return <div className="breathing-circle expand">Breathe In</div>;
      case 'exhale':
        return <div className="breathing-circle contract">Breathe Out</div>;
      case 'hold':
        return <div className="breathing-circle hold">Hold</div>;
      default:
        return null;
    }
  };

  const filteredSessions = meditationSessions.filter(session => session.category === activeCategory);

  return (
    <div className="mindfulness-container">
      {/* Header */}
      <div className="header">
        <div className="header-left">
          <h1>Mindfulness & Meditation</h1>
        </div>
        <div className="user-info">
          <button className="back-btn" onClick={() => onNavigate('open')}>← Back to Home</button>
          <div className="avatar">JS</div>
          <span>John Smith</span>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </div>

      {/* Active Session View */}
      {activeSession && (
        <div className="active-session">
          <div className="session-header">
            <button className="back-btn" onClick={handleEndSession}>← Back to Exercises</button>
            <h2>{activeSession.title}</h2>
            <div className="session-meta">
              <span className="session-duration">{activeSession.duration}</span>
              <span className="session-type">{activeSession.type}</span>
            </div>
          </div>
          
          <div className="session-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${sessionProgress}%` }}></div>
            </div>
            <div className="session-timer">
              {formatTime(timer)} / {formatTime(activeSession.totalDuration)}
            </div>
          </div>
          
          <div className="session-content">
            {activeSession.type === 'breathing' && (
              <div className="breathing-container">
                {getBreathingVisual()}
                <div className="breathing-instruction">
                  {getCurrentInstruction()}
                </div>
              </div>
            )}
            
            {activeSession.type === 'guided' && (
              <div className="guided-container">
                <div className="current-step">
                  Step {currentStep + 1} of {activeSession.steps.length}
                </div>
                <div className="guided-instruction">
                  {getCurrentInstruction()}
                </div>
              </div>
            )}
          </div>
          
          <div className="session-controls">
            {isPlaying ? (
              <button className="control-btn pause" onClick={handlePauseSession}>
                ⏸️ Pause
              </button>
            ) : (
              <button className="control-btn resume" onClick={handleResumeSession}>
                ▶️ Resume
              </button>
            )}
            <button className="control-btn end" onClick={handleEndSession}>
              ⏹️ End Session
            </button>
          </div>
        </div>
      )}

      {/* Main Content (only shown when no active session) */}
      {!activeSession && (
        <>
          <div className="category-nav">
            {categories.map(category => (
              <div
                key={category.id}
                className={`category-link ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.label}
              </div>
            ))}
          </div>
          
          <div className="sessions-list">
            {filteredSessions.map(session => (
              <div 
                key={session.id} 
                className="session-item"
                onClick={() => handleStartSession(session)}
              >
                <div className="session-item-content">
                  <h3 className="session-title">
                    {session.title}
                    <span className="session-duration-badge">{session.duration}</span>
                  </h3>
                  <p className="session-description">{session.description}</p>
                  <div className="session-type-indicator">{session.type}</div>
                </div>
                <button className="start-session-btn">
                  Start Session →
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Mindfulness;