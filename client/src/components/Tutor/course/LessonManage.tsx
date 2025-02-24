import LessonCard from "./LessonCard";
import { useState, useEffect } from "react";
import { useLesson, IFSearchParam, LessonCard as IFLessonCard } from "../../../contexts/LessonContext";
import {
    BsSearch,
    BsFolderPlus,
    BsPencilSquare,
    BsFillTrashFill,
    BsFillFilterCircleFill
} from "react-icons/bs";

import "../../../assets/css/course/lesson-manage.css";

interface ResponseMessage {
    status: number,
    message: string
}

export default function LessonManage() {
    // context
    const { state, dispatch, fetchLessonByTutor } = useLesson();
    // state
    const [startFetch, setStartFetch] = useState<boolean>(true);
    const [filterLesson, setFilterLesson] = useState<IFLessonCard[]>([]);
    const [messageList, setMessageList] = useState<ResponseMessage[]>([]);
    const [deleteLesson, setDeleteLesson] = useState<string>("");
    const [searchLesson, setSearchLesson] = useState<IFSearchParam>({
        name: "",
        type: "",
        isFreePreview: null,
        startDate: "",
        endDate: "",
        page: 1,
        pageSize: 20
    });
    const { name } = searchLesson;
    // useEffect
    useEffect(() => {
        // trigger lesson
        if (state.lessons.length === 0 && startFetch) {
            fetchLessonByTutor("", searchLesson);
            setStartFetch(false);
        } else {
            if (name.trim() !== "") {
                setFilterLesson(state.lessons.filter(lesson => 
                    lesson.name.toLowerCase().includes(name.toLowerCase())
                ));
            } else {
                setFilterLesson(state.lessons);
            }
        }
        // trigger response
        if (state.response) {
            if (Array.isArray(state.response)) {
                //
            } else {
                const response:ResponseMessage = {
                    status: state.status,
                    message: state.response
                }
                setMessageList([...messageList, response]);
            }
            setTimeout(() => {
                setMessageList((prev) => prev.slice(1));
            }, 3000);
        }
        dispatch({ type: "CLEAR_RESPONSE", message: "" });
    }, [state.lessons, searchLesson, state.response]);

    /* Function section */
    const handleSearch = (key:string, value:string | number | Date) => {
        setSearchLesson((prev) => ({...prev, [key]:value}));
    }
    /* End section */

    // render
    return (
        <div className="lesson-container">
            <div className="search-lesson-container">
                <div className="search-input">
                    <input
                        type="text"
                        className="search-inp"
                        placeholder="Search by title for lesson..."
                        onChange={(event) => handleSearch("name", event.target.value)}
                    />
                    <i><BsSearch size={15} /></i>
                </div>
                <div className="option-btn-container">
                    <button id="filter-lesson">
                        <i><BsFillFilterCircleFill size={19} /></i>
                        Advance filter
                    </button>
                    <button id="create-lesson">
                        <i><BsFolderPlus size={19} /></i>
                        Add lesson
                    </button>
                </div>
            </div>
            {state.loading === true
                ?
                ""
                :
                <div className="lesson-card-list">
                    {filterLesson.map((lesson, index) => (
                        <LessonCard
                            {...lesson}
                            key={index}
                            deleteLesson={deleteLesson}
                            setDeleteLesson={setDeleteLesson}
                        />
                    ))}
                </div>
            }
        </div>
    );
}