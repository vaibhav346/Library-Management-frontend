import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BookPage.css';
import defaultImage from './assets/Book.jpeg';

function BookPage() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // 🟡 Get admin ID passed from previous page
  const { adminId } = location.state || {};

  useEffect(() => {
    fetch("http://localhost:8080/Book/findall")
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error("Error:", err));
  }, []);

  // 🔵 Handle Add Book to Admin
  const handleAddBookToAdmin = async (book) => {
    try {
      const response = await fetch(`http://localhost:8080/Book/add/${adminId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });

      if (response.ok) {
        alert('✅ Book assigned to Admin successfully!');
        // You can optionally refetch book list or navigate back
        navigate('/BookAddedSuccess', { state: { refresh: true } });
      } else {
        alert('❌ Failed to assign book.');
      }
    } catch (error) {
      console.error('Error assigning book:', error);
    }
  };

  return (
    <div className="book-page">
      <h1 className="title">Library Book Collection</h1>
      
      <div className="book-grid">
        {books.map(book => (
          <div className="book-card" key={book.bookId}>
            <div className="book-image-container">
              <img 
                src={book.imageUrl && book.imageUrl.startsWith("http") 
                      ? book.imageUrl 
                      : defaultImage}
                alt={book.title} 
                className="book-image" 
              />
            </div>
            <div className="book-info">
              <h2>{book.title}</h2>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Genre:</strong> {book.genre}</p>
              <p><strong>Status:</strong> {book.availability ? 'Available' : 'Borrowed'}</p>
              <button
                className="btn-add-book"
                onClick={() => handleAddBookToAdmin(book)}
              >
                ➕ Add Book
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookPage;
