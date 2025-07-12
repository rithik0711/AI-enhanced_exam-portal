import React, { useState, useEffect } from 'react';
import { Search, Play, Download, Lightbulb } from 'lucide-react';
import './Question.css';
import Navbar from './Navbar';

export default function Question({ user }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [viewMode, setViewMode] = useState('table');
  const [questionSets, setQuestionSets] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState('');

  // ✅ Fetch from DB when component mounts

useEffect(() => {
  const fetchQuestionBank = async () => {
    try {
      const res = await fetch('http://localhost:5000/student/question-bank');
 // update path if different
      const data = await res.json();
      setQuestionSets(data);
    } catch (err) {
      console.error('❌ Failed to fetch question bank:', err);
    }
  };

  fetchQuestionBank();
}, []);


  const subjects = [...new Set(questionSets.map(q => q.subject))];
  const topics = [...new Set(questionSets.map(q => q.topic))];

  const filteredQuestionSets = questionSets.filter(set => {
    const matchesSearch =
      set.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      set.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || set.subject === selectedSubject;
    const matchesTopic = selectedTopic === 'all' || set.topic === selectedTopic;
    return matchesSearch && matchesSubject && matchesTopic;
  });

  const handleOpen = (fileBase64, fileName) => {
    const blob = b64toBlob(fileBase64, 'application/pdf');
    const blobUrl = URL.createObjectURL(blob);
  
    // Create a new HTML page with embedded PDF and a title
    const html = `
      <html>
        <head><title>${fileName}</title></head>
        <body style="margin:0">
          <embed src="${blobUrl}" type="application/pdf" width="100%" height="100%"/>
        </body>
      </html>
    `;
  
    // Convert HTML to blob and open
    const newBlob = new Blob([html], { type: 'text/html' });
    const newBlobUrl = URL.createObjectURL(newBlob);
  
    window.open(newBlobUrl, '_blank');
  };
  

  const handleDownload = (fileBase64, fileName) => {
    const blob = b64toBlob(fileBase64, 'application/pdf');
    const blobUrl = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName || 'question.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  function b64toBlob(base64, mime) {
    const byteChars = atob(base64);
    const byteNumbers = new Array(byteChars.length);
    for (let i = 0; i < byteChars.length; i++) {
      byteNumbers[i] = byteChars.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mime });
  }  

  return (
    <div className="question-bank-container">
      <Navbar />
      <div className="question-bank-content">
        <h1>Question Bank</h1>
        {/* Header */}
        <div className="header-section">
          <div className="header-content">
            <div className="header-text">
              <p className="page-description">
                Practice and master concepts with our comprehensive question sets
              </p>
            </div>
            <div className="view-toggle">
              <button
                onClick={() => setViewMode('table')}
                className={`view-btn ${viewMode === 'table' ? 'view-btn-active' : ''}`}
              >
                Table View
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="filters-grid">
            <div className="search-container">
              <label className="filter-label">Search</label>
              <div className="search-input-wrapper">
                <Search className="ques-search-icon" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                  placeholder="Search question sets..."
                />
              </div>
            </div>

            <div className="filter-container">
              <label className="filter-label">Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>

            <div className="filter-container">
              <label className="filter-label">Topic</label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Topics</option>
                {topics.map(topic => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Table View */}
        {viewMode === 'table' && (
          <div className="table-container">
            <div className="table-wrapper">
              <table className="question-table">
                <thead className="table-head">
                  <tr>
                    <th className="table-header-cell">Subject & Topic</th>
                    <th className="table-header-cell">Actions</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {filteredQuestionSets.map((set) => (
                    <tr key={set.id} className="table-row">
                      <td className="table-cell">
                        <h3 className="subject-name">{set.subject}</h3>
                        <p className="topic-name">{set.topic}</p>
                      </td>
                      <td className="table-cell">
                        <div className="action-buttons">
                        <button className="action-btn action-btn-open" onClick={() => handleOpen(set.fileBase64, set.fileName)}>
                            <Play className="action-icon" />
                            Open
                          </button>
                          <button className="action-btn action-btn-download" onClick={() => handleDownload(set.fileBase64, set.fileName)}>
                            <Download className="action-icon" />
                            Download
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredQuestionSets.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">
              <Search className="empty-search-icon" />
            </div>
            <h3 className="empty-title">No question sets found</h3>
            <p className="empty-description">
              Try adjusting your search criteria or explore different subjects.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedSubject('all');
                setSelectedTopic('all');
              }}
              className="empty-action-btn"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Study Tips */}
        <div className="study-tips">
          <div className="tips-header">
            <Lightbulb className="tips-icon" />
            <h3 className="tips-title">Study Tips</h3>
          </div>
          <div className="tips-grid">
            <div className="tip-item">
              <h4 className="tip-title">🎯 Focus on Weak Areas</h4>
              <p className="tip-description">Identify tough topics and spend more time on them.</p>
            </div>
            <div className="tip-item">
              <h4 className="tip-title">⏰ Time Management</h4>
              <p className="tip-description">Plan your study time to cover more topics effectively.</p>
            </div>
            <div className="tip-item">
              <h4 className="tip-title">📚 Regular Practice</h4>
              <p className="tip-description">Daily revision helps improve your retention and speed.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
