import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./BookPage.css";
import defaultImage from "./assets/Book.jpeg";
import axios from "axios";

function BookPage() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { sid } = useParams(); // 
  // student ID from URL
 let [searchtitle, setSearchtitle] = useState("");
  let [searchresult, setSearchresult] = useState([]);
  // var app="http://51.20.187.166:8080/Library_Management_Project-0.0.1-SNAPSHOT"

  useEffect(() => {
    fetch("http://localhost:8080/Book/findall")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  // ✅ Handle Add Book to Student
  const handleAddBookToStudent = async (bookId) => {
    try {
      const response = await fetch(
        // `${app}/Student/addBookToStudent/${sid}/${bookId}`,
        `http://localhost:8080/Student/addBookToStudent/${sid}/${bookId}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        alert("✅ Book added to student successfully!");
      } else {
        alert("❌ Failed to add book to student.");
      }
    } catch (error) {
      console.error("Error assigning book:", error);
      alert("❌ Server error. Try again later.");
    }
  };

    let searybybook = () => {
    console.log(searchtitle);
    // axios.get(`${app}/Book/findbytitle/${searchtitle}`)
    axios
      .get(`http://localhost:8080/Book/findbyauthor/${searchtitle}`)
      .then((response) => {
        if (response.data) {
          setSearchresult(response.data);
          console.log(searchtitle);
          setSearchtitle("");
        }
      })
      .catch((error) => {
        alert("error");
      });
  };

  return (
    <div className="book-page">
      <h1 className="title">Library Book Collection</h1>

 <div className="search-container">
        <input
          type="text"
          placeholder="Enter Author to search"
          value={searchtitle}
          onChange={(e) => setSearchtitle(e.target.value)}
        />
        <button onClick={searybybook}>Search</button>
      </div>

      {books.length > 0 ? (

      <div className="book-grid">
        {(searchresult.length > 0 ? searchresult : books).map((book) => (
      
          <div className="book-card" key={book.bookId}>
            <div className="book-image-container">
              <img
                src={
                  book.imageUrl && book.imageUrl.startsWith("http")
                    ? book.imageUrl
                    : defaultImage
                }
                alt={book.title}
                className="book-image"
              />
            </div>
            <div className="book-info">
              <h2>{book.title}</h2>
              <p>
                <strong>Book ID:</strong> {book.bookId} <br />
                <strong>Author:</strong> {book.author} <br />
                <strong>Genre:</strong> {book.genre} <br />
                <strong>Borrowed:</strong> {book.borrowDate || "N/A"} <br />
                <strong>Return:</strong> {book.returnDate || "N/A"} <br />
                <strong>Status:</strong> {book.status}
              </p>
              <button
                className="btn-add-book"
                onClick={() => handleAddBookToStudent(book.bookId)}
              >
                ➕ Add Book
              </button>
            </div>
          </div>
        ))}
      </div>
       ) : (
        <p>No Books this person</p>
      )};
    </div>
  );
}

export default BookPage;
