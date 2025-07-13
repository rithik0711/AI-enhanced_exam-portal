import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';
const Signup = () => {
  const [userData, setUserData] = useState({
    email:"", password:"", confirm_password:""
  });
  const handleChange = (e) =>{
    setUserData({ ...userData,[e.target.name]: e.target.value});
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(userData.password !== userData.confirm_password){
      alert("Passwords don't match");
      return;
    }
    console.log("Userdata Submitted", userData);
  }
  return (
    <div className="container">
    <div className="sub">
      <h2>Signup Page</h2>
      <p>Already have an account? <Link to="/">Login</Link></p>
      <form onSubmit={handleSubmit}>
        <div className="email">
          <label htmlFor="email">Email</label>
          <input type="text" value={userData.email} name="email" onChange={handleChange} required/>
        </div>
        <div className="pass">
          <label htmlFor="password">Password</label>
          <input type="password" value={userData.password} name="password" onChange={handleChange} required/>
        </div>
        <div className="pass">
          <label htmlFor="confirm_password">Confirm Password</label>
          <input type="password" value={userData.confirm_password} name="confirm_password" onChange={handleChange} required/>
        </div>
          <button className="signup-button" type="submit">Signup</button>
      </form>
        <button className="google"><img src="/images/google.png" alt="Google Image" />Continue with Google</button>
    </div>
    <div><img src="/images/pic.png" alt="" className="pic-img" /></div>
    </div>
  );
};
export default Signup;
