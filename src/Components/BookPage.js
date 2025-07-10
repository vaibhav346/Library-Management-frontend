import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BookPage.css";
import defaultImage from "./assets/Book.jpeg";
import axios from "axios";

function BookPage() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  let [searchtitle, setSearchtitle] = useState("");
  let [searchresult, setSearchresult] = useState([]);

  // var app="http://51.20.187.166:8080/Library_Management_Project-0.0.1-SNAPSHOT"

  // 🟡 Get admin ID passed from previous page
  const { adminId } = location.state || {};

  useEffect(() => {
    fetch("http://localhost:8080/Book/findall")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  // 🔵 Handle Add Book to Admin
  const handleAddBookToAdmin = async (book) => {
    try {
      // const response = await fetch(`${app}/Book/add/${adminId}`, {
      const response = await fetch(
        `http://localhost:8080/Book/add/${adminId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(book),
        }
      );

      if (response.ok) {
        alert("✅ Book assigned to Admin successfully!");
        // You can optionally refetch book list or navigate back
        navigate("/BookAddedSuccess", { state: { refresh: true } });
      } else {
        alert("❌ Failed to assign book.");
      }
    } catch (error) {
      console.error("Error assigning book:", error);
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
      <h1 className="title">Library Book Collection </h1>
      <h1 className="title">Library Book Collection </h1>
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
                  src={book.imageUrl || defaultImage}
                  alt={book.title}
                  className="book-image"
                />
              </div>
              <div className="book-info">
                <h2>{book.title}</h2>
                <p>
                  <strong>Author:</strong> {book.author}
                </p>
                <p>
                  <strong>Genre:</strong> {book.genre}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {book.availability ? "Available" : "Borrowed"}
                </p>
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
      ) : (
        <p>No Books this person</p>
      )}
      ;
    </div>
  );
}

export default BookPage;
