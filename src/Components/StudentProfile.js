import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Studentprofile.css';
import defaultProfileImg from './assets/1705830454264 - Copy.jpg';
import defaultBookImg from './assets/Book.jpeg';
import { useNavigate } from 'react-router-dom';

const StudentProfile = () => {
  const { state: student } = useLocation();
  const [showBooks, setShowBooks] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bookList, setBookList] = useState(student?.blist || []);

  // var app="http://51.20.187.166:8080/Library_Management_Project-0.0.1-SNAPSHOT"

  let navigate=useNavigate();

  useEffect(() => {
    if (student) {
      setIsLoading(false);
    }
  }, [student]);

  const toggleShowBooks = () => setShowBooks(prev => !prev);

  const getImageUrl = (url) => {
    if (!url) return '';
    const trimmed = url.trim();
    return trimmed.startsWith('http')
      ? trimmed
      // : `${app}${trimmed.startsWith('/') ? '' : '/'}${trimmed}`;
      : `http://localhost:8080${trimmed.startsWith('/') ? '' : '/'}${trimmed}`;
  };

  const handleImageError = (e, defaultImg) => {
    e.target.onerror = null;
    e.target.src = defaultImg;
  };

  // Fetch only student-related books (future use)
  const fetchStudentBooks = async () => {
    try {
      // const response = await fetch(`${app}/Book/getStudentBooks/${student?.userId}`);
      const response = await fetch(`http://localhost:8080/Book/getStudentBooks/${student?.userId}`);
      const data = await response.json();
      setBookList(data);
    } catch (error) {
      console.error("Error fetching student books:", error);
    }
  };

  return (
   <div className="student-profile-page">
  <div className="student-card-container">
    {/* Profile Header */}
    <div className="student-card-header">
      <img
        src={getImageUrl(student?.imgurl)}
        alt="Student"
        className="student-card-img"
        onError={(e) => handleImageError(e, defaultProfileImg)}
      />
      <div className="student-card-info">
        <h2>{student.studentname}</h2>
        <p>
          <strong>ID:</strong> {student.sid} <br />
          <strong>Username:</strong> {student.studentusername} <br />
          <strong>Contact:</strong> {student.scontactno} <br />
          <strong>Email:</strong> {student.semail} <br />
          <strong>Class:</strong> {student.classname} <br />
          <strong>Address:</strong> {student.address}
        </p>
      </div>
    </div>

    {/* Book Controls */}
    
    <div className="student-action-bar">
       <button
                 className="student-btn student-add-btn"
                  onClick={() => navigate(`/studentaddbook/${student.sid}`)}
                >
                  ➕ 📚 Add Library Book
                </button>

                <button className='btn btn-warning' onClick={()=>{navigate('/')}}>Logout</button>
    </div>

    {/* Toggle Books */}
    {bookList?.length > 0 && (
      <div className="student-toggle-section">
        <button className="student-btn student-toggle-btn" onClick={toggleShowBooks}>
          {showBooks ? 'Hide My Books' : 'Show My Books'}
        </button>
      </div>
    )}

    {/* Book Cards */}
    {showBooks && (
      <div className="student-books-section">
        <h3 className="student-section-title">📖 My Borrowed Books</h3>
        {bookList?.length > 0 ? (
          <ul className="student-book-list">
            {bookList.map((book) => (
              <li key={book.bookId} className="student-book-card">
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="student-book-img"
                  onError={(e) => handleImageError(e, defaultBookImg)}
                />
                <div className="student-book-info">
                  <p>
                    <strong>ID:</strong> {book.bookId} <br />
                    <strong>Title:</strong> {book.title} <br />
                    <strong>Author:</strong> {book.author} <br />
                    <strong>Genre:</strong> {book.genre} <br />
                    <strong>Borrowed:</strong> {book.borrowDate || 'N/A'} <br />
                    <strong>Return:</strong> {book.returnDate || 'N/A'} <br />
                    <strong>Status:</strong> {book.status}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="student-no-data">No books available in the library.</p>
        )}
      </div>
    )}
  </div>
</div>


  );
};

export default StudentProfile;
