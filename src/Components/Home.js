// import React from 'react'
// import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import './Home.css';

const Home = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };
  
    const images = [
      "https://media.istockphoto.com/id/505551939/photo/library.jpg?s=612x612&w=0&k=20&c=lGwjpaVR2__plgaEeRiLZ0n1up16Zm3PW6zlR4paabI=",
      "https://www.shutterstock.com/image-photo/book-stack-opened-on-desk-260nw-2318012963.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU1eKFTidaihG_Ipr9w5CtriYEeciwTrpzRQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa3IK-t-aRWLIDs3fh3JdL7CUJqmT64av8mA&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7eV7ciJFGmfq1i1gbZjrZvD7Vk6opG-cx9w&s"
  
    ];
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
      return () => clearInterval(interval);
    }, [images.length]);
  
  
    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm(
        'service_1qsx7oh',      // Replace with your actual service ID
        'template_sm8z8ce',     // Replace with your actual template ID
        e.target,
        'vs13WgBj4tCGC3aGV'       // Replace with your actual public key
      )
      .then((result) => {
        alert("Email sent successfully!");
      }, (error) => {
        alert("Failed to send email. Please try again.");
        console.error(error.text);
      });
  
      e.target.reset(); // clear form after submission
    };
  
    return (
     
      <div>
        {/* Header with Logo */}
        <div className="header">
          <img
            src="https://thumbs.dreamstime.com/z/hand-book-logo-illustration-art-background-43965136.jpg?ct=jpeg"
            alt="Book Logo"
          />
          <h1> Digital Library Management System .Pvt .Limited</h1>
        </div>
  
        <nav className="navbar">
          <button className="toggle-btn" onClick={toggleMenu}>☰</button>
          <ul className={`nav-links ${menuOpen ? 'show' : ''}`}>
            <li><a href="/">Home</a></li>
            <li><a href="/BookPage">Books</a></li>
            <li><a href="/members">Members</a></li>
            <li><a href="/AboutPage">About</a></li>
            <li><a href="/ContactPage">Contact</a></li>
            <li><a href="/AdminRegister">Admin Register</a></li>
            <li><a href="/AdminLogin">Admin Login</a></li>
            <li><a href="/studentregister" >Student Register</a></li>
            <li><a href="/studentlogin" >Student Login</a></li>

          </ul>
        </nav>

    
  
        {/* Marquee */}
        <div className="marquee">
          <p>📚 Welcome to the Library Management System! Browse books, manage members, and more. 📖</p>
        </div>
  
        {/* Image Slider */}
        <div className="slider">
          <img src={images[currentIndex]} alt="Slider" className="slide-image" />
        </div>
        {/* Information Table */}
  <div className="info-table">
    <h2>📖 Library Information</h2>
    <table>
      <thead>
        <tr>
          <th>Section</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Total Books</td>
          <td>5,000+</td>
        </tr>
        <tr>
          <td>Members</td>
          <td>1,200+</td>
        </tr>
        <tr>
          <td>Daily Visitors</td>
          <td>300+</td>
        </tr>
        <tr>
          <td>Operating Hours</td>
          <td>9:00 AM – 6:00 PM</td>
        </tr>
        <tr>
          <td>Contact</td>
          <td>library@domain.com</td>
        </tr>
      </tbody>
    </table>
  </div>
  
  
  
  
  {/* More Library Information Section with Flexbox */}
  <div className="library-info-section">
    <h2>🎥 Learn More About Our Library</h2>
  
    <div className="info-flex">
      {/* YouTube Video */}
      <div className="video-container">
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/x8xjj6cR9Nc"
          title="Library Introduction Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
  
      {/* Text Information */}
      <div className="text-info">
        <h3>📘 About Our Library</h3>
        <p>
          Our Library Management System provides a digital platform for students and staff to access, borrow, and manage books efficiently. From academic resources to fiction, explore thousands of titles with ease.
        </p>
        <ul>
          <li>🔎 Search books by title, author, or category</li>
          <li>⏱ Borrow and return books on time</li>
          <li>🧑‍🎓 Student and admin login portal</li>
          <li>📚 Real-time inventory updates</li>
        </ul>
      </div>
    </div>
  </div>
  
  {/* Google Map Embed */}
  <div className="map-container">
    <h2>📍 Library Location</h2>
    <iframe
      title="Library Location"
      src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d3589.8448722140497!2d75.4830918!3d18.8109167!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e1!3m2!1sen!2sin!4v1746155335385!5m2!1sen!2sin"
      width="100%"
      height="400"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
  
  
        {/* Contact Section */}
        <div className="contact-section">
          {/* Quick Links */}
          <div className="contact-column">
            <h3>📌 Quick Links</h3>
            <ul>
              <li><a href="/books">Books</a></li>
              <li><a href="/members">Members</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
  
          {/* Contact Info */}
          <div className="contact-column">
            <h3>📞 Contact Info</h3>
            <p><strong>Address:</strong> Tulsi College Library, Beed</p>
            <p><strong>Email:</strong> library@tulsicollege.edu.in</p>
            <p><strong>Phone:</strong> +91 9876543210</p>
          </div>
  
          {/* Get In Touch Form */}
          <div className="contact-column">
            <h3>✉️ Get in Touch</h3>
            <form onSubmit={sendEmail}>
              <input type="text" name="user_name" placeholder="Your Name" required />
              <input type="email" name="user_email" placeholder="Your Email" required />
              <textarea name="message" placeholder="Your Message" rows="4" required></textarea>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
  
   {/* Copyright Section */}
   <footer className="footer">
          <p>&copy; {new Date().getFullYear()} Vaibhav vikas dhere. Library Management System. All Rights Reserved.</p>
        </footer>
  
      </div>
      
    );
  };


export default Home
