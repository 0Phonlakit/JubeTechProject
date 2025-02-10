import { ReactNode, useEffect } from "react";
import Topbar from "./sections/Topbar";
import Sidebar from "./sections/Sidebar";

import "../assets/css/dashboard/dashboard.css";

interface MainDashboardProp {
    title:string,
    order:number,
    children?: ReactNode
}

export default function MainDashboard({ title, order, children }:MainDashboardProp) {
    useEffect(() => {
        document.title = `${title!} - ${import.meta.env.VITE_APP_NAME}`
    }, []);
    return (
        <div className="dashboard">
            <Sidebar order={order} />
            <div className="main-content">
                <Topbar />
                <div className="table-responsive">
                    <div className="dashboard-content">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}