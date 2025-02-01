import { Link } from "react-router-dom";
import MainDashboard from "../layouts/MainDashboard";
import CourseForm from "../components/Tutor/course/CourseForm";

import "../assets/css/course_management/course.css";
import { useState } from "react";

export default function CourseManagement() {
    const [navOrder, setNavOrder] = useState<number>(0);
    return (
        <MainDashboard title="Course Management" order={1}>
            <div className="courses-container">
                <ul className="nav nav-underline">
                    <li className="nav-item" onClick={() => setNavOrder(0)}>
                        <Link className={"nav-link " + (navOrder === 0 ? "active" : null)} aria-current="page" to="#">รายการคอร์สเรียน</Link>
                    </li>
                    <li className="nav-item" onClick={() => setNavOrder(1)}>
                        <Link className={"nav-link " + (navOrder === 1 ? "active" : null)} to="#">สร้างคอร์สเรียน</Link>
                    </li>
                </ul>
                <div className="course-content">
                    {navOrder === 0 ? "" : <CourseForm />}
                </div>
            </div>
        </MainDashboard>
    );
}