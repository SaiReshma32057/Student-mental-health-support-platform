import React, { useState, useEffect } from 'react';
import './App.css';
import Welcome from './components/welcome';
import Login from './components/login';
import Signup from './components/signup';
import Journal from './components/journal';
import Resources from './components/resources';
import Records from './components/records';
import Mindfulness from './components/mindful';
import PeerSupport from './components/support';
import Open from './components/open';

function App() {
  const [currentView, setCurrentView] = useState('welcome');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentView('open');
  };

  const handleSignupSuccess = () => {
    setIsLoggedIn(true);
    setCurrentView('open');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('welcome');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'open':
  return (
    <Open 
      onLogout={handleLogout}
      onNavigate={(view) => setCurrentView(view)}
    />
  );
      case 'welcome':
        return (
          <Welcome
            onLoginClick={() => setCurrentView('login')}
            onSignupClick={() => setCurrentView('signup')}
          />
        );
      case 'login':
        return (
          <Login
            onSwitchToSignup={() => setCurrentView('signup')}
            onLoginSuccess={handleLoginSuccess}
          />
        );
      case 'signup':
        return (
          <Signup
            onSwitchToLogin={() => setCurrentView('login')}
            onSignupSuccess={handleSignupSuccess}
          />
        );
      case 'journal':
        return (
          <Journal 
            onLogout={handleLogout}
            onNavigate={(view) => setCurrentView(view)}
          />
        );
      case 'resources':
        return (
          <Resources 
            onBackToJournal={() => setCurrentView('journal')}
            onNavigate={(view) => setCurrentView(view)}
            onLogout={handleLogout}
          />
        );
      case 'records':
        return (
          <Records 
            onLogout={handleLogout}
            onNavigate={(view) => setCurrentView(view)}
            onBackToJournal={() => setCurrentView('journal')}
          />
        );
      case 'mindful':
        return (
          <Mindfulness 
            onLogout={handleLogout}
            onNavigate={(view) => setCurrentView(view)}
            onBackToJournal={() => setCurrentView('journal')}
          />
        );
      case 'support':
        return (
          <PeerSupport 
            onLogout={handleLogout}
            onNavigate={(view) => setCurrentView(view)}
            onBackToJournal={() => setCurrentView('journal')}
          />
        );
      default:
        return <Welcome />;
    }
  };

  return (
    <div className="App">
      {renderCurrentView()}
    </div>
  );
}

export default App;