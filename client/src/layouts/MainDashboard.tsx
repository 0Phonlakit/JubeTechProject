import { useEffect } from "react";
import Topbar from "./sections/Topbar";
import Sidebar from "./sections/Sidebar";
import { IFToggleSidebar } from "../app";
import { checkUser } from "../services/authorize";

import "../assets/css/dashboard/dashboard.css";

interface DashboardProp {
    title: string,
    order: number,
    children: React.ReactNode,
}

export default function MainDashboard({ order, title, children, toggleSidebar, setToggleSidebar }:DashboardProp & IFToggleSidebar) {
    useEffect(() => { // Change Title
        document.title = title;
        if (!checkUser()) window.location.href = "/";
    }, []);

    // Render
    return (
        <div className={"main-dashboard " + (toggleSidebar ? "active-sidebar" : null)}>
            <Sidebar order={order} toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} />
            <div className="main-dashboard-content">
                <Topbar title={title} />
                <div className="sub-dashboard-content">
                    {children}
                </div>
            </div>
        </div>
    );
}