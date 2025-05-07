import axios from "axios";
import { useParams } from "react-router-dom";
import { getToken } from "../services/authorize";

import "../assets/css/subcourse/main_subcourse.css";

export default function SubCourseManagement() {
    // params
    const { course_id } = useParams();
    
    // render
    return (
        <div className="sub-course-container">
            <div className="sub-course-topbar">

            </div>
            <div className="sub-course-content">

            </div>
        </div>
    );
}