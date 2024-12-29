import React from "react";
import UserTable from "./userManagement/UserTable";
import "./Layout.css";

function UserManagementLayout() {
  return (
    <div className="layout">
      <div className="layout-main">
        <div className="layout-content">
          <UserTable />
        </div>
      </div>
    </div>
  );
}

export default UserManagementLayout;
