import React, { useState } from 'react';
import './Exam.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
const upcomingExams = [
  {
    title: 'Mathematics Final Exam',
    subject: 'Advanced Calculus',
    num_of_questions: 10,
    difficulty_level: 'easy',
    total_marks: 100,
    duration: '120 min',
    button: true,
  },
  {
    title: 'Physics Mid-term',
    subject: 'Quantum Mechanics',
    num_of_questions: 10,
    difficulty_level: 'medium',
    total_marks: 100,
    duration: '90 min',
    button: true,
  },
  {
    title: 'Computer Science Quiz',
    subject: 'Data Structures',
    num_of_questions: 10,
    difficulty_level: 'hard',
    total_marks: 100,
    duration: '60 min',
    button: true,
  },
];

const Exam = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredExams, setFilteredExams] = useState(upcomingExams);

  // Filter exams based on search term
  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
    const filtered = upcomingExams.filter(exam => 
      exam.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      exam.subject.toLowerCase().includes(searchValue.toLowerCase()) ||
      exam.difficulty_level.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredExams(filtered);
  };

  return (
    <div>
      <Navbar />
      <div className="exam-container">
        <h2>Exams</h2>

        {/* NEW WRAPPER */}
        <div className="exam-stats-wrapper">
          {/* Filter Tabs and Search Bar */}
          <div className="exam-filters">
            <div className="tabs">
              <span className="tab active">All <span className="count">6</span></span>
              <span className="tab">Upcoming Exam <span className="count">1</span></span>
              <span className="tab">Ongoing Exam <span className="count">1</span></span>
              <span className="tab">Completed <span className="count">2</span></span>
            </div>
            <div className="search-box">
              <input 
                type="text" 
                placeholder="Search exams..." 
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Exam Cards List */}
        {filteredExams.length > 0 ? (
          filteredExams.map((exam, index) => (
            <div className="exam-card" key={index}>
              <div className="exam-info">
                <h3>{exam.title}</h3>
                <p className="subject">{exam.subject}</p>
                <div className="exam-meta">
                  <span><FormatListNumberedIcon fontSize="small" /> {exam.num_of_questions}</span>
                  <span><EmojiEventsIcon fontSize="small" /> {exam.total_marks}</span>
                  <span><AccessTimeIcon fontSize="small" /> {exam.duration}</span>
                </div>
                <div className="tags">
                  <span className={`tag ${exam.difficulty_level}`}>{exam.difficulty_level}</span>
                </div>
              </div>
              {exam.button && (
                <div className="exam-action">
                  <button className="start-btn" onClick={() => navigate('/rules-chart')}>Start Exam ➤</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No exams found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Exam;
