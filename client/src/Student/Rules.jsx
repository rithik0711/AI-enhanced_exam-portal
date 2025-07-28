import React, { useState } from 'react';
import './Rules.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Rules = () => {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const examData = location.state?.examData;

  const handleSubmit = () => {
    if (agreed) {
      // Pass the exam data to the exam interface
      navigate('/start-exam', { 
        state: { examData: examData }
      });
    }
  };

  return (
    <div className="rules-container">
      <h1 className="rules-title">Exam Rules & Guidelines</h1>
      
      {/* Display exam information if available */}
      {examData && (
        <div className="exam-info">
          <h2>{examData.title}</h2>
          <div className="exam-details">
            <p><strong>Subject:</strong> {examData.subject}</p>
            <p><strong>Topic:</strong> {examData.topic}</p>
            <p><strong>Questions:</strong> {examData.num_of_questions}</p>
            <p><strong>Level:</strong> {examData.difficulty_level}</p>
            <p><strong>Duration:</strong> {examData.duration}</p>
          </div>
        </div>
      )}
      <ul className="rules-list">
        <li>Ensure your webcam is active throughout the exam.</li>
        <li>Maintain a stable internet connection.</li>
        <li>Avoid switching tabs or windows during the exam.</li>
        <li>Do not use external help or electronic devices.</li>
        <li>Each question is time-tracked and auto-submitted on timeout.</li>
        <li>Leaving the camera frame may trigger alerts.</li>
        <li>Use only one device to access the exam.</li>
        <li>Do not copy, screenshot, or record exam content.</li>
        <li>Answers once submitted cannot be changed.</li>
        <li>Any violation may lead to disqualification.</li>
      </ul>

      <div className="terms-container">
        <label>
          <input
            type="checkbox"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
          />
          &nbsp;I accept the Terms and Conditions.
        </label>
      </div>

      <button
        className="submit-btn"
        onClick={handleSubmit}
        disabled={!agreed}
      >
        Start Exam
      </button>
    </div>
  );
};

export default Rules;
