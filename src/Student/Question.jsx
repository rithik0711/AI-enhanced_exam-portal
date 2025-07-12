import React, { useState,useEffect } from 'react';
import { Search, Filter, BookOpen, Clock, Target, ChevronRight, Eye, Download, Star, Brain, Lightbulb, Play, FileText, Calendar, Award, TrendingUp } from 'lucide-react';
import './Question.css';
import Navbar from './Navbar';
// import axios from 'axios';
export default function Question({ user }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [viewMode, setViewMode] = useState('table');
  
  const questionSets = [
    {
      id: 1,
      subject: 'Mathematics',
      topic: 'Algebra',
      title: 'Linear Equations and Inequalities',
      description: 'Master the fundamentals of solving linear equations and understanding inequalities',
      questionCount: 25,
      difficulty: 'Medium',
      estimatedTime: 45,
      completionRate: 78,
      averageScore: 85,
      tags: ['equations', 'graphing', 'problem-solving'],
      lastUpdated: '2024-01-10',
      isBookmarked: true,
      totalAttempts: 156,
      successRate: 82
    },
    {
      id: 2,
      subject: 'Physics',
      topic: 'Kinematics',
      title: 'Motion in One Dimension',
      description: 'Explore concepts of velocity, acceleration, and displacement in linear motion',
      questionCount: 30,
      difficulty: 'Hard',
      estimatedTime: 60,
      completionRate: 65,
      averageScore: 72,
      tags: ['motion', 'velocity', 'acceleration'],
      lastUpdated: '2024-01-08',
      isBookmarked: false,
      totalAttempts: 89,
      successRate: 68
    },
    {
      id: 3,
      subject: 'Chemistry',
      topic: 'Periodic Table',
      title: 'Elements and Their Properties',
      description: 'Understanding periodic trends, electron configuration, and chemical properties',
      questionCount: 20,
      difficulty: 'Easy',
      estimatedTime: 30,
      completionRate: 92,
      averageScore: 88,
      tags: ['elements', 'trends', 'properties'],
      lastUpdated: '2024-01-12',
      isBookmarked: true,
      totalAttempts: 234,
      successRate: 91
    },
    {
      id: 4,
      subject: 'Computer Science',
      topic: 'Data Structures',
      title: 'Arrays and Linked Lists',
      description: 'Fundamental data structures with implementation and complexity analysis',
      questionCount: 35,
      difficulty: 'Medium',
      estimatedTime: 50,
      completionRate: 71,
      averageScore: 79,
      tags: ['arrays', 'linked-lists', 'algorithms'],
      lastUpdated: '2024-01-09',
      isBookmarked: false,
      totalAttempts: 127,
      successRate: 75
    },
    {
      id: 5,
      subject: 'Biology',
      topic: 'Cell Biology',
      title: 'Cell Structure and Function',
      description: 'Comprehensive study of cellular components and their biological functions',
      questionCount: 28,
      difficulty: 'Medium',
      estimatedTime: 40,
      completionRate: 83,
      averageScore: 81,
      tags: ['cells', 'organelles', 'functions'],
      lastUpdated: '2024-01-11',
      isBookmarked: true,
      totalAttempts: 198,
      successRate: 84
    },
    {
      id: 6,
      subject: 'English',
      topic: 'Literature',
      title: 'Poetry Analysis and Interpretation',
      description: 'Develop skills in analyzing poetic devices, themes, and literary techniques',
      questionCount: 22,
      estimatedTime: 55,
      completionRate: 58,
      averageScore: 74,
      tags: ['poetry', 'analysis', 'interpretation'],
      lastUpdated: '2024-01-07',
      isBookmarked: false,
      totalAttempts: 76,
      successRate: 62
    }
  ];

  const subjects = [...new Set(questionSets.map(q => q.subject))];
  const topics = [...new Set(questionSets.map(q => q.topic))];

  const filteredQuestionSets = questionSets.filter(set => {
    const matchesSearch = set.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         set.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         set.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         set.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSubject = selectedSubject === 'all' || set.subject === selectedSubject;
    const matchesTopic = selectedTopic === 'all' || set.topic === selectedTopic;
    
    return matchesSearch && matchesSubject && matchesTopic;
  });


  const toggleBookmark = (id) => {
    console.log(`Toggling bookmark for question set ${id}`);
  };
  const handleOpen = (fileBase64) => {
  const link = document.createElement('a');
  link.href = `data:application/pdf;base64,${fileBase64}`;
  link.target = '_blank';
  link.click();
};

const handleDownload = (fileBase64, fileName) => {
  const link = document.createElement('a');
  link.href = `data:application/pdf;base64,${fileBase64}`;
  link.download = fileName;
  link.click();
};

  return (
    <div className="question-bank-container">
      <Navbar />
      <div className="question-bank-content">
        {/* Header */}
        <div className="header-section">
          <div className="header-content">
            <div className="header-text">
              <h1 className="page-title">Question Bank</h1>
              <p className="page-description">Practice and master concepts with our comprehensive question sets</p>
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

        {/* Search and Filters */}
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
                  placeholder="Search question sets, topics, or tags..."
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
            <div className="table-header">
              <h2 className="table-title">Question Sets ({filteredQuestionSets.length})</h2>
            </div>

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
                        <div className="subject-info">
                          <div className="subject-header">
                            <div className="subject-details">
                              <div className="subject-name-row">
                                <h3 className="subject-name">{set.subject}</h3>
                                <button
                                  onClick={() => toggleBookmark(set.id)}
                                  className={`bookmark-btn ${set.isBookmarked ? 'bookmark-active' : ''}`}
                                >
                                  <Star className={`bookmark-icon ${set.isBookmarked ? 'bookmark-filled' : ''}`} />
                                </button>
                              </div>
                              <p className="topic-name">{set.topic}</p>
                              <p className="question-title">{set.title}</p>
                            </div>
                          </div>
                        </div>
                      </td>


                      <td className="table-cell">
                        <div className="action-buttons">
                          <button className="action-btn action-btn-open" onClick={() => handleOpen(set.fileBase64)}>
                            <Play className="action-icon" />
                            Open
                          </button>

                          <button className="action-btn action-btn-download" onClick={() => handleDownload(set.fileBase64, set.title + '.pdf')}>
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

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid-container">
            {filteredQuestionSets.map((set) => (
              <div key={set.id} className="grid-card">
                <div className="card-header">
                  <div className="card-badges">
                    <span className="subject-badge">{set.subject}</span>
                    
                  </div>
                  <button
                    onClick={() => toggleBookmark(set.id)}
                    className={`bookmark-btn ${set.isBookmarked ? 'bookmark-active' : ''}`}
                  >
                    <Star className={`bookmark-icon ${set.isBookmarked ? 'bookmark-filled' : ''}`} />
                  </button>
                </div>

                <h3 className="card-title">{set.title}</h3>
                <p className="card-description">{set.description}</p>

                <div className="card-tags">
                  {set.tags.map((tag, index) => (
                    <span key={index} className="tag">#{tag}</span>
                  ))}
                </div>
                <div className="card-progress">
                  <div className="progress-bar">
                    
                  </div>
                  
                </div>

                <div className="card-actions">
                  <button className="card-action-btn card-action-primary">
                    <Lightbulb className="card-action-icon" />
                    Practice
                  </button>
                  <button className="card-action-btn card-action-secondary">
                    <Eye className="card-action-icon" />
                  </button>
                  <button className="card-action-btn card-action-secondary">
                    <Download className="card-action-icon" />
                  </button>
                </div>
              </div>
            ))}
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
              <p className="tip-description">
                Identify topics with lower completion rates and spend more time practicing them.
              </p>
            </div>
            <div className="tip-item">
              <h4 className="tip-title">⏰ Time Management</h4>
              <p className="tip-description">
                Use the estimated time as a guide to plan your study sessions effectively.
              </p>
            </div>
            <div className="tip-item">
              <h4 className="tip-title">📚 Regular Practice</h4>
              <p className="tip-description">
                Consistent daily practice with varied difficulty levels improves retention.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}