import React from "react";
import Sidebar from "./reusable/Sidebar";
import Header from "./reusable/Header"; 
import PromotionTable from "./promotionManagement/PromotionTable";
import "./Layout.css";

function promotionManagementLayout() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="layout-main">
        <Header />
        <div className="layout-content">
          <PromotionTable />
        </div>
      </div>
    </div>
  );
}

export default promotionManagementLayout;