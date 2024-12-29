import React, { useState, useEffect } from 'react';
import '../reusable/style/Modal.css'; 

const EditUser = ({ onClose, onUpdateUser, userId }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [roleName, setRoleName] = useState('');
  const [currentPassword, setCurrentPassword] = useState(''); 
  const [password, setPassword] = useState(''); 

  // Load user data from API
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/getUser/${userId}`);
      const data = await response.json();
      setFirstname(data.firstname);
      setLastname(data.lastname);
      setEmail(data.email);
      setRoleName(data.role[0]?.role_name || '');
    };
    fetchUser();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      firstname,
      lastname,
      email,
      role_name: roleName,
      password: password, 
      currentPassword, 
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/updateUser/${userId}` , {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        const data = await response.json();
        onUpdateUser(data); 
        onClose();  
      } else {
        alert('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Error updating user');
    }
  };

  return (
    <div className="create-user-popup">
      <div className="create-user-popup-content">
        <div className="popup-header">
          <h2>Edit User</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group double-input">
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

          {/* Current Password */}
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter Current Password"
              required
            />
          </div>

          {/* New Password (optional) */}
          <div className="form-group">
            <label>New Password (optional)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter New Password"
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

export default EditUser;
