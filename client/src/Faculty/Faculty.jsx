import React, { useState, useEffect } from 'react';
import FacultyNav from './FacultyNav';
import  {UploadQn}  from './UploadQn';
import {QuestionBank} from './QuestionBank';
import './Faculty.css';
import { useNavigate } from 'react-router-dom';
// import EditSquareIcon from '@mui/icons-material/EditSquare';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';


import NoteAddIcon from '@mui/icons-material/NoteAdd';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
const Faculty = () => {
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
        <h3>Welcome Back, {user.name}!</h3>
        <div className="faculty-dashboard">
          <div className="faculty-box faculty-upload-box" onClick={() => navigate('/upload-exam')}>
            <NoteAddIcon className="faculty-icon" />
            <h4>Schedule Exam</h4>
          </div>
          {/* <div className="faculty-box faculty-viewques">
            <NoteAddIcon className="faculty-icon purple-icon" />
            <h4>Manage Uploaded Question</h4>
          </div> */}
          <div className="faculty-box faculty-uploadbank" onClick={() => navigate('/question-bank')}>
            <AddToPhotosIcon className="faculty-icon purple-icon" />
            <h4>Upload Question Bank</h4>
          </div>
          <div className="faculty-box faculty-viewbank" onClick={() => navigate('/results-view')}>
            <WorkspacePremiumIcon className="faculty-icon purple-icon" />
            <h4>Student Result</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faculty;
