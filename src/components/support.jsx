import React, { useState } from 'react';
import './support.css';

const PeerSupport = ({ onNavigate, onLogout }) => {
  const [hoverCard, setHoverCard] = useState({ show: false, content: null, position: { x: 0, y: 0 } });

  const supportData = {
    messagesSent: 2,
    supportReceived: 2,
    recentMessages: [
      {
        type: 'received',
        message: "Thank you for listening yesterday. It meant so much to have someone understand.",
        date: "10/5/2024 at 10:15 AM"
      },
      {
        type: 'sent',
        message: "Your words of encouragement helped me through a tough day. Thank you!",
        date: "10/4/2024 at 09:20 AM"
      }
    ]
  };

  const hoverCards = {
    messagesSent: {
      title: 'Messages Sent Details',
      content: 'You have sent 2 messages in total:',
      messages: [
        '"Your words of encouragement helped me through a tough day. Thank you!" - 10/4/2024',
        '"I appreciate your support during our conversation yesterday" - 10/3/2024'
      ]
    },
    supportReceived: {
      title: 'Support Received Details',
      content: 'You have received 2 supports in total:',
      messages: [
        '"Thank you for listening yesterday. It meant so much to have someone understand." - 10/5/2024',
        '"I\'m here for you whenever you need to talk" - 10/2/2024'
      ]
    },
    supportReceivedLabel: {
      title: 'Support Received',
      content: 'This section shows the support you\'ve received from others:',
      items: [
        'Emotional support messages',
        'Words of encouragement',
        'Listening and understanding'
      ]
    },
    myActionsLabel: {
      title: 'My Actions',
      content: 'You have performed these supportive actions:',
      items: [
        'Sent encouraging messages to peers',
        'Provided emotional support',
        'Shared coping strategies',
        'Listened actively to others'
      ]
    },
    recentMessages: {
      title: 'Recent Messages',
      content: 'Your most recent conversations:',
      messages: [
        {
          text: '"How are you feeling today? I\'m here if you need to talk."',
          date: 'Sent 10/5/2024 at 2:30 PM'
        },
        {
          text: '"I appreciate your support during our conversation yesterday"',
          date: 'Received 10/4/2024 at 4:15 PM'
        }
      ]
    }
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

  return (
    <div className="support-container">
      {/* Header */}
      <div className="header">
        <h1>Peer Support</h1>
        <div className="user-info">
          <button className="back-btn" onClick={() => onNavigate('open')}>← Back to Home</button>
          <div className="avatar">JS</div>
          <span>John Smith</span>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </div>
      
      <div className="dashboard">
        <div 
          className="stat-card"
          onMouseEnter={(e) => handleMouseEnter('messagesSent', e)}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          <h3>Messages Sent</h3>
          <div className="stat-number">{supportData.messagesSent}</div>
        </div>
        
        <div 
          className="stat-card"
          onMouseEnter={(e) => handleMouseEnter('supportReceived', e)}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          <h3>Support Received</h3>
          <div className="stat-number">{supportData.supportReceived}</div>
        </div>
      </div>
      
      <div className="divider"></div>
      
      <h2 className="section-title">Their Actions</h2>
      
      <div className="support-section">
        <h3>Support Received</h3>
        
        <div className="support-item">
          <span 
            className="support-label"
            onMouseEnter={(e) => handleMouseEnter('supportReceivedLabel', e)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            Support Received
          </span>
          <p className="support-message">
            {supportData.recentMessages.find(msg => msg.type === 'received')?.message}
          </p>
          <p className="support-date">
            - {supportData.recentMessages.find(msg => msg.type === 'received')?.date}
          </p>
        </div>
        
        <div className="divider"></div>
        
        <h3>My Actions</h3>
        
        <div className="support-item">
          <span 
            className="support-label my-actions-label"
            onMouseEnter={(e) => handleMouseEnter('myActionsLabel', e)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            My Actions
          </span>
          <p className="support-message">
            {supportData.recentMessages.find(msg => msg.type === 'sent')?.message}
          </p>
          <p className="support-date">
            - {supportData.recentMessages.find(msg => msg.type === 'sent')?.date}
          </p>
        </div>
      </div>
      
      <div 
        className="support-section"
        onMouseEnter={(e) => handleMouseEnter('recentMessages', e)}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <h3>Recent Messages</h3>
        <p>{supportData.recentMessages.length} messages</p>
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
          
          {hoverCard.content.messages && (
            <ul>
              {hoverCard.content.messages.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          )}
          
          {hoverCard.content.items && (
            <ul>
              {hoverCard.content.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
          
          {hoverCard.content.messages && hoverCard.content.messages[0]?.text && (
            <div>
              {hoverCard.content.messages.map((msg, index) => (
                <div key={index} className="message-item">
                  <p className="message-text">{msg.text}</p>
                  <p className="message-date">- {msg.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PeerSupport;