import {
    BsChevronLeft
} from "react-icons/bs";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useExam } from "../../../contexts/ExamContext";

interface QuestionTopbarProp {
    examId: string
}

export default function QuestionTopbar({ examId }:QuestionTopbarProp) {
    // dom
    const navigate = useNavigate();

    // state
    const { state, fetchExamById } = useExam();

    useEffect(() => {
        if (examId) {
            fetchExamById(examId);
        }
    }, [examId]);
    return (
        <div className="question-manage-topbar">
            {state.loading ? 
                ""
                :
                <>
                    {state.exams.length > 0 ? 
                        <>
                            <div className="back-exam-page">
                                <button onClick={() => navigate("/dashboard/exam-management")}>
                                    <i><BsChevronLeft size={20} /></i>
                                    <span>Go back</span>
                                </button>
                            </div>
                            <div className="exam-title">
                                <p>
                                    <span>📝</span>
                                    {state.exams[0].title}
                                </p>
                            </div>
                            <div className="question-option">
                                <button className="save-question">
                                    Save
                                </button>
                            </div>
                        </>
                        :
                        ""
                    }
                </>
            }
        </div>
    );
}