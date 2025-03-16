import { useState } from "react";
import CourseOptions from "./CourseOptions";
import CourseModal from "./CourseModal";

import "../../../assets/css/course/course-manage.css";
export default function CourseManage() {
    // state
    const [showCourseModal, setShowCourseModal] = useState<boolean>(false);
    const [editCourseId, setEditCourseId] = useState<string>("");
    const [deleteCourseId, setDeleteCourseId] = useState<string>("");

    // render
    return (
        <div className="course-container">
            <CourseModal
                editCourseId={editCourseId}
                setEditCourseId={setEditCourseId}
                showCourseModal={showCourseModal}
                setShowCourseModal={setShowCourseModal}
            />
            <CourseOptions
                showCourseModal={showCourseModal}
                setShowCourseModal={setShowCourseModal}
            />
        </div>
    );
}