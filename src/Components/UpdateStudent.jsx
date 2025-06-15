import React, { use, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './UpdateStudent.css';

const UpdateStudent = () => {
  const [studentusername, setStudentusername] = useState('');
  const [studentpassword, setStudentpassword] = useState('');
  const [scontactno, setscontactno] = useState('');
  const [semail, setSemail] = useState('');
  const [studentname, setStudentname] = useState('');
  const [classname, setClassname] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [address, setAddress] = useState('');

  const params = useParams();
  const id = params.sid; // coming from URL

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const fullpath = `./img/${file.name}`;
    setImageUrl(fullpath);
  };

  useEffect(()=>{
    getstudent();
  },[])

  let getstudent=()=>{
axios.get(`http://localhost:8080/Student/findbyid/${id}`)
        .then((response)=>{
        
           setStudentusername(response.data.studentusername)
           setStudentpassword(response.data.studentpassword)
           setscontactno(response.data.scontactno)
           setSemail(response.data.semail)
           setStudentname(response.data.studentname)
           setClassname(response.data.classname)
           setAddress(response.data.address)
           
          

        })
        .catch((error)=>{
            console.log(error)

        })
  }

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
     
    };

    axios.put(`http://localhost:8080/Student/update/${id}`, newStudent)
      .then((response) => {
        alert("Student Updated successfully!");
      })
      .catch((error) => {
        console.error("Error Updating Student:", error);
        alert("Something went wrong.");
      });
  };

  return (
    <div className="body">
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Student Update</h2>
          <input type="text" placeholder="Username" value={studentusername} onChange={(e) => setStudentusername(e.target.value)} required />
          <input type="password" placeholder="Password" value={studentpassword} onChange={(e) => setStudentpassword(e.target.value)} required />
          <input type="text" placeholder="Full Name" value={studentname} onChange={(e) => setStudentname(e.target.value)} required />
          <input type="text" placeholder="Contact No" value={scontactno} onChange={(e) => setscontactno(e.target.value)} required />
          <input type="email" placeholder="Email" value={semail} onChange={(e) => setSemail(e.target.value)} required />
          <input type="text" placeholder="Class" value={classname} onChange={(e) => setClassname(e.target.value)} required />
          <textarea placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateStudent;
