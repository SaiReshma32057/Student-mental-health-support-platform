
import React, { useState } from 'react';
import './journal.css';

const Journal = ({ onLogout, onNavigate }) => {  // Added onNavigate prop
  const [entries, setEntries] = useState([
    {
      id: 1,
      date: '10/5/2024',
      title: 'Feeling Better Today',
      content: 'Had a good therapy session. Starting to see some progress in managing my anxiety.',
      tags: ['calm', 'hopeful', 'reflection', 'progress'],
      icon: '📞'
    },
    {
      id: 2,
      date: '10/4/2024',
      title: 'Challenging Day',
      content: 'Work was overwhelming today. Used breathing exercises to cope.',
      tags: ['overwhelmed', 'anxious', 'venting', 'coping'],
      icon: '📞'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [newEntry, setNewEntry] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    content: ''
  });

  const tags = ['calm', 'hopeful', 'reflection', 'progress', 'overwhelmed', 'anxious', 'venting', 'coping', 'grateful', 'energized'];

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      if (selectedTags.length < 4) {
        setSelectedTags([...selectedTags, tag]);
      } else {
        alert('You can select up to 4 tags only.');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry({
      ...newEntry,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formattedEntry = {
      id: entries.length + 1,
      date: new Date(newEntry.date).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
      }),
      title: newEntry.title,
      content: newEntry.content,
      tags: selectedTags,
      icon: '📝'
    };

    setEntries([formattedEntry, ...entries]);
    setShowModal(false);
    setNewEntry({
      title: '',
      date: new Date().toISOString().split('T')[0],
      content: ''
    });
    setSelectedTags([]);
    
    alert('Journal entry added successfully!');
  };

  const closeModal = () => {
    setShowModal(false);
    setNewEntry({
      title: '',
      date: new Date().toISOString().split('T')[0],
      content: ''
    });
    setSelectedTags([]);
  };

  

  const progressPercentage = Math.min((entries.length / 7) * 100, 100);

  return (
    <div className="journal-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <h1>My Journal</h1>
        </div>
       <ul className="nav-links">
  <li className="active">Journal</li>
  <li onClick={() => onNavigate('support')}>Support</li>
  <li onClick={() => onNavigate('resources')}>Resources</li>
  <li onClick={() => onNavigate('mindful')}>Mindful</li>
  <li onClick={() => onNavigate('records')}>Records</li>
  <li onClick={onLogout}>Logout</li>
</ul>
      </div>
      
      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h1>
            My Journal
            <button className="add-btn" onClick={() => setShowModal(true)}>+</button>
          </h1>
          <div className="user-info">
            <div className="avatar">JS</div>
            <span>John Smith</span>
          </div>
        </div>
        
        {/* Journal Progress */}
        <section className="progress-section">
          <h2>Journal Progress</h2>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="progress-text">
            You journaled {entries.length} {entries.length === 1 ? 'day' : 'days'} this week
          </p>
        </section>
        
        <div className="divider"></div>
        
        {/* Journal Entries */}
        <div className="journal-entries">
          {entries.map(entry => (
            <div key={entry.id} className="entry">
              <div className="entry-header">
                <span className="entry-icon">{entry.icon}</span>
                <span className="entry-date">{entry.date}</span>
              </div>
              <h3>{entry.title}</h3>
              <div className="entry-content">
                <p>{entry.content}</p>
              </div>
              <div className="tags">
                {entry.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for adding new journal entry */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add New Journal Entry</h2>
              <button className="close-btn" onClick={closeModal}>&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="entryTitle">Title</label>
                <input 
                  type="text" 
                  id="entryTitle" 
                  name="title"
                  value={newEntry.title}
                  onChange={handleInputChange}
                  placeholder="How are you feeling today?" 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="entryDate">Date</label>
                <input 
                  type="date" 
                  id="entryDate" 
                  name="date"
                  value={newEntry.date}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="entryContent">Journal Entry</label>
                <textarea 
                  id="entryContent" 
                  name="content"
                  value={newEntry.content}
                  onChange={handleInputChange}
                  placeholder="Write about your day, thoughts, and feelings..." 
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label>Tags (Select up to 4)</label>
                <div className="tag-selector">
                  {tags.map(tag => (
                    <div 
                      key={tag}
                      className={`tag-option ${selectedTags.includes(tag) ? 'selected' : ''}`}
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Journal;