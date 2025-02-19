import { useState } from "react";
import MainDashboard from "../layouts/MainDashboard";

import "../assets/css/category/category.css";

interface DashboardProp {
    toggleSidebar: boolean,
    setToggleSidebar: (value: boolean | ((prev: boolean) => boolean)) => void
}

export default function CategoryManagement({ toggleSidebar, setToggleSidebar }:DashboardProp) {
    const [page, setPage] = useState<number>(0)

    return (
        <MainDashboard title="Category Management" order={3} toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} >
            <div className="category-manage-container">
                {/* Tabs */}
                <div className="tabs-container">
                    
                </div>
            </div>
        </MainDashboard>
    );
}