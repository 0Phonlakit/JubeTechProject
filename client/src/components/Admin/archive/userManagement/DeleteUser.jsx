import React from "react";
import "./style/DeleteUser.css";

const DeleteUser = ({ userId, onClose, onDeleteUser }) => {
  const handleDelete = () => {
    onDeleteUser(); 
    onClose(); 
  };

  return (
    <div className="delete-popup">
      <div className="delete-popup-content">
        <div className="popup-header">
          <h2>Confirm Deletion</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <p>Are you sure you want to delete this user?</p>
        <div className="form-actions">
          <button className="delete-btn" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
