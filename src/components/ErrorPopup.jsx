import React from "react";

const ErrorPopup = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="error-popup">
      <div className="error-popup-content">
        <p>{message}</p>
        <a href="/">&times;</a>
      </div>
    </div>
  );
};

export default ErrorPopup;
