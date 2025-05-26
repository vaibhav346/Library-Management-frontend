import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterSucess.css';

const RegistrationSuccess = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/studentlogin');
  };

  return (
    <div className="success-page">
      <div className="success-container">
        <div className="icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <h1>Registration Successful!</h1>
        <p>Your account has been successfully created. Welcome to the community!</p>
        <button className="btn" onClick={handleLoginRedirect}>
          Proceed to Login
        </button>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
