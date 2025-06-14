import React, { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import './AdminProfile.css';
import defaultAdminImg from './assets/1705830454264 - Copy.jpg';
import defaultBookImg from './assets/Book.jpeg';
import axios from 'axios';

const AdminProfile = () => {
  // const { state: adminData } = useLocation();
  const location=useLocation();
  const [admin,setAdmin]=useState([])
  const [bookList, setBookList] = useState(admin?.blist || []);
  const [studentList, setStudentList] = useState(admin?.student || []);
 
  const navigate = useNavigate();

useEffect(() => {
  const adminData = location.state;
  console.log("Admin Data from location:", adminData);

  if (adminData?.adminId) {
    axios.get(`http://localhost:8080/admin/findbyid/${adminData.adminId}`)
      .then((response) => {
        console.log("Fetched Admin:", response.data);
        setAdmin(response.data);
        setBookList(response.data.blist || []);
        setStudentList(response.data.student || []);
      })
      .catch((error) => {
        console.error('Error fetching admin:', error);
      });
  } else {
    console.warn("Admin ID not found in location.state");
  }
}, [location.state]);

 




  return (
    <div className="profile-body">
      <div className="profile-container">
        <div className="profile-columns">

          {/* LEFT: Admin Info and Managed Books */}
          <div className="left-column">
            <div className="profile-header">
              <img
                src={admin.adminimgurl}
                alt="Admin"
                className="profile-img"
                
              />
              <div className="profile-info">
                <h2>{admin.adminname}</h2>
                <p><strong>UserName:</strong> {admin.adminusername} <br></br>
                <strong>Admin ID:</strong> {admin.adminId} <br></br>
                <strong>Admin Contact:</strong> {admin.admincontactno} <br></br>
                <strong>Admin Email:</strong> {admin.adminemail}</p>
                <button className="btn-add-book" style={{marginBottom:"2px",background:"green"}} >Update</button>
                <button className="btn-add-book" onClick={()=>{navigate(`/AddBook/${admin.adminId}`)}}>➕ Add Book</button>
                <button className="btn-add-book" onClick={()=>{navigate(`/studentregister/${admin.adminId}`)}}>➕ Add Student</button>
              </div>
            </div>

            <div className="section">
              <h3 className="section-title">📘 Managed Books</h3>
              {bookList?.length > 0 ? (
                <div className="book-list">
                  {bookList.map((book) => (
                    <div key={book.bookId} className="book-item">
                      <img
                        src={book.imageUrl}
                        alt={book.title}
                        className="book-img"
                        
                      />
                      <div className="book-details">
                      <p className="book-information">
  <strong>Book Id:</strong> {book.bookId} <br />
  <strong>Title:</strong> {book.title} <br />
  <strong>Author:</strong> {book.author} <br />
  <strong>Genre:</strong> {book.genre} <br />
  <strong>Available:</strong> {book.availability ? '✅ Yes' : '❌ No'} <br />
  <strong>Status:</strong> <span className="book-status">{book.status}</span>
</p>

                      </div>
                      <div className="book-actions">
                        <button className="btn-update" >✏️ Update</button>
                        <button className="btn-delete" >🗑️ Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-data">No books managed yet.</p>
              )}
            </div>
          </div>

          {/* RIGHT: Students Info */}
           <div className="right-column">
            <div className="section">
              <h3 className="section-title">🎓 Managed Students</h3>
              {studentList?.length > 0 ? (
                <div className="student-list">
                  {studentList.map((student) => (
                    <div key={student.userId} className="student-item">
                       <img
                        src={student.imgurl}
                        alt={student.title}
                        className="book-img"
                        
                      />
                      <div className="student-details">
                        <p><strong>Student Username:</strong> {student.studentusername}</p>
                        <p><strong>Student Name:</strong> {student.studentname}</p>
                        <p><strong>User ID:</strong> {student.userId}</p> 

                        {/* Borrowed Books */}
                        <div className="section">
                          <h4 className="sub-section-title">📚 Student Books</h4>
                          {Array.isArray(student.blist) && student.blist.length > 0 ? (
                            <div className="book-list">
                              {student.blist.map((book) => (
                                <div key={book.bookId} className="book-item">
                                  <img
                                    src=''
                                    alt={book.title}
                                    className="book-img"
                                 
                                  />
                                  <div className="book-details">
                                    <p><strong>Title:</strong> {book.title}</p>
                                    <p><strong>Author:</strong> {book.author}</p>
                                    <p><strong>Genre:</strong> {book.genre}</p>
                                    <p><strong>Available:</strong> {book.availability ? '✅ Yes' : '❌ No'}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="no-data">No borrowed books.</p>
                          )}
                        </div>

                        {/* Borrowed Book Details */}
                        <div className="section">
                          <h4 className="sub-section-title">📅 Borrowed Book Details</h4>
                          {Array.isArray(student.borrowedbooklist) && student.borrowedbooklist.length > 0 ? (
                            <div className="borrowed-book-list">
                              {student.borrowedbooklist.map((borrow) => (
                                <div key={borrow.borrowId} className="borrow-item">
                                  <p><strong>Borrow Date:</strong> </p>
                                  <p><strong>Return Date:</strong> </p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="no-data">No borrowed book details available.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-data">No students assigned.</p>
              )}
            </div> 
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
