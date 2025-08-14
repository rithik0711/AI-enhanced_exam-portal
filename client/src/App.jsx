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
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/student'); // Regular login button
  };

  return (
    <div className='app'>
      <div className='body-main'>
        <div className='main1'>
          <img src="/images/img1.jpg" alt="" />
          <img src="/images/img2.jpg" alt="" />
          <img src="/images/img3.jpg" alt="" />
          <img src="/images/img13.jpg" alt="" className='last'/>
        </div>
        <div className='main2'>
          <img src="/images/img4.jpg" alt="" />
          <img src="/images/img5.jpg" alt="" />
          <img src="/images/img6.jpg" alt="" />
          <img src="/images/img16.jpg" alt="" className='last'/>
        </div>
        <div className='main3'>
          <img src="/images/img7.jpg" alt="" />
          <img src="/images/img8.jpg" alt="" />
          <img src="/images/img21.jpg" alt="" />
          <img src="/images/img14.jpg" alt="" className='last'/>
        </div>
        <div className='main5'>
          <img src="/images/img13.jpg" alt="" />
          <img src="/images/img14.jpg" alt="" />
          <img src="/images/img15.jpg" alt="" />
          <img src="/images/img18.jpg" alt="" className='last'/>
        </div>  
        <div className='main3'>
          <img src="/images/img17.jpg" alt="" />
          <img src="/images/img11.jpg" alt="" />
          <img src="/images/img12.jpg" alt="" />
          <img src="/images/img19.jpg" alt="" />
          <img src="/images/img17.jpg" alt="" />
        </div>
      </div>
      
      <div className="container">
        
        <div className="folder">
        
          <div className="main">
            <div className="head">
              <p className='img'><SchoolIcon/></p>
              <h1>Exam Portal</h1>
            </div>
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
            <div className='soc-media'>
                <a href="http://localhost:5000/auth/github" className='git'><GitHubIcon /></a>
                <a href="http://localhost:5000/auth/linkedin" className='link'><LinkedInIcon /></a>
                <a href="http://localhost:5000/auth/facebook" className='face'><FacebookIcon /></a>
            </div>
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
        {/* <Route path="/exam-interface" element={<ExamInterface />} /> */}

      </Routes>
    </Router>
  );
};

export default App;
