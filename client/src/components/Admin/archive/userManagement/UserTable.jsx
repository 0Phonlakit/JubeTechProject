import React, { useState, useEffect } from "react";
import CreateUser from "./CreateUser"; 
import EditUser from "./EditUser"; 
import DeleteUser from "./DeleteUser"; 
import "./style/UserTable.css";
import EditIcon from "../assets/editIcon.png";
import BinIcon from "../assets/binIcon.png";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [page, setPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(25);
  const [showCreateUserPopup, setShowCreateUserPopup] = useState(false);
  const [showEditUserPopup, setShowEditUserPopup] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const fetchUsers = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/getAllUsers`);
    const data = await response.json();
    setUsers(data);
    setFilteredUsers(data);  // Set initial state to show all users
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleRoleChange = (e) => setSelectedRole(e.target.value);
  const handleEntriesChange = (e) => setEntriesPerPage(Number(e.target.value));

  const getRoleClass = (roleName) => {
    switch (roleName) {
      case "Admin":
        return "admin";
      case "Student":
        return "student";
      case "Tutor":
        return "tutor";
      default:
        return "";
    }
  };

  // Trigger search only when button is clicked
  const handleSearchClick = () => {
    let filtered = users;

    if (searchQuery) {
      filtered = filtered.filter((user) =>
        user.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user._id.toString().includes(searchQuery)
      );
    }

    if (selectedRole) {
      filtered = filtered.filter((user) =>
        user.role.some(role => role.role_name === selectedRole)
      );
    }

    setFilteredUsers(filtered); // Update filteredUsers after search
    setPage(1);  // Reset to the first page after searching
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prev) => Math.max(prev - 1, 1));
    }
  };

  const handleAddUser = () => {
    setShowCreateUserPopup(true);
  };

  const handleClosePopup = () => {
    setShowCreateUserPopup(false);
    setShowEditUserPopup(false);
    setShowDeleteUser(false);
    setEditUserId(null);
    setUserToDelete(null);
  };

  const handleCreateUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setFilteredUsers((prevFilteredUsers) => [...prevFilteredUsers, newUser]); 
  };

  const handleEditUser = (userId) => {
    setEditUserId(userId);
    setShowEditUserPopup(true);
  };

  const handleUpdateUser = (response) => {
    const updatedUser = response.user;

    if (!updatedUser || !updatedUser._id) {
      console.error("Invalid updated user data", updatedUser);
      return;
    }

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      )
    );
    setFilteredUsers((prevFilteredUsers) =>
      prevFilteredUsers.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      )
    ); 
  };

  const handleDeleteClick = (userId) => {
    setUserToDelete(userId);
    setShowDeleteUser(true);
  };

  const handleDeleteUser = async () => {
    if (userToDelete) {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/deleteUser/${userToDelete}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userToDelete));
        setFilteredUsers((prevFilteredUsers) => prevFilteredUsers.filter((user) => user._id !== userToDelete));
        setShowDeleteUser(false);
      } else {
        alert("Failed to delete user.");
      }
    }
  };

  return (
    <div className="user-table">
      <div className="breadcrumb">
        <span className="breadcrumb-item">User Management</span>
        <span className="breadcrumb-item active">User List</span>
      </div>

      <div className="filters">
        <input
          type="text"
          className="search-input"
          placeholder="Search by User Name or User ID"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <select className="role-select" value={selectedRole} onChange={handleRoleChange}>
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="Student">Student</option>
          <option value="Tutor">Tutor</option>
        </select>
        <button className="search-button" onClick={handleSearchClick}>Search</button>
        <button className="add-user-button" onClick={handleAddUser}>+ Add User</button>
      </div>

      <div className="entries-pagination-container">
        <div className="entries-display">
          <span>Show </span>
          <input
            type="number"
            value={entriesPerPage}
            onChange={handleEntriesChange}
            min="1"
          />
          <span> entries</span>
        </div>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.slice((page - 1) * entriesPerPage, page * entriesPerPage).map((user, index) => (
            <tr key={user._id}>
              <td><input type="checkbox" /></td>
              <td>{(page - 1) * entriesPerPage + index + 1}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>
                <span className={`role-badge ${getRoleClass(user.role[0].role_name)}`}>
                  {user.role[0].role_name}
                </span>
              </td>
              <td>
                <button 
                  onClick={() => handleEditUser(user._id)} 
                  className="edit-button">
                  <img src={EditIcon} alt="Edit" />
                </button>
                <button 
                  onClick={() => handleDeleteClick(user._id)} 
                  className="delete-button">
                  <img src={BinIcon} alt="Delete" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="entries-pagination-container">
        <div className="entries-range">
          <span>
            Show {((page - 1) * entriesPerPage) + 1} to {Math.min(page * entriesPerPage, filteredUsers.length)} of {filteredUsers.length} entries
          </span>
        </div>

        <div className="pagination">
          <div className="page-buttons">
            <button onClick={handlePreviousPage}>Previous</button>
            <span className="current-page">{page}</span>
            <button 
              onClick={handleNextPage}
              disabled={page === Math.ceil(filteredUsers.length / entriesPerPage)}>
              Next
            </button>
          </div>
        </div>
      </div>

      {showCreateUserPopup && (
        <CreateUser
          onClose={handleClosePopup}
          onCreateUser={handleCreateUser}
        />
      )}
      {showEditUserPopup && (
        <EditUser
          userId={editUserId}
          onClose={handleClosePopup}
          onUpdateUser={handleUpdateUser}
        />
      )}
      {showDeleteUser && (
        <DeleteUser
          onClose={handleClosePopup}
          onDeleteUser={handleDeleteUser}
        />
      )}
    </div>
  );
};

export default UserTable;
