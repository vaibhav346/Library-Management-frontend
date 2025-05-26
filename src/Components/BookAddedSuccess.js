import React from 'react';
import './BookAddedSuccess.css'; // External CSS file
import { useNavigate } from 'react-router-dom';

function BookAddedSuccess() {
  const navigate = useNavigate();

  return (
    <div className="successfully-container">
      <div className="success-card">
        <h1>✅ Book Added Successfully!</h1>
        <p>Your book has been added to the library collection.</p>
        <button onClick={() => navigate('/AdminProfile')} className="btn-back">
          🔙 Back to Admin Profile
        </button>
      </div>
    </div>
  );
}

export default BookAddedSuccess;
