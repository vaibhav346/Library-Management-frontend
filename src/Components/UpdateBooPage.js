import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './UpdateBookPage.css';

const UpdateBookPage = () => {
  const { state: { bookToUpdate } } = useLocation();
  const [book, setBook] = useState(bookToUpdate || {});
  const navigate = useNavigate();

  // Handle the form change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  // Handle form submit to update the book
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/Book/updatebyid/${book.bookId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
      });
      if (response.ok) {
        alert('Book updated successfully!');
        navigate('/UpdateSuccessPage', { state: { ...book } });
      } else {
        alert('Failed to update book.');
      }
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div className="update-book-page">
      <h2>Update Book</h2>
      <form onSubmit={handleUpdateSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Genre:</label>
          <input
            type="text"
            name="genre"
            value={book.genre}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Availability:</label>
          <input
            type="checkbox"
            name="availability"
            checked={book.availability}
            onChange={(e) => setBook({ ...book, availability: e.target.checked })}
          />
        </div>
        <div className="form-group">
          <button type="submit">Update Book</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBookPage;
