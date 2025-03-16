import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import {
    BsX
} from "react-icons/bs";

interface CourseModalProp {
    editCourseId: string,
    setEditCourseId: React.Dispatch<React.SetStateAction<string>>
    showCourseModal: boolean,
    setShowCourseModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CourseModal({ editCourseId, setEditCourseId, showCourseModal, setShowCourseModal }:CourseModalProp) {
    return (
        <div className={"course-modal-container " + (showCourseModal ? "active-modal" : "")}>
            <div className={"main-course-modal " + (showCourseModal ? "active-modal" : "")}>
                <div className="modal-course-header">
                    <p>{editCourseId.trim() !== "" ? "📝 Update course" : "📝 Create course"}</p>
                    <button
                        className="close-course-modal"
                        onClick={() => setShowCourseModal(false)}
                    >
                        <i><BsX size={23} /></i>
                    </button>
                </div>
                <div className="modal-course-body">

                </div>
            </div>
        </div>
    );
}