import React from 'react';
import './welcome.css';

const Welcome = ({ onLoginClick, onSignupClick }) => {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1>Welcome to Your Mental Health Companion</h1>
        <p className="welcome-subtitle">
          A safe space for reflection, growth, and support on your wellness journey
        </p>
        
        <div className="auth-buttons">
          <button className="login-btn" onClick={onLoginClick}>
            Login
          </button>
          <button className="signup-btn" onClick={onSignupClick}>
            Sign Up
          </button>
        </div>
        
        <p className="changes-prompt">Ask for changes</p>
      </div>
    </div>
  );
};

export default Welcome;