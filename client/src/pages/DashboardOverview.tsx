import { useEffect } from "react";
import { IFToggleSidebar } from "../app";
import { checkUser } from "../services/authorize";
import MainDashboard from "../layouts/MainDashboard";

export default function DashboardOverview({ toggleSidebar, setToggleSidebar }:IFToggleSidebar) {

    useEffect(() => {
        if (!checkUser()) window.location.href = "/";
    }, []);

    return (
        <MainDashboard
            title="Tutor Dashboard"
            toggleSidebar={toggleSidebar}
            setToggleSidebar={setToggleSidebar}
            order={90}
        >
            <div></div>
        </MainDashboard>
    );
}