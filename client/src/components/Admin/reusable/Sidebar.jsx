import React from "react";
import { Link, useLocation } from "react-router-dom"; // ใช้ useLocation
import "./style/Sidebar.css"; // สำหรับ CSS

const Sidebar = () => {
  const location = useLocation(); // ใช้ useLocation เพื่อตรวจสอบเส้นทางปัจจุบัน

  // ฟังก์ชันเพื่อเช็คว่า path ตรงกับเมนูไหน
  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      <div className="logo">
        <span className="jubetech">Jube</span>
        <span className="tech">Tech</span>
      </div>
      <ul className="menu">
        <li className={isActive("/usermanagement") ? "active" : ""}>
          <Link to="/usermanagement">User Management</Link>
        </li>
        <li className={isActive("/promotion") ? "active" : ""}>
          <Link to="/promotion">Promotion Management</Link>
        </li>
        <li className={isActive("/settings") ? "active" : ""}>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
