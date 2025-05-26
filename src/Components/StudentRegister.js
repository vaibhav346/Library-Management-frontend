import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './StudentRegister.css';

const StudentRegister = () => {
  const [formData, setFormData] = useState({
    studentusername: "",
    studentpassword: "",
    role: "",
    image: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("studentusername", formData.studentusername);
      data.append("studentpassword", formData.studentpassword);
      data.append("role", formData.role);
      data.append("image", formData.image);

      const res = await axios.post("http://localhost:8080/Student/register", data);
      alert("Student registered successfully!");
      navigate("/registration-success");

      console.log("Response:", res.data);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Registration failed!");
    }
  };

  return (
    <div className="body">
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Student Registration</h2>
          <input
            type="text"
            name="studentusername"
            placeholder="Username"
            value={formData.studentusername}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="studentpassword"
            placeholder="Password"
            value={formData.studentpassword}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default StudentRegister;
