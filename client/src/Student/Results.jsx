import React , { useState, useEffect } from 'react';
import './Results.css';
import Navbar from './Navbar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SearchIcon from '@mui/icons-material/Search';
const examResults = [
  {
    title: 'Mathematics Final Exam',
    subtitle: 'Advanced Calculus',
    date: '2024-01-08',
    score: '92/100',
    percentage: '92%',
    timeTaken: '115m',
    allowedTime: '120m',
  },
  {
    title: 'Physics Mid-term',
    subtitle: 'Quantum Mechanics',
    date: '2024-01-05',
    score: '88/100',
    percentage: '88%',
    timeTaken: '87m',
    allowedTime: '90m',
  },
  {
    title: 'Chemistry Quiz',
    subtitle: 'Organic Chemistry',
    date: '2024-01-03',
    score: '95/100',
    percentage: '95%',
    timeTaken: '55m',
    allowedTime: '60m',
  },
  {
    title: 'Biology Test',
    subtitle: 'Cell Biology',
    date: '2023-12-28',
    score: '85/100',
    percentage: '85%',
    timeTaken: '70m',
    allowedTime: '75m',
  },
];

const Results = () => {
    const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div>
      <Navbar />
      <div className="results-container">
        <div className="results-header">
          <h2>Exam Results</h2>
        </div>
        <div className="performance-intro">
          <div className="intro-icon">
            <EmojiEventsIcon className='tropy-icon' />
          </div>
          <h1>Student Performance</h1>
          <p>Track your learning journey and celebrate your achievements across all subjects</p>
        </div>
        <div className="srh-containers">
          <label className="filter-labels">Search</label>
          <div className="search-input-wrappers">
            <SearchIcon className="search-icons" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-inp"
              placeholder="Search question sets, topics, or tags..."
            />
          </div>
        </div>

        <table className="results-table">
          <thead>
            <tr>
              <th>Exam Details</th>
              <th>Score</th>
              <th>Percentage</th>
              <th>Time</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {examResults.map((exam, index) => (
              <tr key={index}>
                <td>
                  <strong>{exam.title}</strong><br />
                  <span className="subtitle">{exam.subtitle}</span><br />
                </td>
                <td>
                  <strong>{exam.score}</strong><br />
                </td>
                <td><strong>{exam.percentage}</strong></td>
                <td>
                  <AccessTimeIcon fontSize="small" /> {exam.timeTaken}
                  <div className="allowed">({exam.allowedTime} allowed)</div>
                </td>
                <td><span className="date">📅 {exam.date}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Results;
