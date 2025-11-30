import React, { useState, useEffect } from 'react';
import './journal.css';

const Journal = ({ onLogout, onNavigate }) => {
  const [entries, setEntries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [newEntry, setNewEntry] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    content: ''
  });

  const tags = ['calm', 'hopeful', 'reflection', 'progress', 'overwhelmed', 'anxious', 'venting', 'coping', 'grateful', 'energized'];

  // Fetch entries from backend
  useEffect(() => {
    const fetchEntries = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:5000/api/journal/all", {
          headers: { "Authorization": token }
        });

        if (response.ok) {
          const data = await response.json();
          setEntries(data);
        }
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };

    fetchEntries();
  }, []);

  // FIX: Simple modal open function
  const handleOpenModal = () => {
    console.log("Opening modal..."); // Debug log
    setShowModal(true);
  };

  // Tag selection handler
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

  // Input handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry({...newEntry, [name]: value});
  };

  // Save journal entry to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first!");
      return;
    }

    const formattedEntry = {
      title: newEntry.title,
      content: newEntry.content,
      date: newEntry.date,
      tags: selectedTags
    };

    try {
      const response = await fetch("http://localhost:5000/api/journal/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify(formattedEntry)
      });

      if (response.ok) {
        const data = await response.json();
        setEntries([data.entry, ...entries]);
        setShowModal(false);
        setNewEntry({ title: "", date: new Date().toISOString().split("T")[0], content: "" });
        setSelectedTags([]);
        alert("Entry saved successfully! ✨");
      } else {
        alert("Failed to save entry. Please try again.");
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("Error saving entry. Please check your connection.");
    }
  };

  const progressPercentage = Math.min((entries.length / 7) * 100, 100);
  
  // FIX: Simple modal close function
  const closeModal = () => {
    console.log("Closing modal..."); // Debug log
    setShowModal(false);
    setNewEntry({ title: "", date: new Date().toISOString().split("T")[0], content: "" });
    setSelectedTags([]);
  };

  // Format date to DD-MM-YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="journal-container">
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="page-title">My Journal</h1>
            {/* FIX: Use the direct function */}
            <button 
              className="add-btn" 
              onClick={handleOpenModal}
              type="button"
            >
              + New Entry
            </button>
          </div>
          <div className="user-info">
            <button className="back-btn" onClick={() => onNavigate('open')}>← Back to Home</button>
            <div className="avatar">ME</div>
            <span className="account-text">My Account</span>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-wrapper">
        {/* Progress Section */}
        <section className="progress-section">
          <div className="progress-card">
            <h2 className="section-title">Journal Progress</h2>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <p className="progress-text">You journaled {entries.length} {entries.length === 1 ? 'day' : 'days'} this week</p>
          </div>
        </section>

        <div className="divider"></div>

        {/* Entries Section */}
        <section className="entries-section">
          <div className="section-header">
            <h2 className="section-title">Your Journal Entries</h2>
            <span className="entries-count">{entries.length} entries</span>
          </div>

          <div className="journal-entries">
            {entries.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <h3>No journal entries yet</h3>
                <p>Start your journaling journey by creating your first entry!</p>
                {/* FIX: Use the same function for both buttons */}
                <button className="add-btn primary" onClick={handleOpenModal}>
                  Write First Entry
                </button>
              </div>
            ) : (
              <div className="entries-grid">
                {entries.map(entry => (
                  <div key={entry._id} className="entry-card">
                    <div className="card-header">
                      <div className="entry-info">
                        <h3 className="entry-title">{entry.title}</h3>
                        <span className="entry-date">{formatDate(entry.date)}</span>
                      </div>
                    </div>
                    <div className="card-content">
                      <p className="entry-content">{entry.content}</p>
                    </div>
                    <div className="card-footer">
                      <div className="tags">
                        {entry.tags.map(tag => (
                          <span key={tag} className="tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Modal - FIX: Make sure modal renders when showModal is true */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Create New Journal Entry</h2>
              <button className="close-btn" onClick={closeModal} type="button">&times;</button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label className="form-label">Entry Title</label>
                <input 
                  type="text" 
                  name="title" 
                  value={newEntry.title} 
                  placeholder="How are you feeling today?" 
                  required 
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Date</label>
                <input 
                  type="date" 
                  name="date" 
                  value={newEntry.date} 
                  required 
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Journal Entry</label>
                <textarea 
                  name="content" 
                  value={newEntry.content} 
                  placeholder="Write your thoughts, feelings, or reflections..." 
                  required 
                  onChange={handleInputChange}
                  className="form-textarea"
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label className="form-label">How are you feeling? (Select up to 4 tags)</label>
                <div className="tag-selector">
                  {tags.map(tag => (
                    <button 
                      key={tag} 
                      type="button"
                      className={`tag-option ${selectedTags.includes(tag) ? 'selected' : ''}`} 
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                <div className="selected-tags-count">
                  {selectedTags.length}/4 tags selected
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