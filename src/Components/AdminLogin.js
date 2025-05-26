import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './StudentLogin.css'; // You can rename this to AdminLogin.css if needed

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    adminusername: '',
    adminpassword: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/Admin/adminlogin', credentials);
      alert('Admin login successful!');
      navigate('/AdminProfile', { state: res.data }); // or your desired route
    } catch (err) {
      console.error("Login error:", err);
      alert('Login failed. Check credentials or server.');
    }
  };

  return (
    <div className="body">
      <div className="container">
        <form className="form" onSubmit={handleLogin}>
          <h2>Admin Login</h2>
          <input
            name="adminusername"
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <input
            name="adminpassword"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
