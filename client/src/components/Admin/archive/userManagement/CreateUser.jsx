import React, { useState } from 'react';
import '../reusable/style/Modal.css'; 

const CreateUser = ({ onClose, onCreateUser }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [roleName, setRoleName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const newUser = {
      firstname,
      lastname,
      email,
      password,
      role_name: roleName,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/createUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const data = await response.json();
        onCreateUser(data); 
        onClose(); 
      } else {
        alert('Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error creating user');
    }
  };

  return (
    <div className="create-user-popup">
      <div className="create-user-popup-content">
        <div className="popup-header">
          <h2>Add User</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group double-input">

            {/* First Name */}
            <div className="input-container">
              <label>First Name</label>
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                placeholder="Enter First Name"
                required
              />
            </div>

            {/* Last Name */}
            <div className="input-container">
              <label>Last Name</label>
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                placeholder="Enter Last Name"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              required
            />
          </div>

          {/* Role */}
          <div className="form-group">
            <label>Role</label>
            <select
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Student">Student</option>
              <option value="Tutor">Tutor</option>
            </select>
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
