import React, { useState, useEffect, useRef } from 'react';
import { Clock, ChevronLeft, ChevronRight, CheckCircle, AlertCircle, X, RotateCcw, Send } from 'lucide-react';
import './ExamInterface.css';
import { useNavigate, useLocation } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';

export default function ExamInterface({ examId, onExamComplete, onExitExam }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1200);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [examMeta, setExamMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);

  // Helper function to parse duration string to seconds
  const parseDurationToSeconds = (duration) => {
    if (!duration) return 1200; // Default 20 minutes
    
    if (typeof duration === 'string' && duration.includes(':')) {
      const parts = duration.split(':');
      const hours = parseInt(parts[0]) || 0;
      const minutes = parseInt(parts[1]) || 0;
      const seconds = parseInt(parts[2]) || 0;
      return hours * 3600 + minutes * 60 + seconds;
    }
    
    // If it's just a number, assume it's minutes
    const minutes = parseInt(duration);
    return minutes * 60;
  };

  // Fallback sample questions
  const getSampleQuestions = () => {
    return [
      {
        id: 1,
        question: `Sample question for ${examMeta?.subject || 'this subject'}`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: 0
      }
    ];
  };

  // Generate questions for the current exam
  const generateQuestionsForExam = async () => {
    try {
      if (!examMeta) {
        console.log('⚠️ No examMeta available for question generation');
        return;
      }
      await generateQuestionsForExamWithData(examMeta);
    } catch (error) {
      console.error('❌ Error in generateQuestionsForExam:', error);
    }
  };

  // Generate questions with exam data parameter
  const generateQuestionsForExamWithData = async (examData) => {
    try {
      console.log('🤖 Calling backend to generate questions from schedule_exam data:', examData);
      const response = await fetch(`http://localhost:5000/api/generate-questions-from-schedule/${examData.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Response not OK from your backend:', response.status, errorText);
        throw new Error(`Failed to generate questions from schedule: ${response.status}`);
      }
      const data = await response.json();
      console.log('📝 Questions response from schedule:', data);
      setQuestions(data || []);
    } catch (error) {
      console.error('❌ Error generating questions from schedule:', error);
      setQuestions(getSampleQuestions(examMeta?.subject, examMeta?.topic));
    }
  };

  useEffect(() => {
    async function fetchExamData() {
      setLoading(true);
      setError(null);
      try {
        const examDataFromState = location.state?.examData;
        let examData;
        if (examDataFromState) {
          examData = examDataFromState;
        } else {
          const res = await fetch('http://localhost:5000/student/schedule');
          const exams = await res.json();
          const exam = exams.find(e => e.id === examId);
          if (!exam) throw new Error('Exam not found');
          examData = exam;
        }
        if (examData.duration) {
          const durationInSeconds = parseDurationToSeconds(examData.duration);
          setTimeLeft(durationInSeconds);
        }
        setExamMeta(examData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchExamData();
  }, [examId, location.state]);

  useEffect(() => {
    if (examMeta) {
      generateQuestionsForExamWithData(examMeta);
    }
  }, [examMeta]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleBlur = () => alert('⚠️ Switching tabs is not allowed!');
    window.addEventListener('blur', handleBlur);
    return () => window.removeEventListener('blur', handleBlur);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmitExam();
    }
  }, [timeLeft]);

  // All hooks at the top
  useEffect(() => {
    const enterFullScreen = () => {
      const el = document.documentElement;
      if (el.requestFullscreen) el.requestFullscreen();
      else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      else if (el.msRequestFullscreen) el.msRequestFullscreen();
    };

    // const exitFullScreen = () => {
    //   if (document.exitFullscreen) document.exitFullscreen();
    //   else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
    //   else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    //   else if (document.msExitFullscreen) document.msExitFullscreen();
    // };

    const isFullScreen = () =>
      document.fullscreenElement || document.webkitFullscreenElement ||
      document.mozFullScreenElement || document.msFullscreenElement;

    // Enter fullscreen on mount
    enterFullScreen();

    const handleKeyDown = (e) => {
      // Disable clipboard shortcuts
      if (e.ctrlKey && ['v', 'c', 'x', 'a'].includes(e.key.toLowerCase())) {
        e.preventDefault();
        return;
      }

      // ESC key handling
      // if (e.key === 'Escape') {
      //   if (isFullScreen()) {
      //     exitFullScreen();
      //   } else {
      //     window.history.back();
      //   }
      // }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // if (isFullScreen()) {
      //   exitFullScreen();
      // }
    };
  }, []);

  // Dynamic exam data from props or state
  const examData = {
    title: examMeta?.title || examMeta?.subject || 'Exam',
    subject: examMeta?.subject || 'Subject',
    totalQuestions: examMeta?.num_of_questions || questions.length || 0,
    duration: examMeta?.duration || '00:30:00',
    questions: questions
  };

  // Show loading state while fetching exam data
  if (loading) {
    return (
      <div className="exam-interface">
        <p>Loading exam...</p>
      </div>
    );
  }

  // Show error state if there's an error
  if (error) {
    return (
      <div className="exam-interface">
        <p>Error: {error}</p>
        <button onClick={() => navigate('/exam')}>Go Back</button>
      </div>
    );
  }

  // Show message if no exam data
  if (!examMeta) {
    return (
      <div className="exam-interface">
        <p>No exam data found.</p>
        <button onClick={() => navigate('/exam')}>Go Back</button>
      </div>
    );
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (optionIndex) => {
    setAnswers({
      ...answers,
      [currentQuestion]: optionIndex.toString()
    });
  };

  const handleClearChoice = () => {
    const newAnswers = { ...answers };
    delete newAnswers[currentQuestion];
    setAnswers(newAnswers);
  };

  const handleQuestionNavigation = (questionIndex) => {
    setCurrentQuestion(questionIndex);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < examData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmitExam = async () => {
    // Stop recording before submitting
    // await stopRecording(); // Removed camera/recording logic
    
    const score = calculateScore();
    onExamComplete({
      examId,
      score,
      answers,
      timeSpent: 3600 - timeLeft,
      totalQuestions: examData.totalQuestions
    });
  };

  const calculateScore = () => {
    let correct = 0;
    examData.questions.forEach((question, index) => {
      if (answers[index] && parseInt(answers[index]) === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / examData.questions.length) * 100);
  };

  const getQuestionStatus = (index) => {
    if (answers[index] !== undefined) {
      return 'completed';
    }
    if (index === currentQuestion) {
      return 'current';
    }
    return 'not-completed';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="status-icon" />;
      case 'current': return <div className="current-indicator" />;
      default: return null;
    }
  };

  const answeredCount = Object.keys(answers).length;
  const unansweredCount = examData.questions.length - answeredCount;

  // Submit Dialog
  if (showSubmitDialog) {
    return (
      <div className="dialog-overlay">
        <div className="dialog-container">
          <div className="dialog-content">
            <h3 className="dialog-title">Submit Exam?</h3>
            <p className="dialog-text">
              Are you sure you want to submit your exam? This action cannot be undone.
            </p>
            <div className="stats-container">
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number answered">{answeredCount}</div>
                  <div className="stat-label">Answered</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number unanswered">{unansweredCount}</div>
                  <div className="stat-label">Unanswered</div>
                </div>
              </div>
            </div>
            <div className="dialog-buttons">
              <button
                onClick={() => setShowSubmitDialog(false)}
                className="btn btn-secondary"
              >
                Continue Exam
              </button>
              <button
                onClick={handleSubmitExam}
                className="btn btn-primary"
              >
                <Send className='sub-icon'/>
                Submit Exam
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Exit Dialog
  if (showExitDialog) {
    return (
      <div className="dialog-overlay">
        <div className="dialog-container">
          <div className="dialog-content">
            <div className="dialog-icon exit-icon">
              <AlertCircle className="icon-large" />
            </div>
            <h3 className="dialog-title">Exit Exam?</h3>
            <p className="dialog-text">
              Are you sure you want to exit? Your progress will be lost and you cannot resume this exam.
            </p>
            <div className="dialog-buttons">
              <button
                onClick={() => setShowExitDialog(false)}
                className="btn btn-secondary"
              >
                Stay in Exam
              </button>
              <button
                onClick={async () => {
                  // await stopRecording(); // Removed camera/recording logic
                  navigate('/exam');
                }}
                className="btn btn-danger"
              >
                Exit Exam
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestionData = examData.questions[currentQuestion];

  return (
    <div className="exam-container">
      {/* Header */}
      <div className="exam-header">
        <div className="header-content">
          <div className="header-left">
            <div className="exam-info">
              <h1 className="exam-subject">{examData.subject}</h1>
              <h3 className="exam-topic">{examData.topic}</h3>
            </div>
          </div>
          
          
          <div className="header-right">
            <div className="timer-container">
              <Clock className="timer-icon" />
              <span className={`timer ${timeLeft < 300 ? 'timer-critical' : timeLeft < 900 ? 'timer-warning' : ''}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
            
            <button
              onClick={() => setShowExitDialog(true)}
              className="exit-btn"
              title="Exit Exam"
            >
              <X className="exit-icon" />
            </button>
          </div>
        </div>
      </div>
      <div className="exam-content">
        <div className="exam-grid">
          {/* Question Navigation Panel */}
          <div className="navigation-panel">
            <div className="nav-container">
              <div className="nav-header">
                <h3 className="nav-title">Questions</h3>
                <span className="nav-counter">{currentQuestion + 1}/{examData.totalQuestions}</span>
              </div>
              
              {/* Question Grid */}
              <div className="question-grid">
                {Array.from({ length: examData.totalQuestions }, (_, index) => {
                  const status = getQuestionStatus(index);
                  return (
                    <button
                      key={index}
                      onClick={() => handleQuestionNavigation(index)}
                      className={`question-btn ${status}`}
                      title={`Question ${index + 1} - ${status.replace('-', ' ')}`}
                    >
                      <span className="question-number">{index + 1}</span>
                      <div className="question-status-icon">
                        {getStatusIcon(status)}
                      </div>
                    </button>
                  );
                })}
              </div>
              
              {/* Legend */}
              <div className="legend">
                <div className="legend-item">
                  <div className="legend-color com"></div>
                  <span>Answered ({answeredCount})</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color current"></div>
                  <span>Current</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color not-completed"></div>
                  <span>Not Answered ({unansweredCount})</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={() => setShowSubmitDialog(true)}
                className="submit-btn"
              >
                <Send className="submit-icon" />
                Submit Exam
              </button>
            </div>
          </div>

          {/* Question Content */}
          <div className="question-panel">
            <div className="question-container">
              {/* Question Header */}
              <div className="question-header">
                <div className="question-header-left">
                  <h2 className="question-title">
                    Question {currentQuestion + 1}
                  </h2>
                </div>
              </div>

              {/* Question Content */}
              <div className="question-content">
                <div className="question-text">
                  <p>{currentQuestionData?.question}</p>
                </div>

                {/* Options */}
                <div className="options-container">
                  {currentQuestionData?.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`option-btn ${answers[currentQuestion] === index.toString() ? 'selected' : ''}`}
                    >
                      <div className="option-content">
                        <div className={`option-indicator ${answers[currentQuestion] === index.toString() ? 'selected' : ''}`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="option-text">{option}</span>
                        {answers[currentQuestion] === index.toString() && (
                          <CheckCircle className="option-check" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Clear Choice Button */}
                {answers[currentQuestion] !== undefined && (
                  <div className="clear-section">
                    <button
                      onClick={handleClearChoice}
                      className="clear-btn"
                    >
                      <RotateCcw className="clear-icon" />
                      Clear Choice
                    </button>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="navigation-footer">
                <div className="nav-controls">
                  <button
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestion === 0}
                    className="nav-btn prev-btn"
                  >
                    <ChevronLeft className="nav-icon" />
                    Previous
                  </button>

                  <div className="nav-progress">
                    <span className="nav-text">
                      {currentQuestion + 1} of {examData.totalQuestions}
                    </span>
                  </div>

                  <button
                    onClick={handleNextQuestion}
                    disabled={currentQuestion === examData.questions.length - 1}
                    className="nav-btn next-btn"
                  >
                    Next
                    <ChevronRight className="nav-icon" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}