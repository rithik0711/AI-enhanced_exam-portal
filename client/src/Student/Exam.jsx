import React, { useState, useEffect } from 'react';
import './Exam.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import PageWrapper from '../components/PageWrapper';
import { useResponsive } from '../hooks/useResponsive';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

const Exam = () => {
  const navigate = useNavigate();
  const { isMobile, isTablet } = useResponsive();
  const [searchTerm, setSearchTerm] = useState('');
  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch exams from backend
  const fetchExams = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:5050/student/schedule');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📥 Received exams data:', data);
      
      // Log each exam's timing data
      data.forEach((exam, index) => {
        console.log(`📋 Exam ${index + 1}:`, {
          id: exam.id,
          title: exam.title,
          duration: exam.duration,
          durationType: typeof exam.duration,
          rawDuration: exam.duration
        });
      });
      
      setExams(data);
      setFilteredExams(data);
    } catch (err) {
      console.error('❌ Failed to fetch exams:', err);
      setError('Failed to load exams. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  // Filter exams based on search term
  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
    const filtered = exams.filter(exam => 
      exam.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      exam.subject.toLowerCase().includes(searchValue.toLowerCase()) ||
      exam.topic.toLowerCase().includes(searchValue.toLowerCase()) ||
      exam.difficulty_level.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredExams(filtered);
  };

  // Format duration from HH:MM:SS to readable format
  const formatDuration = (duration, numQuestions) => {
    if (!duration || duration === null || duration === undefined || duration === '00:00:00') {
      // fallback: use numQuestions
      const mins = parseInt(numQuestions) || 1;
      return `${mins} min`;
    }
    // Convert to string if it's a number
    const durationStr = String(duration);
    if (durationStr.includes(':')) {
      const parts = durationStr.split(':');
      const hours = parseInt(parts[0]) || 0;
      const minutes = parseInt(parts[1]) || 0;
      const totalMinutes = hours * 60 + minutes;
      return `${totalMinutes} min`;
    }
    const numMinutes = parseInt(durationStr);
    if (!isNaN(numMinutes)) {
      return `${numMinutes} min`;
    }
    return `${durationStr} min`;
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <PageWrapper>
          <h2 className='exam-title'>Exams</h2>
          <div className="loading-state">
            <p>Loading exams...</p>
            {/* <Loading /> */}
          </div>
        </PageWrapper>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <PageWrapper>
          <h2 className='exam-title'>Exams</h2>
          <div className="error-state">
            <p>{error}</p>
            <button onClick={fetchExams}>
              Retry
            </button>
          </div>
        </PageWrapper>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <PageWrapper>
        <h2 className='exam-title'>Exams</h2>
        <div className="exam-stats-wrapper">
          {/* Filter Tabs and Search Bar */}
          <div className="exam-filters">
            <div className="tabs">
              <span className="tab active">All <span className="count">{exams.length}</span></span> 
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
          <div className={`exam-cards-grid ${isMobile ? 'exam-cards-mobile' : ''}`}>
            {filteredExams.map((exam, index) => (
              <div className="exam-card" key={exam.id || index}>
                <div className="exam-info">
                  <h3>{exam.title}</h3>
                  <div className="exam-meta">
                    <span><FormatListNumberedIcon fontSize="small" /> {exam.num_of_questions} Questions</span>
                    <span><EmojiEventsIcon fontSize="small" /> {exam.total_marks} Marks</span>
                    <span><AccessTimeIcon fontSize="small" /> {formatDuration(exam.duration, exam.num_of_questions)}</span>
                  </div>
                  <div className="tags">
                    <span className={`tag ${exam.difficulty_level}`}>{exam.difficulty_level}</span>
                    <span className="tag topic">{exam.topic}</span>
                  </div>
                </div>
                <div className="exam-action">
                  <button className="start-btn" onClick={() => navigate('/rules-chart', { 
                    state: { 
                      examData: {
                        id: exam.id,
                        subject: exam.subject,
                        topic: exam.topic,
                        num_of_questions: exam.num_of_questions,
                        difficulty_level: exam.difficulty_level,
                        total_marks: exam.total_marks,
                        duration: exam.duration,
                        title: exam.title
                      }
                    }
                  })}>Start Exam ➤</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>No exams found matching "{searchTerm}"</p>
            <button onClick={() => handleSearch('')} className="clear-search-btn">
              Clear Search
            </button>
          </div>
        )}
      </PageWrapper>
    </div>
  );
};

export default Exam;
