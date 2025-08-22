import React, { useState } from 'react';
import FacultyNav from './FacultyNav';
import './UploadQn.css';

export const UploadQn = () => {
  const emptyQuestion = {
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    marks: 1,
  };

  const [questions, setQuestions] = useState([emptyQuestion]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Form states
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [numQuestions, setNumQuestions] = useState('');
  const [timing, setTiming] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  
  // Convert "20" to "00:20:00"
  const convertToSQLTime = (minutes) => {
    const mins = parseInt(minutes);
    const hrs = Math.floor(mins / 60);
    const remMins = mins % 60;
    return `${hrs.toString().padStart(2, '0')}:${remMins.toString().padStart(2, '0')}:00`;
  };

  // Schedule Exam
  const handleScheduleExam = async () => {
    if (!subject || !topic || !numQuestions || !timing || !difficulty || !totalMarks) {
      alert('Please fill all fields.');
      return;
    }

    const payload = {
      subject,
      topic,
      num_of_questions: parseInt(numQuestions),
      timing: convertToSQLTime(timing),
      difficulty_level: difficulty,
      total_marks: parseInt(totalMarks),
    };
    

    try {
      const res = await fetch('http://localhost:5050/faculty/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (res.ok) {
        alert('Exam scheduled successfully!');
      } else {
        alert('Failed to schedule exam: ' + result.error);
      }
    } catch (error) {
      console.error('Schedule Error:', error);
      alert('An error occurred while scheduling.');
    }
  };

  return (
    <>
      <div>
        <FacultyNav />
        <div className="upload-main">
          <h1>Schedule Exam</h1>
          {/* <h5>Create and manage exam questions for your courses</h5> */}

          <div className="subject">
            <div>
              <h3>Subject</h3>
              <input
                type="text"
                placeholder="e.g., Data Structures"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div>
              <h3>Topic</h3>
              <input
                type="text"
                placeholder="e.g., Binary Trees"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <div>
              <h3>No. of Questions</h3>
              <input
                type="text"
                placeholder="e.g., 20"
                value={numQuestions}
                onChange={(e) => setNumQuestions(e.target.value)}
              />
            </div>
            <div>
              <h3>Timing</h3>
              <input
                type="text"
                placeholder="e.g., 20 (minutes)"
                value={timing}
                onChange={(e) => setTiming(e.target.value)}
              />
            </div>
            <div>
              <h3>Difficulty Level</h3>
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option value="">Select</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div>
              <h3>Total Marks</h3>
              <input
                type="text"
                placeholder="e.g., 20 marks"
                value={totalMarks}
                onChange={(e) => setTotalMarks(e.target.value)}
              />
            </div>
          </div>

          <div className="button-group">
            <button className="cancel-btn">Cancel</button>
            <button className="save-btn" onClick={handleScheduleExam}>
              Schedule Exam
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadQn;
