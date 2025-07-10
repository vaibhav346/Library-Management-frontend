import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './StudentRegister.css';

const StudentRegister = () => {
  const [studentusername, setStudentusername] = useState('');
  const [studentpassword, setStudentpassword] = useState('');
  const [scontactno, setscontactno] = useState('');
  const [semail, setSemail] = useState('');
  const [studentname, setStudentname] = useState('');
  const [classname, setClassname] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [address, setAddress] = useState('');

  // var app="http://51.20.187.166:8080/Library_Management_Project-0.0.1-SNAPSHOT"

  const params = useParams();
  const id = params.adminId; // coming from URL

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const fullpath = `./img/${file.name}`;
    setImageUrl(fullpath);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newStudent = {
      studentusername,
      studentpassword,
      scontactno,
      semail,
      studentname,
      classname,
      address,
      imgurl: imageUrl,
      stud: {
        adminId: id // ✅ Use 'admin' field to match entity in backend
      }
    };

    // axios.post(`${app}/Student/savedtud`, newStudent)
    axios.post("http://localhost:8080/Student/savedtud", newStudent)
      .then((response) => {
        alert("Student added successfully!");
      })
      .catch((error) => {
        console.error("Error adding Student:", error);
        alert("Something went wrong.");
      });
  };

  return (
    <div className="body">
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Student Registration</h2>
          <input type="text" placeholder="Username" value={studentusername} onChange={(e) => setStudentusername(e.target.value)} required />
          <input type="password" placeholder="Password" value={studentpassword} onChange={(e) => setStudentpassword(e.target.value)} required />
          <input type="text" placeholder="Full Name" value={studentname} onChange={(e) => setStudentname(e.target.value)} required />
          <input type="text" placeholder="Contact No" value={scontactno} onChange={(e) => setscontactno(e.target.value)} required />
          <input type="email" placeholder="Email" value={semail} onChange={(e) => setSemail(e.target.value)} required />
          <input type="text" placeholder="Class" value={classname} onChange={(e) => setClassname(e.target.value)} required />
          <textarea placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default StudentRegister;
