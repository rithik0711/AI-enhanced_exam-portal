import React, { useState, useEffect } from 'react';
import FacultyNav from './FacultyNav';
import  {UploadQn}  from './UploadQn';
import {QuestionBank} from './QuestionBank';
import './Faculty.css';
import { useNavigate } from 'react-router-dom';
// import EditSquareIcon from '@mui/icons-material/EditSquare';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';

export const Faculty = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');
  const navigate = useNavigate();

  const toggleTheme = () => setIsDark(prev => !prev);

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

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const user = JSON.parse(localStorage.getItem('user')) || {
    name: 'Rithikeswaran',
    email: 'rithikeswaran.it23@bitsathy.ac.in',
    picture: '',
    department: 'IT'
  };

  const profileImage = user.picture || '/images/default-profile.png';

  return (
    <div className="faculty-root">
      <FacultyNav />
      <div className="faculty-content">
        <h3>Welcome Back {user.name}!</h3>
        <p>Manage your question bank and track exam performance from your dashboard.</p>
        <div className="faculty-dashboard">
          <div className="faculty-box faculty-upload-box" onClick={() => navigate('/upload-exam')}>
            <AddRoundedIcon className="faculty-icon" />
            <h4>Upload Questions</h4>
            <p>Create and submit individual questions manually for your exam.</p>
          </div>
          <div className="faculty-box faculty-viewques">
            <DriveFileRenameOutlineIcon className="faculty-icon purple-icon" />
            <h4>Manage Uploaded Question</h4>
            <p>View, edit, or delete the questions you've uploaded manually.</p>
          </div>
          <div className="faculty-box faculty-uploadbank" onClick={() => navigate('/question-bank')}>
            <NoteAddIcon className="faculty-icon purple-icon" />
            <h4>Upload Question Bank</h4>
            <p>Bulk upload a set of questions using a PDF file.</p>
          </div>
          <div className="faculty-box faculty-viewbank">
            <DriveFileRenameOutlineIcon className="faculty-icon purple-icon" />
            <h4>Manage Question Bank</h4>
            <p>Browse and manage the full question bank uploaded by you.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faculty;
