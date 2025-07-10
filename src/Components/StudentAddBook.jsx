import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./BookPage.css";
import defaultImage from "./assets/Book.jpeg";

function BookPage() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { sid } = useParams(); // student ID from URL

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

  return (
    <div className="book-page">
      <h1 className="title">Library Book Collection</h1>

      <div className="book-grid">
        {books.map((book) => (
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
    </div>
  );
}

export default BookPage;
