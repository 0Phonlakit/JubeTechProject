import Topbar from "./sections/Topbar";
import Sidebar from "./sections/Sidebar";
import { useEffect } from "react";

import "../assets/css/dashboard/dashboard.css";

interface DashboardProp {
    title: string,
    order: number,
    children: React.ReactNode,
    toggleSidebar: boolean,
    setToggleSidebar: (value: boolean | ((prev: boolean) => boolean)) => void
}

export default function MainDashboard({ order, title, children, toggleSidebar, setToggleSidebar }:DashboardProp) {
    useEffect(() => { // Change Title
        document.title = title;
    }, []);

    // Render
    return (
        <div className={"main-dashboard " + (toggleSidebar ? "active-sidebar" : null)}>
            <Sidebar order={order} toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} />
            <div className="main-dashboard-content">
                <Topbar />
                <div className="sub-dashboard-content">
                    {children}
                </div>
            </div>
        </div>
    );
}