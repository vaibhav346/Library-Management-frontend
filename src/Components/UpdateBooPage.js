import React, { useEffect, useState } from 'react';
import './AddBook.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

export default function UpdateBooPage() {
  let [title, setTitle] = useState('');
  let [author, setAuthor] = useState('');
  let [genre, setGenre] = useState('');
  let [availability, setAvailability] = useState('');
  // let [borrowDate, setBorrowDate] = useState('');
  // let [returnDate, setReturnDate] = useState('');
  let [imageUrl, setImageUrl] = useState('');

  var app="http://51.20.187.166:8080/Library_Management_Project-0.0.1-SNAPSHOT"

  let params = useParams();
  let id = params.bookId; // coming from URL

  useEffect(()=>{
    getbook();
  },[]);

  let getbook=()=>{
    // console.log(id)
     axios.get(`${app}/Book/findbyid/${id}`)
        .then((response)=>{
          // console.log(response.data)
          //  const d = response.data;
      // just if you need it elsewhere
            // setEmployee(response.data)
            // console.log(emp)
           //console.log(response) 
           setTitle(response.data.title)
           setAuthor(response.data.author)
           setGenre(response.data.genre)
           setAvailability(response.data.availability)
          //  setImageUrl(response.data.imageUrl)
          

        })
        .catch((error)=>{
            console.log(error)

        })
  }

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
    
      imageUrl,
     
    };
console.log(id)
    axios.put(`${app}/Book/update/${id}`, newBook)
      .then((response) => {
        if(response.data!=null){
        alert("Book Update successfully!");
        }
        
      })
      .catch((error) => {
        console.error("Error updateing book:", error);
        alert("Something went wrong.");
      });
  };

  return (
    <div className="add-book-container">
      <form className="add-book-form" onSubmit={handleSubmit}>
        <h2>Update Book</h2>

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
        <input type="file" name="imageUrl"  accept="image/*" onChange={handleImageChange} />

        <button type="submit">Update Book</button>
      </form>
    </div>
  );
}
