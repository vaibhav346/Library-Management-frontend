import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import './StudentRegister.css';

const StudentLogin = () => {
  const [credentials, setCredentials] = useState({
    studentusername: '',
    studentpassword: '',
  });

  var app="http://51.20.187.166:8080/Library_Management_Project-0.0.1-SNAPSHOT"

  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${app}/Student/login`, // Ensure this URL is correct
        credentials, // Pass credentials to the backend
        { headers: { 'Content-Type': 'application/json' } } // Specify content type
      );
      alert('Login successful!');
      // Save student data in state or localStorage as needed
      navigate('/student-profile', { state: res.data }); // Navigate and pass data
    } catch (err) {
      console.error("Login error:", err);
      // Improve error handling
      if (err.response && err.response.data) {
        alert(`Login failed: ${err.response.data.message || err.response.data.error}`);
      } else {
        alert('Login failed. Please try again later.');
      }
    }
  };

  return (
    <div className="body">
      <div className="container">
        <form className="form" onSubmit={handleLogin}>
          <h2>Student Login</h2>
          <input
            name="studentusername"
            placeholder="Username"
            value={credentials.studentusername}
            onChange={handleChange}
            required
          />
          <input
            name="studentpassword"
            type="password"
            placeholder="Password"
            value={credentials.studentpassword}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
