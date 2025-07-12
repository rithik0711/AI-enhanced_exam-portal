import React from 'react';
import './Exam.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MenuBookIcon from '@mui/icons-material/MenuBook';
const upcomingExams = [
  {
    title: 'Mathematics Final Exam',
    subject: 'Advanced Calculus',
    date: '2024-01-15',
    time: '10:00 AM',
    duration: '120 min',
    status: 'upcoming',
    button: null,
  },
  {
    title: 'Physics Mid-term',
    subject: 'Quantum Mechanics',
    date: '2024-01-12',
    time: '2:00 PM',
    duration: '90 min',
    status: 'available',
    button: true,
  },
  {
    title: 'Computer Science Quiz',
    subject: 'Data Structures',
    date: '2024-01-10',
    time: '9:00 AM',
    duration: '60 min',
    status: 'available',
    button: true,
  },
];

const Exam = () => {
  const navigate = useNavigate();

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
              <input type="text" placeholder="Search exams..." />
            </div>
          </div>

          {/* Summary Boxes */}
          <div className="exam-summary">
            <div className="summary-card blue">
              <div className="icon"><CalendarMonthIcon /></div>
              <div>
                <p className="label">Total Exams</p>
                <h3>6</h3>
              </div>
            </div>
            <div className="summary-card orange">
              <div className="icon"><AccessTimeIcon /></div>
              <div>
                <p className="label">Ongoing</p>
                <h3>1</h3>
              </div>
            </div>
            <div className="summary-card green">
              <div className="icon"><EmojiEventsIcon /></div>
              <div>
                <p className="label">Completed</p>
                <h3>2</h3>
              </div>
            </div>
            <div className="summary-card purple">
              <div className="icon"><MenuBookIcon /></div>
              <div>
                <p className="label">Average Score</p>
                <h3>90%</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Exam Cards List */}
        {upcomingExams.map((exam, index) => (
          <div className="exam-card" key={index}>
            <div className="exam-info">
              <h3>{exam.title}</h3>
              <p className="subject">{exam.subject}</p>
              <div className="exam-meta">
                <span><CalendarMonthIcon fontSize="small" /> {exam.date}</span>
                <span><AccessTimeIcon fontSize="small" /> {exam.time}</span>
                <span><AccessTimeIcon fontSize="small" /> {exam.duration}</span>
              </div>
              <div className="tags">
                <span className={`tag ${exam.status}`}>{exam.status}</span>
              </div>
            </div>
            {exam.button && (
              <div className="exam-action">
                <button className="start-btn" onClick={() => navigate('/rules-chart')}>Start Exam ➤</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exam;
