import {
    BsCopy,
    BsTrash3,
    BsThreeDots,
    BsGrid3X2GapFill
} from "react-icons/bs";

import { v4 as uuidv4 } from "uuid";
import { Popover, Select } from "antd";
import { useState, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import QuestionSkeleton from "./QuestionSkeleton";
import UploadImageQuestion from "./UploadImageQuestion";
import { useQuestion, Question } from "../../../contexts/QuestionContext";

import "../../../assets/css/question/question-list.css";

interface QuestionData extends Question {
    id: string,
    name: string
}

interface QuestionListProp {
    examId: string
}

interface SelectType {
    label: string,
    value: string
}

const questionType:SelectType[] = [
    {
        label: "None",
        value: ""
    },
    {
        label: "Multiple Choice",
        value: "multiple_choice"
    },
    {
        label: "Coding",
        value: "coding"
    },
    {
        label: "Open Ended",
        value: "open_ended"
    }
]

export default function QuestionList({ examId }:QuestionListProp) {
    // context
    const { state, fetchQuestionFromExamId } = useQuestion();

    // state
    const [isRender, setIsRender] = useState<boolean>(false);
    const [currentFocus, setCurrentFocus] = useState<string>("");
    const [currentDropdown, setCurrentDropdown] = useState<string>("");
    const [questionData, setQuestionData] = useState<QuestionData[]>([]);

    // effect
    useEffect(() => {
        setIsRender(false);
        if (examId) {
            fetchQuestionFromExamId("", examId);
            setIsRender(true);
        }
    }, [examId]);

    useEffect(() => {
        if (state.questions.length > 0) {
            setQuestionData(state.questions.map((question) => {
                return {
                    ...question,
                    id: uuidv4(),
                    name: question.question
                }
            }));
        } else {
            setQuestionData([]);
        }
    }, [state.questions]);

    // function
    const handleFocus = (key:string) => {
        if (currentFocus === key) {
            setCurrentFocus("");
        } else {
            scrollToSection(key);
            setCurrentFocus(key);
        }
    }

    const scrollToSection = (id: string) => {
        const card = document.getElementById(id);
        if (card) {
            card.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleQuestion = (target:string, key:string, value:string) => {
        setQuestionData((prev) => {
            return prev.map((question) => (question._id === target ? { ...question, [key]:value } : question));
        });
    }
    
    // render
    return (
        <>
            {isRender ?
                <>
                    <div className="question-list-container">
                        <div className="side-question-list">
                            {questionData.map((question, index) => (
                                <div
                                    key={index}
                                    onDoubleClick={() => handleFocus(question.id)}
                                    className={"side-question-card " + (currentFocus === question.id ? "active-side-card" : "")}
                                >
                                    <div className="side-question-topbar">
                                        <div className="side-question-index">
                                            {index + 1}
                                        </div>
                                        <Popover
                                            placement="right"
                                            className="side-question-title"
                                            content={<span>Double click to focus!</span>}
                                        >
                                            {question.question.length > 23 ?
                                                question.question.slice(0, 23) + "..."
                                                :
                                                question.question
                                            }
                                        </Popover>
                                    </div>
                                    <div className="side-question-footer">
                                        {question.type && (
                                            <div className="side-question-type">
                                                {question.type.replace("_", " ")}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="question-list-content">
                            <ReactSortable list={questionData} setList={setQuestionData} className="question-list-content" handle=".drag-position">
                                {questionData.map((question) => (
                                    <div
                                        id={question.id}
                                        key={question.id}
                                        className={"question-manage-card " + (currentFocus === question.id ? "active-manage-card" : "")}
                                    >
                                        <button type="button" className="drag-position">
                                            <i>
                                                <BsGrid3X2GapFill />
                                            </i>
                                        </button>
                                        <div className="question-manage-header">
                                            <div className="question-manage-type">
                                                <Select
                                                    options={questionType}
                                                    defaultValue={question.type}
                                                    onChange={(selected) => handleQuestion(question._id, "type", selected)}
                                                />
                                            </div>
                                            <div className="question-manage-option">
                                                <button className="question-option" onClick={() => {
                                                    if (currentDropdown === question._id) {
                                                        setCurrentDropdown("");
                                                    } else {
                                                        setCurrentDropdown(question._id);
                                                    }
                                                }}>
                                                    <i><BsThreeDots /></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="question-manage-body">
                                            <div className="question-manage-info">
                                                <label htmlFor="question-title">Question : </label>
                                                <textarea
                                                    value={question.question}
                                                    onChange={(e) => handleQuestion(question._id, "question", e.target.value)}
                                                ></textarea>
                                                <span>{question.question.length}</span>
                                            </div>
                                            <div className="question-manage-image">
                                                <UploadImageQuestion />
                                            </div>
                                        </div>
                                        {currentDropdown === question._id && (
                                            <div className="question-dropdown">
                                                <ul>
                                                    <li>
                                                        <i><BsCopy /></i>
                                                        <span>duplicate</span>
                                                    </li>
                                                    <li>
                                                        <i><BsTrash3 /></i>
                                                        <span>delete</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </ReactSortable>
                        </div>
                    </div>
                </>
                :
                <QuestionSkeleton />
            }
        </>
    );
}