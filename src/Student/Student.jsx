import React, { useState, useEffect } from 'react';
import './Student.css';
import Navbar from './Navbar'
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { useNavigate } from 'react-router-dom';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
export const Student = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('');
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const user = JSON.parse(localStorage.getItem('user')) || {
    name: 'Rithikeswaran',
    email: 'rithikeswaran.it23@bitsathy.ac.in',
    picture: '',
    department: 'IT'
  };

  return (
    
    <div className="capital">
      <div><Navbar /></div>
      <div className='content'>
        <h3 className='wel'>Welcome Back, {user.name}!</h3>
        <div className='box-name'>
          <div className={`box-exam attend-exam${activeTab === 'exam' ? 'active' : ''}`} onClick={() => {setActiveTab('exam');navigate('/exam')}}>
            <AssignmentIcon className="icon" />
            <h4>Exams</h4>
            <p>Click here to attend your upcoming exams...</p>
          </div>
          <div className={`box-question ${activeTab === 'question' ? 'active' : ''}`} onClick={() => {setActiveTab('question');navigate('/question')}}>
            <NoteAddIcon className="icon" />
            <h4>Question Bank</h4>
            <p>Browse Uploaded Questions</p>
          </div>
          <div className={`box-result ${activeTab === 'results' ? 'active' : ''}`} onClick={() => {setActiveTab('results');navigate('/results')}}>
            <WorkspacePremiumIcon className="icon" />
            <h4>Result</h4>
            <p></p>
          </div>
        </div>
        <div className="con">
          <div className="stat-box total-exams">
            <div className="stat-content">
              <h4>Upcoming Exams</h4>
              <p className="stat-value">6</p>
            </div>
            <MenuBookIcon className="stat-icon" />
          </div>

          <div className="stat-box avg-score">
            <div className="stat-content">
              <h4>Average Score</h4>
              <p className="stat-value">87%</p>
            </div>
            <MilitaryTechIcon className="stat-icon" />
          </div>

          <div className="stat-box high-score">
            <div className="stat-content">
              <h4>Completed</h4>
              <p className="stat-value">95%</p>
            </div>
            <EmojiEventsIcon className="stat-icon" />
          </div>

          <div className="stat-box total-marks">
            <div className="stat-content">
              <h4>Total Marks</h4>
              <p className="stat-value">520</p>
            </div>
            <WorkspacePremiumIcon className="stat-icon" />
          </div>
        </div>

          
      </div>
      

    </div>
  );
};

export default Student;
