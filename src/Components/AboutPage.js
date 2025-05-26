import React from 'react';
import './AboutPage.css';  // Importing the external CSS

function AboutPage() {
  return (
    <div className="about-page">
      <header className="about-header">
        <h1>About Us</h1>
        <p>Welcome to our site. Learn more about who we are and what we do!</p>
      </header>

      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to provide high-quality services and create lasting relationships with our customers. We believe in innovation, integrity, and excellence.
        </p>
      </section>

      <section className="about-section">
        <h2>Our Vision</h2>
        <p>
          We envision a future where technology empowers people and organizations to reach their full potential. We strive to create solutions that make a meaningful impact on society.
        </p>
      </section>

      <section className="about-section">
        <h2>Contact Us</h2>
        <p>Email: <a href="mailto:info@ourcompany.com">info@ourcompany.com</a></p>
        <p>Phone: +1 (123) 456-7890</p>
        <p>Address: 123 Our Company St, Tech City, ABC</p>
      </section>

      <footer className="about-footer">
        <p>&copy; 2025 Our Company. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AboutPage;
