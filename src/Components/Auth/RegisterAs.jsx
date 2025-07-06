import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPopup({ onClose }) {
  const navigate = useNavigate();

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Register as:</h3>
        <button onClick={() => navigate('/register/startup')}>StartUp</button>
        <button onClick={() => navigate('/register/company')}>Shipping Company</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}