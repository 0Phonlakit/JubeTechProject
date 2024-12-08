import React, { useState } from "react";
import "./style/Header.css";
import { FaUserCircle } from "react-icons/fa"; // ใช้ไอคอนจาก react-icons

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="header">
      {/* โลโก้ JubeTech */}
      <div className="header-logo">
      </div>

      {/* ไอคอน User */}
      <div className="header-user">
        <FaUserCircle className="user-icon" onClick={toggleDropdown} />
        {isDropdownOpen && (
          <div className="dropdown">
            <div className="dropdown-profile">
              <img
                src="https://via.placeholder.com/40" // เปลี่ยนเป็น URL รูปจริง
                alt="Profile"
                className="profile-pic"
              />
              <div>
                <p className="profile-name">John Doe</p>
                <p className="profile-role">Admin</p>
              </div>
            </div>
            <hr />
            <ul className="dropdown-menu">
              <li>My Profile</li>
              <li>Account</li>
            </ul>
            <hr />
            <ul className="dropdown-menu">
              <li>Admin Console</li>
            </ul>
            <hr />
            <ul className="dropdown-menu logout">
              <li>Logout</li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
