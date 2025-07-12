import React, { useState } from 'react';
import FacultyNav from './FacultyNav';
import './UploadQn.css';

export const UploadQn = () => {
  const emptyQuestion = {
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    marks: 1
  };

  const [questions, setQuestions] = useState([emptyQuestion]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const addQuestionHandler = () => {
    if (questions.length < 20) {
      setQuestions([...questions, emptyQuestion]);
      setCurrentIndex(questions.length); // move to new question
    } else {
      alert("Maximum of 20 questions reached.");
    }
  };

  const handleChange = (field, value) => {
    const updated = [...questions];
    if (field === 'question') updated[currentIndex].question = value;
    if (field === 'correctAnswer') updated[currentIndex].correctAnswer = value;
    if (field === 'marks') updated[currentIndex].marks = value;
    setQuestions(updated);
  };

  const handleOptionChange = (index, value) => {
    const updated = [...questions];
    updated[currentIndex].options[index] = value;
    setQuestions(updated);
  };

  const goToPrevious = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  const goToNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(prev => prev + 1);
  };
  const handleSave = async () => {
  if (!subject || !topic || !fileData) {
    alert('Please fill all fields and upload a PDF file.');
    return;
  }

  const fileInput = document.getElementById('file-upload');
  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append('subject', subject);
  formData.append('topic', topic);
  formData.append('pdfFile', file);

  try {
    const res = await fetch('http://localhost:5000/faculty/upload', {
      method: 'POST',
      body: formData
    });

    if (res.ok) {
      alert('Question uploaded successfully!');
      setSubject('');
      setTopic('');
      setFileName('');
      setFileData('');
    } else {
      alert('Upload failed');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error uploading question');
  }
};

  return (
    <>
      <div>
        <FacultyNav />
        <div className="upload-main">
          <h1>Upload Questions</h1>
          <h5>Create and manage exam questions for your courses</h5>

          <div className="upload-method">
            <h3>Upload Method</h3>
            <button>Manual entry</button>
          </div>


          <div className="subject">
            <div>
              <h3>Subject</h3>
              <input type="text" placeholder="e.g., Data Structures" />
            </div>
            <div>
              <h3>Topic</h3>
              <input type="text" placeholder="e.g., Binary Trees" />
            </div>
            <div>
              <h3>Timing</h3>
              <input type="text" placeholder='e.g., 20 min'/>
            </div>
            <div>
              <h3>No. of Questions</h3>
              <input type="text" placeholder='e.g., 20'/>
            </div>
            <div>
              <h3>Total Marks</h3>
              <input type="text" placeholder='e.g., 20 marks'/>
            </div>
            
          </div>

          <div className='button-group'>
              <button className="cancel-btn">Cancel</button>
              <button
                className="save-btn"
                onClick={() => {
                  localStorage.setItem('uploadedExamQuestions', JSON.stringify(questions));
                  alert("Questions saved successfully!");
                }}
              >
                Schedule Exam
              </button>

            </div>
        </div>
      </div>
    </>
  );
};

export default UploadQn;
