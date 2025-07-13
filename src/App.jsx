import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Student from './Student/Student';
import Faculty from './Faculty/Faculty';
import Question from './Student/Question'
import Exam from './Student/Exam';
import Results from './Student/Results'; // 👈 Update the path if your Results.jsx file is located elsewhere
import UploadQn from './Faculty/UploadQn';
import QuestionBank from './Faculty/QuestionBank';
import { jwtDecode } from "jwt-decode";
import SchoolIcon from '@mui/icons-material/School';
import { ResultsView } from './Faculty/ResultsView';
import  ExamInterface  from './Student/ExamInterface';
import  Rules  from './Student/Rules';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/student'); // Regular login button
  };

  return (
    <div className="container">
      <div className="head">
        <img src="/images/BIT.png" alt="BIT Logo" />
        <h1>Exam Portal</h1>
      </div>
      <div className="folder">
        <div className="main">
          <h2>Login Page</h2>

          <div className="email">
            <label htmlFor="email">Email</label>
            <input type="text" />
          </div>
          <div className="pass">
            <label htmlFor="password">
              Password
              <p><a href="#" className="forgot">Forgot password?</a></p>
            </label>
            <input type="password" />
          </div>
          <button className="login" onClick={handleLogin}><p>Login</p></button>

          <p className='or'>----- or continue with -----</p>

          <div className="google-login">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const decoded = jwtDecode(credentialResponse.credential);
                const userEmail = decoded.email;
                const userName = decoded.name;
                const userPic = decoded.picture;

                const localPart = userEmail.split('@')[0];
                const shortDept = localPart.includes('.') ? localPart.split('.')[1].substring(0, 2).toUpperCase() : 'Unknown';

                const departmentMap = {
                  IT: "Information Technology",
                  CS: "Computer Science",
                  EC: "Electronics and Communication",
                  EE: "Electrical Engineering",
                  ME: "Mechanical Engineering",
                  CE: "Civil Engineering",
                  AG: "Agriculture Engineering"
                };

                const department = departmentMap[shortDept] || 'Unknown';

                console.log('Name:', userName);
                console.log('Email:', userEmail);
                console.log('Department:', department);

                // Save user data
                localStorage.setItem('user', JSON.stringify({
                  name: userName,
                  email: userEmail,
                  picture: userPic,
                  department: department,
                }));

                const bitsDomain = "@bitsathy.ac.in";
                const gmailDomain = "@gmail.com";

                if (userEmail.endsWith(bitsDomain)) {
                  if (/\.\w{2,6}$/.test(localPart)) {
                    navigate('/student');
                  } else {
                    navigate('/faculty');
                  }
                } else if (userEmail.endsWith(gmailDomain)) {
                  navigate('/faculty');
                } else {
                  alert("Access Denied: Only bitsathy.ac.in or gmail.com emails allowed.");
                }
              }}
              onError={() => {
                console.log("Login Failed");
                alert("Google login failed. Try again.");
              }}
            />
          </div>
        </div>

        <div className="system-img">
          <div className='icon'>
            <SchoolIcon />
          </div>
          <div>
            <h3>Welcome to Exam Portal</h3>
            <p>Access your exams securely and efficiently.
              Track your progress and achieve academic excellence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student" element={<Student />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path='/question' element={<Question />}/>
        <Route path="/exam" element={<Exam />} />
        <Route path="/results" element={<Results />} />
        <Route path="/upload-exam" element={<UploadQn />} />
        <Route path='/question-bank' element={<QuestionBank />}/>
        <Route path="/results-view" element={<ResultsView />} />
        <Route path='/start-exam' element={<ExamInterface />} />
        <Route path='/rules-chart' element={<Rules />}/>
      </Routes>
    </Router>
  );
};

export default App;
