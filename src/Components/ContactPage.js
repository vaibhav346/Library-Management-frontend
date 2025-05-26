import React from 'react';
import emailjs from 'emailjs-com';
import './ContactPage.css';

function ContactPage() {

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_1qsx7oh',       // Replace with your EmailJS Service ID
      'template_sm8z8ce',      // Replace with your Template ID
      e.target,
      'vs13WgBj4tCGC3aGV'      // Replace with your Public Key
    )
    .then((result) => {
      alert("Email sent successfully!");
    }, (error) => {
      alert("Failed to send email. Please try again.");
      console.error(error.text);
    });

    e.target.reset(); // Clear the form after submission
  };

  return (
    <div className="contact-container">
      <div className="contact-left">
        <h1>Get in Touch</h1>
        <p>Have any questions? We'd love to hear from you!</p>

        <div className="contact-info">
          <h3>📍 Address:</h3>
          <p>Patoda, Maharashtra, India</p>

          <h3>📞 Phone:</h3>
          <p>+91 7499506039</p>

          <h3>📧 Email:</h3>
          <p>vaibhavdhere6@gmail.com</p>
        </div>

        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">🌐 Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">🐦 Twitter</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">💼 LinkedIn</a>
          <a href="https://github.com" target="_blank" rel="noreferrer">🐱 GitHub</a>
        </div>
      </div>

      <div className="contact-right">
        <form onSubmit={sendEmail} className="contact-form">
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <input type="text" name="subject" placeholder="Subject" />
          <textarea name="message" placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>

      <div className="contact-map">
        <h2>📌 Find Us Here</h2>
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d3589.8448722140497!2d75.4830918!3d18.8109167!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e1!3m2!1sen!2sin!4v1746155335385!5m2!1sen!2sin"
      width="100%"
          height="300"
          style={{ border: "0", borderRadius: "10px", marginTop: "20px" }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

export default ContactPage;
