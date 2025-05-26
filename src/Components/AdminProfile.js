import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AdminProfile.css';
import defaultAdminImg from './assets/1705830454264 - Copy.jpg';
import defaultBookImg from './assets/Book.jpeg';

const AdminProfile = () => {
  const { state: adminData } = useLocation();
  const [bookList, setBookList] = useState(adminData?.blist || []);
  const [studentList, setStudentList] = useState(adminData?.student || []);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (adminData) setIsLoading(false);
  }, [adminData]);

  const getImageUrl = (url) => {
    if (!url) return '';
    const trimmed = url.trim();
    return trimmed.startsWith('http')
      ? trimmed
      : `http://localhost:8080${trimmed.startsWith('/') ? '' : '/'}${trimmed}`;
  };

  const handleImageError = (e, fallbackImg) => {
    e.target.onerror = null;
    e.target.src = fallbackImg;
  };

  const handleDeleteBook = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        const response = await fetch(`http://localhost:8080/Book/detebyid/${bookId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert('Book deleted successfully!');
          setBookList((prev) => prev.filter((book) => book.bookId !== bookId));
        } else {
          alert('Failed to delete book.');
        }
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };
  

  // Updated handleUpdateBook to navigate to UpdateBookPage
  // const handleUpdateBook = (bookId) => {
  //   const bookToUpdate = bookList.find((book) => book.bookId === bookId);
  //   navigate('/UpdateBookPage', { state: bookToUpdate }); // Pass the book data as state
  // };

  // Updated handleUpdateBook to navigate to UpdateBookPage with the book data
const handleUpdateBook = (bookId) => {
  const bookToUpdate = bookList.find((book) => book.bookId === bookId);
  navigate('/UpdateBookPage', { state: { bookToUpdate } }); // Pass the book data as state
};


  const handleAddBook = () => {
    navigate('/BookPage', { state: { adminId: adminData?.adminId } });
  };

  if (isLoading) return <div className="loading">Loading admin profile...</div>;

  return (
    <div className="profile-body">
      <div className="profile-container">
        <div className="profile-columns">

          {/* LEFT: Admin Info and Managed Books */}
          <div className="left-column">
            <div className="profile-header">
              <img
                src={getImageUrl(adminData?.adminimgurl)}
                alt="Admin"
                className="profile-img"
                onError={(e) => handleImageError(e, defaultAdminImg)}
              />
              <div className="profile-info">
                <h2>{adminData?.adminusername}</h2>
                <p><strong>Role:</strong> {adminData?.adminrole}</p>
                <p><strong>Admin ID:</strong> {adminData?.adminId}</p>
                <button className="btn-add-book" onClick={handleAddBook}>➕ Add Book</button>
              </div>
            </div>

            <div className="section">
              <h3 className="section-title">📘 Managed Books</h3>
              {bookList?.length > 0 ? (
                <div className="book-list">
                  {bookList.map((book) => (
                    <div key={book.bookId} className="book-item">
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
                      <div className="book-actions">
                        <button className="btn-update" onClick={() => handleUpdateBook(book.bookId)}>✏️ Update</button>
                        <button className="btn-delete" onClick={() => handleDeleteBook(book.bookId)}>🗑️ Delete</button>
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
                        src={getImageUrl(student.imgurl)}
                        alt={student.studentusername}
                        className="student-img"
                        onError={(e) => handleImageError(e, defaultAdminImg)}
                      />
                      <div className="student-details">
                        <p><strong>Name:</strong> {student.studentusername}</p>
                        <p><strong>Role:</strong> {student.role}</p>
                        <p><strong>User ID:</strong> {student.userId}</p>

                        {/* Borrowed Books */}
                        <div className="section">
                          <h4 className="sub-section-title">📚 Student Books</h4>
                          {Array.isArray(student.blist) && student.blist.length > 0 ? (
                            <div className="book-list">
                              {student.blist.map((book) => (
                                <div key={book.bookId} className="book-item">
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
                                  <p><strong>Borrow Date:</strong> {borrow.borrowDate}</p>
                                  <p><strong>Return Date:</strong> {borrow.returnDate}</p>
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
