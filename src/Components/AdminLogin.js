import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./StudentLogin.css";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ 
    adminusername: "",
    adminpassword: "" 
});
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    try {
      const res = await axios.post("http://localhost:8080/admin/login", credentials); 
       alert("Admin Login Successfull!");
      
      
      navigate("/AdminProfile",{state: res.data}); // Replace with your actual route

      
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed. Check credentials or server.");
    }
  };

  return (
    <div className="admin-login-container">
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>

        <label>Username</label>
        <input
          type="text"
          name="adminusername"
          value={credentials.adminusername}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="adminpassword"
          value={credentials.adminpassword}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>


      </form>
    </div>
  );
};

export default AdminLogin;
