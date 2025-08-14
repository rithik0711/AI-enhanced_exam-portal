import React, { useState, useEffect } from 'react';
import './Student.css';
import Navbar from './Navbar';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { useNavigate } from 'react-router-dom';

export const Student = () => {
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');
  const [activeTab, setActiveTab] = useState('');
  const navigate = useNavigate();

  // For typewriter effect
  const user = JSON.parse(localStorage.getItem('user')) || {
    name: 'Rithikeswaran',
    email: 'rithikeswaran.it23@bitsathy.ac.in',
    picture: '',
    department: 'IT'
  };
  const name = user?.name ?? 'Student';
  const fullText = `Weelcome Back, ${name}!`; // fixed typo
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(prev => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 80);
  
    return () => clearInterval(timer);
  }, []); // ✅ run only once


  // Theme handler
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

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="capital">
      <div><Navbar /></div>
      <div>
        <div className='con'>
          <div className='con1'>
            <img src="/images/img17.jpg" alt="" />
            <img src="/images/img14.jpg" alt="" />
            <img src="/images/img13.jpg" alt="" />
          </div>
          <div className='con2'>
            <img src="/images/img21.jpg" alt="" />
            <img src="/images/img20.jpg" alt="" />
            <img src="/images/img11.jpg" alt="" />
          </div>
          <div className='con3'>
            <img src="/images/img3.jpg" alt="" />
            <img src="/images/img16.jpg" alt="" />
            <img src="/images/img15.jpg" alt="" />
          </div>
          <div className='con4'>
            <img src="/images/img13.jpg" alt="" />
            <img src="/images/img2.jpg" alt="" />
            <img src="/images/img8.jpg" alt="" />
          </div>
          <div className='con5'>
            <img src="/images/img9.jpg" alt="" />
            <img src="/images/img7.jpg" alt="" />
            <img src="/images/img4.jpg" alt="" />
          </div>
        </div>
        <div className='content'>
          <h3 className='wel'>
            {displayText}
          </h3>

          <div className='box-name'>
            <div className={`box-exam attend-exam${activeTab === 'exam' ? 'active' : ''}`} 
              onClick={() => {setActiveTab('exam');navigate('/exam')}}>
              <AssignmentIcon className="icon" />
              <h4>Exams</h4>
              <p>Click here to attend your upcoming exams...</p>
            </div>

            <div className={`box-question ${activeTab === 'question' ? 'active' : ''}`} 
              onClick={() => {setActiveTab('question');navigate('/question')}}>
              <NoteAddIcon className="icon" />
              <h4>Question Bank</h4>
              <p>Browse Uploaded Questions</p>
            </div>

            <div className={`box-result ${activeTab === 'results' ? 'active' : ''}`} 
              onClick={() => {setActiveTab('results');navigate('/results')}}>
              <WorkspacePremiumIcon className="icon" />
              <h4>Result</h4>
              <p></p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Student;
