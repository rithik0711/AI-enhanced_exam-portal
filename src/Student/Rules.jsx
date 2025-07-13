import React, { useState } from 'react';
import './Rules.css';
import { useNavigate } from 'react-router-dom';

const Rules = () => {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (agreed) {
      navigate('/start-exam'); // Replace '/exam' with your actual exam route
    }
  };

  return (
    <div className="rules-container">
      <h1 className="rules-title">Exam Rules & Guidelines</h1>
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
