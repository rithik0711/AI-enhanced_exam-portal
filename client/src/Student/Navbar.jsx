import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import EditNoteIcon from '@mui/icons-material/EditNote';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import SchoolIcon from '@mui/icons-material/School';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('');

  const toggleTheme = () => setIsDark(!isDark);

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

  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('exam')) setActiveTab('exam');
    else if (path.includes('results')) setActiveTab('results');
    else if (path.includes('question')) setActiveTab('question');
    else setActiveTab('student');
  }, []);

  const user = JSON.parse(localStorage.getItem('user')) || {
    name: 'Rithikeswaran',
    email: 'rithikeswaran.it23@bitsathy.ac.in',
    picture: '',
    department: 'IT'
  };

  return (
    <div className="navbar">
      <p className='img'><SchoolIcon/></p>
      <div className="head">
        <h3>Exam Portal</h3>
        <div className="nav">
          <div className={`dash ${activeTab === 'student' ? 'active' : ''}`} onClick={() => {{setActiveTab('student');navigate('/student');}}}>
            <HomeIcon />
            <p className="home">Dashboard</p>
          </div>
          <div className={`exam ${activeTab === 'exam' ? 'active' : ''}`} onClick={() => {setActiveTab('exam');navigate('/exam')}}>
            <EditNoteIcon />
            <p>Exam</p>
          </div>
          <div className={`question ${activeTab === 'question' ? 'active' : ''}`} onClick={() => {setActiveTab('question');navigate('/question')}}>
            <EditNoteIcon />
            <p>Question Bank</p>
          </div>
          <div className={`res ${activeTab === 'results' ? 'active' : ''}`} onClick={() => {setActiveTab('results');navigate('/results');}}>
            <CreditScoreIcon />
            <p>Result</p>
          </div>

          <div className='user'>
            <div className='detail'>
              {/* <p>{user.name}</p>
              <p>7376232IT239</p> */}
            </div>
            <div className='pro'> 
              <div
                className='profile'
                onClick={() => setIsOpen(!isOpen)}
                style={{ backgroundImage: `url(${user.picture || '/images/default-profile.png'})` }}
              ></div>
              {isOpen && (
                <div className="profile-box">
                  <p>Name: {user.name}</p>
                  <p>Email: {user.email}</p>
                  <p>Department: {user.department}</p>
                  <button className="close-btn" onClick={() => setIsOpen(false)}>
                    <CloseIcon />
                  </button>
                </div>
              )}
            </div>

            <button
              className={`theme-toggle-btn ${isDark ? 'dark' : 'light'}`}
              onClick={toggleTheme}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <LightModeIcon /> : <DarkModeIcon />}
            </button>

            <button className='logout' onClick={handleLogout}><LogoutIcon /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
