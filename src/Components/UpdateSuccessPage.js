import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UpdateSuccessPage.css';

const UpdateSuccessPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/AdminLogin');  // Redirect to AdminProfile page after successful update
  };

  return (
    <div className="update-success-page">
      <div className="success-message">
        <h2>🎉 Success!</h2>
        <p>Your book has been updated successfully.</p>
        <button className="btn-go-back" onClick={handleGoBack}>Back to Admin Profile</button>
      </div>
    </div>
  );
};

export default UpdateSuccessPage;
