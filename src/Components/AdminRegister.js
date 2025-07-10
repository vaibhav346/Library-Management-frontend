import React, { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import './StudentRegister.css'; // You can rename this to AdminRegister.css for clarity

const AdminRegister = () => {

  let [adminusername,setAdminusername]=useState("")
  let [adminpassword,setAdminpassword]=useState('')
  let [adminimgurl,setAdminimgurl]=useState(null)
  let [admincontactno,setAdmincontactno]=useState('')
  let [adminemail,setAdminemail]=useState('')
  let [adminname,setAdminname]=useState('')
  let [student,setStudent]=useState([]);
  let [blist,setBlist]=useState([])
  
  // var app="http://51.20.187.166:8080/Library_Management_Project-0.0.1-SNAPSHOT"

  let validation=()=>{
    if(admincontactno.length>10||admincontactno.length<10){
      alert("Please Enter valid contactno with 10 digits")
      return false;
    }
    else if(adminpassword.length>13||adminpassword.length<8){
      alert("Please enter password with 8 to 13 characters")
      return false;
    }
    else{
      return true;
    }
  }



 
  let handleImgeChange=(event)=>{
    let file=event.target.files[0] //upload multiple file file is object
    let fullpath=`./img//${file.name}`;
    setAdminimgurl(fullpath)

    console.log(adminimgurl);
  }

  


  let handleSubmit=(event)=>{
    event.preventDefault();

    if(!validation()){
      return "Fill all data is Correct"
    }
    else 
    {

    let adminadd={adminusername,adminpassword,adminimgurl,admincontactno,adminemail,adminname,student:[],blist:[]}
    console.log(adminadd)
    // axios.post(`${app}/admin/save`, adminadd)
    axios.post("http://localhost:8080/admin/save", adminadd)

    .then((resonpse)=>{
      if(resonpse.data==="Please enter another username. This is one is already exists"){
      alert("Please enter another username. This is one is already exists");
      }
      else{
        alert("Admin Registration Sucessfully")
        setAdminusername('')
    setAdminpassword('')
    setAdminimgurl(null)
    setAdmincontactno('')
    setAdminemail('')
    setAdminname('')
      }
    })
    .catch((error)=>{
      alert("Error")
     
    })
  }

  }

  

  return (
    <div className="body">
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Admin Registration</h2>
            <input
            type="text"
            name="adminname"
            placeholder="Admin name"
            value={adminname}
            onChange={(e)=>{setAdminname(e.target.value)}}
            required
          />

            <input
            type="email"
            name="adminemail"
            placeholder="Email"
            value={adminemail}
            onChange={(e)=>{setAdminemail(e.target.value)}}
          />
           <input
            type="tel"
            name="admincontactno"
            placeholder="Contactno"
            value={admincontactno}
            onChange={(e)=>{setAdmincontactno(e.target.value)}}
          />
          <input 
            type="text"
            name="adminusername"
            placeholder="Username"
            value={adminusername}
            onChange={(e)=>{setAdminusername(e.target.value)}}
            required
          />
          <input
            type="password"
            name="Admin password"
            placeholder="Password"
            value={adminpassword}
            onChange={(e)=>{setAdminpassword(e.target.value)}}
            required
          />
        
         
           <input
            type="file"
            name="adminimgurl"
            accept='image/*'
            onChange={handleImgeChange}
          />

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
