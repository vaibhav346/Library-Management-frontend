import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Studentprofile.css';
import defaultProfileImg from './assets/1705830454264 - Copy.jpg';
import defaultBookImg from './assets/Book.jpeg';

const StudentProfile = () => {
  const { state: student } = useLocation();
  const [showBooks, setShowBooks] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bookList, setBookList] = useState(student?.blist || []);
  const [isMyBooks, setIsMyBooks] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

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
      : `http://localhost:8080${trimmed.startsWith('/') ? '' : '/'}${trimmed}`;
  };

  const handleImageError = (e, defaultImg) => {
    e.target.onerror = null;
    e.target.src = defaultImg;
  };

  // ✅ Fetch all books from backend (Spring Boot)
  const fetchAllBooks = async () => {
    try {
      const response = await fetch('http://localhost:8080/Book/findall');
      const data = await response.json();
      setBookList(data);
      setShowBooks(true); // Show the book section automatically
      setIsMyBooks(false); // Hide update button for all books
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // ✅ Fetch only student-related books
  const fetchStudentBooks = async () => {
    try {
      const response = await fetch(`http://localhost:8080/Book/getStudentBooks/${student?.userId}`);
      const data = await response.json();
      setBookList(data);
      setShowBooks(true); // Show the book section automatically
      setIsMyBooks(true); // Show update button for student's books
    } catch (error) {
      console.error("Error fetching student books:", error);
    }
  };

  // ✅ Add a book to student's list
  const addBookToMyBooks = async () => {
    if (!selectedBook) return;

    try {
      const response = await fetch(`http://localhost:8080/Student/savebook/${student?.userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedBook),
      });

      if (response.ok) {
        fetchStudentBooks(); // Refresh the student's books after adding
      } else {
        console.error("Error adding book to student's books");
      }
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  // ✅ Return a borrowed book (delete it from the student's borrowed books list)
  const returnBook = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:8080/Student/deletebyid/${student?.userId}/${bookId}`, {
        method: 'DELETE',
      });
      

      if (response.ok) {
        fetchStudentBooks(); // Refresh the student's books after returning
      } else {
        console.error("Error returning book");
      }
    } catch (error) {
      console.error("Error returning book:", error);
    }
  };

  const handleBookSelect = (book) => {
    setSelectedBook(book);
  };

  if (isLoading) {
    return <div className="loading">Loading student profile...</div>;
  }

  return (
    <div className="profile-body">
      <div className="profile-container">

        {/* Profile Header */}
        <div className="profile-header">
          <img
            src={getImageUrl(student?.imgurl)}
            alt="Student Profile"
            className="profile-img"
            onError={(e) => handleImageError(e, defaultProfileImg)}
          />
          <div className="profile-info">
            <h2>{student?.studentusername}</h2>
            <p><strong>Role:</strong> {student?.role}</p>
            <p><strong>User ID:</strong> {student?.userId}</p>
          </div>
        </div>

        {/* Load Books Buttons */}
        <div className="refresh-btn-container" style={{ display: 'flex', justifyContent: 'flex-start', gap: '10px' }}>
          <button className="btn my-books-btn" onClick={fetchStudentBooks}>
            📘 Load My Books
          </button>
          <button className="btn refresh-btn" onClick={fetchAllBooks}>
            {selectedBook ? 'Add Book' : '📚 Load Library Books'}
          </button>
        </div>

        {/* Borrowed Books Section */}
        <div className="section">
          <h3 className="section-title">📚 Borrowed Books</h3>
          {student?.borrowedbooklist?.length > 0 ? (
            <ul className="borrow-list">
              {student.borrowedbooklist.map((borrow, index) => (
                <li key={index} className="borrow-card">
                  <div>
                    <p><strong>Borrow Date:</strong> {borrow.borrowDate}</p>
                    <p><strong>Return Date:</strong> {borrow.returnDate}</p>
                  </div>
                  <button
                    className="btn return-btn"
                    onClick={() => returnBook(borrow.bookId)}
                  >
                    Return Book
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-data">No borrowed books.</p>
          )}
        </div>

        {/* Toggle Button for All Books */}
        {bookList?.length > 0 && (
          <div className="section">
            <button className="btn show-books-btn" onClick={toggleShowBooks}>
              {showBooks ? 'Hide Library Books' : 'Show Library Books'}
            </button>
          </div>
        )}

        {showBooks && (
          <div className="section">
            <h3 className="section-title">📖 Available Library Books</h3>
            {bookList?.length > 0 ? (
              <ul className="book-list">
                {bookList.map((book) => (
                  <li key={book.bookId} className="book-card">
                    <img
                      src={getImageUrl(book.imageUrl)}
                      alt={book.title}
                      className="book-img"
                      onError={(e) => handleImageError(e, defaultBookImg)}
                    />
                    <div className="book-details">
                      <p><strong>Title:</strong> {book.title}</p>
                      <p><strong>Author:</strong> {book.author}</p>
                      <p><strong>Genre:</strong> {book.genre}</p>
                      <p><strong>Available:</strong> {book.availability ? '✅ Yes' : '❌ No'}</p>
                    </div>
                    <div className="book-buttons">
                      <button className="btn select-btn" onClick={() => handleBookSelect(book)}>Select</button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-data">No books available in the library.</p>
            )}
          </div>
        )}

        {/* Add Book Button */}
        {selectedBook && (
          <div className="section">
            <button className="btn add-book-btn" onClick={addBookToMyBooks}>
              Add Book to My Books
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
