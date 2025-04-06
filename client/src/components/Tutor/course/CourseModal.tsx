import {
    BsX
} from "react-icons/bs";

import { Steps } from "antd";
import { useEffect, useState } from "react";
import CourseStepOne from "./CourseStepOne";

import "../../../assets/css/course/course-modal.css";

interface CourseModalProp {
    editCourseId: string,
    setEditCourseId: React.Dispatch<React.SetStateAction<string>>
    showCourseModal: boolean,
    setShowCourseModal: React.Dispatch<React.SetStateAction<boolean>>
}

// const stepInformation = [
//     {
//         title: "Create course card",
//         description: "Complete course card details for display."
//     },
//     {
//         title: ""
//     }
// ]

export default function CourseModal({ editCourseId, setEditCourseId, showCourseModal, setShowCourseModal }:CourseModalProp) {
    // state
    const [step, setStep] = useState<number>(1);
    // effect

    // function

    // render
    return (
        <div className={"course-modal-container " + (showCourseModal ? "active-modal" : "")}>
            <div className={"main-course-modal " + (showCourseModal ? "active-modal" : "")}>
                <div className="modal-course-header">
                    <p>{editCourseId.trim() !== "" ? "📝 Update course" : "📝 Create course"}</p>
                    <button
                        className="close-course-modal"
                        onClick={() => setShowCourseModal(false)}
                    >
                        <i><BsX size={28} /></i>
                    </button>
                </div>
                <div className="modal-course-body">
                    {step === 1 && <CourseStepOne />}
                </div>
            </div>
        </div>
    );
}