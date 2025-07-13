import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FacultyNav.css';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SchoolIcon from '@mui/icons-material/School';
export const FacultyNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('');

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

    useEffect(() => {
        const path = window.location.pathname;
        if (path.includes('upload-exam')) setActiveTab('upload-exam');
        else if (path.includes('results-view')) setActiveTab('results-view');
        else if (path.includes('question-bank')) setActiveTab('question-bank');
        else setActiveTab('faculty');
    }, []);

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
        <div className="faculty-navbar">
            <div className="faculty-brand">
                <div className="faculty-logo"><SchoolIcon /></div>
                <h3 className="faculty-title">Exam Portal</h3>
            </div>

            <div className="faculty-header">
                <div className="faculty-nav">
                    {/* Left group */}
                    <div className="faculty-nav-group">
                        <div className={`faculty-nav-dash ${activeTab === 'faculty' ? 'active' : ''}`} onClick={() => { setActiveTab('faculty'); navigate('/faculty'); }}>
                            <HomeIcon />
                            <p>Dashboard</p>
                        </div>
                        <div className={`faculty-nav-exam ${activeTab === 'upload-exam' ? 'active' : ''}`} onClick={() => { setActiveTab('upload-exam'); navigate('/upload-exam'); }}>
                            <EditNoteIcon />
                            <p>Upload Exam</p>
                        </div>
                        <div className={`faculty-nav-ques ${activeTab === 'question-bank' ? 'active' : ''}`} onClick={() => { setActiveTab('question-bank'); navigate('/question-bank'); }}>
                            <CreditScoreIcon />
                            <p>Question Bank</p>
                        </div>
                    </div>

                    {/* Right group */}
                    <div className="faculty-nav-group right">
                        <div className={`faculty-nav-res ${activeTab === 'results-view' ? 'active' : ''}`} onClick={() => { setActiveTab('results-view'); navigate('/results-view'); }}>
                            <CreditScoreIcon />
                            <p>Result</p>
                        </div>

                        <div className="faculty-user">
                            <div
                                className="faculty-user-avatar"
                                onClick={() => setIsOpen(!isOpen)}
                                style={{ backgroundImage: `url(${profileImage})` }}
                            />
                            {isOpen && (
                                <div className="faculty-profile-box">
                                    <p>Name: {user.name}</p>
                                    <p>Email: {user.email}</p>
                                    <button className="faculty-close-btn" onClick={() => setIsOpen(false)}>
                                        <CloseIcon />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className={`faculty-theme-toggle ${isDark ? 'dark' : ''}`} onClick={toggleTheme}>
                            <LightModeIcon className="sun-faculty-theme-icon" />
                            <DarkModeIcon className="moon-faculty-theme-icon" />
                            <div className="faculty-toggle-thumb" />
                        </div>

                        <button className="faculty-logout-btn" onClick={handleLogout}>
                            <LogoutIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default FacultyNav;