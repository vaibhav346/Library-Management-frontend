import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './StudentRegister.css'; // You can rename this to AdminRegister.css for clarity

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    adminusername: "",
    adminpassword: "",
    adminrole: "",
    adminimgurl: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/Admin/save", formData); // <-- Make sure this endpoint exists
      alert("Admin registered successfully!");

      navigate('/registration-success'); // Navigate to success page

      setFormData({
        adminusername: "",
        adminpassword: "",
        adminrole: "",
        adminimgurl: "",
      });

      console.log("Server response:", res.data);
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      alert("Failed to register admin. Check console for details.");
    }
  };

  return (
    <div className="body">
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Admin Registration</h2>
          <input
            type="text"
            name="adminusername"
            placeholder="Username"
            value={formData.adminusername}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="adminpassword"
            placeholder="Password"
            value={formData.adminpassword}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="adminrole"
            placeholder="Role"
            value={formData.adminrole}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="adminimgurl"
            placeholder="Image URL"
            value={formData.adminimgurl}
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
