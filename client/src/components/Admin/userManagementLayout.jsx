import React from "react";
import Sidebar from "./reusable/Sidebar";
import Header from "./reusable/Header";
import UserTable from "./userManagement/UserTable";
import "./Layout.css";

function UserManagementLayout() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="layout-main">
        <Header />
        <div className="layout-content">
          <UserTable />
        </div>
      </div>
    </div>
  );
}

export default UserManagementLayout;
