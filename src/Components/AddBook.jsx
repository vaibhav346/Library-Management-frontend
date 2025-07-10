import React, { useState } from 'react';
import './AddBook.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function AddBook() {
  let [title, setTitle] = useState('');
  let [author, setAuthor] = useState('');
  let [genre, setGenre] = useState('');
  let [availability, setAvailability] = useState('');
  let [borrowDate, setBorrowDate] = useState('');
  let [returnDate, setReturnDate] = useState('');
  let [imageUrl, setImageUrl] = useState('');

  // var app="http://51.20.187.166:8080/Library_Management_Project-0.0.1-SNAPSHOT"

let navigate=useNavigate();  

  let params = useParams();
  let id = params.adminId; // coming from URL

  const handleImageChange = (event) => {
    let file = event.target.files[0];
    let fullpath = `./img/${file.name}`;
    setImageUrl(fullpath);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newBook = {
      title,
      author,
      genre,
      availability,
      borrowDate,
      returnDate,
      imageUrl,
      status: 'PENDING',  // default value if needed
      admin: {
        adminId: id  // send admin ID inside admin object
      }
    };

    // axios.post(`${app}/Book/save`, newBook)
    axios.post("http://localhost:8080/Book/save", newBook)
      .then((response) => {
        alert("Book added successfully!");
        navigate('/AdminProfile')
      })
      .catch((error) => {
        console.error("Error adding book:", error);
        alert("Something went wrong.");
      });
  };

  return (
    <div className="add-book-container">
      <form className="add-book-form" onSubmit={handleSubmit}>
        <h2>Add Book</h2>

        <label>Title:</label>
        <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Author:</label>
        <input type="text" name="author" value={author} onChange={(e) => setAuthor(e.target.value)} required />

        <label>Genre:</label>
        <input type="text" name="genre" value={genre} onChange={(e) => setGenre(e.target.value)} required />

        <label>Availability:</label>
        <select name="availability" value={availability} onChange={(e) => setAvailability(e.target.value)} required>
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        {/* <label>Borrow Date:</label>
        <input type="date" name="borrowDate" value={borrowDate} onChange={(e) => setBorrowDate(e.target.value)} /> */}

        {/* <label>Return Date:</label>
        <input type="date" name="returnDate" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} /> */}

        <label>Image URL:</label>
        <input type="file" name="imageUrl" accept="image/*" onChange={handleImageChange} />

        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}
