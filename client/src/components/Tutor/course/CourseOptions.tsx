import {
    BsPlus,
    BsSearch,
    BsFillFilterCircleFill
} from "react-icons/bs";

interface CourseOptionsProp {
    showCourseModal: boolean,
    setShowCourseModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CourseOptions({ showCourseModal, setShowCourseModal }:CourseOptionsProp) {
    return (
        <div className="course-options-container">
            <div className="search-course">
                <input
                    type="text"
                    placeholder="Search course by title name..."
                />
                <i><BsSearch size={18} /></i>
            </div>
            <div className="course-btn-continer">
                <button
                    className="filter-course-btn"
                >
                    <i><BsFillFilterCircleFill size={15} /></i>
                    Advance filter
                </button>
                <button
                    className="add-course-btn"
                    onClick={() => setShowCourseModal(!showCourseModal)}
                >
                    <i><BsPlus size={15} /></i>
                    Add course
                </button>
            </div>
        </div>
    );
}