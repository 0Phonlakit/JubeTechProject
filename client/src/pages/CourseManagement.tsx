import { IFToggleSidebar } from "../App";
import MainDashboard from "../layouts/MainDashboard";

export default function CourseManagement({ toggleSidebar, setToggleSidebar }:IFToggleSidebar) {
    return (
        <MainDashboard title="Course Management" order={1} toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar}>
            Course
        </MainDashboard>
    );
}