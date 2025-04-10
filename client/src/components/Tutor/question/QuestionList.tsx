import {
    BsPlus,
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
];

const codeLanguage:SelectType[] = [
    {
        label: "None",
        value: ""
    },
    {
        label: "Python",
        value: "python"
    },
    {
        label: "C",
        value: "c"
    },
    {
        label: "C++",
        value: "c++"
    },
    {
        label: "Javascript",
        value: "javascript"
    }
];

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

    // dom
    document.addEventListener("mousemove", (e) => {
        const scrollMargin = 50;
        const scrollSpeed = 10;
    
        if (e.clientY < scrollMargin) {
            window.scrollBy(0, -scrollSpeed);
        } else if (e.clientY > window.innerHeight - scrollMargin) {
            window.scrollBy(0, scrollSpeed);
        }
    });

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

    const handleQuestion = (target:string, key:string, value:string | boolean) => {
        setQuestionData((prev) => {
            return prev.map((question) => (question._id === target ? { ...question, [key]:value } : question));
        });
    }

    const handleChoice = (target:string, currentIndex:number, value:string) => {
        const radio_check = document.getElementById("choice" + currentIndex) as HTMLInputElement;
        if (radio_check.checked) {
            handleQuestion(target, "solution", value);
        }
        setQuestionData(prev =>
            prev.map(question => {
                if (question._id === target) {
                    const updatedChoices = question.choices.map((choice, index) =>
                    index === currentIndex ? value : choice
                    );
                    return {
                    ...question,
                    choices: updatedChoices,
                    };
                }
                return question;
            })
        );
    }

    const handleCase = (target:string, currentIndex:number, value:string) => {
        setQuestionData(prev =>
            prev.map(question => {
                if (question._id === target) {
                    const updatedCase = question.test_case.map((testcase, index) =>
                    index === currentIndex ? value : testcase
                    );
                    return {
                    ...question,
                    test_case: updatedCase,
                    };
                }
                return question;
            })
        );
    }

    const addChoice = (target:string) => {
        const currentData = questionData.filter((question) => question._id === target);
        if (currentData[0].choices.length < 5) {
            setQuestionData((prev) => {
                return prev.map((question) => (question._id === target ? { ...question, choices: [...question.choices, ""] } : question));
            });
        }
    }

    const removeChoice = (target:string, currentIndex:number) => {
        const currentData = questionData.filter((question) => question._id === target);
        const radio_check = document.getElementById("choice" + currentIndex) as HTMLInputElement;
        if (radio_check.checked) handleQuestion(target, "solution", "");
        if (currentData[0].choices.length > 0) {
            const result = currentData[0].choices.filter((_choice, index) => index !== currentIndex);
            setQuestionData((prev) => {
                return prev.map((question) => (question._id === target ? { ...question, choices: result } : question));
            });
        }
    }

    const addCase = (target:string) => {
        const currentData = questionData.filter((question) => question._id === target);
        if (currentData[0].test_case.length < 4) {
            setQuestionData((prev) => {
                return prev.map((question) => (question._id === target ? { ...question, test_case: [...question.test_case, ""] } : question));
            });
        }
    }

    const removeCase = (target:string, currentIndex:number) => {
        const currentData = questionData.filter((question) => question._id === target);
        if (currentData[0].test_case.length > 0) {
            const result = currentData[0].test_case.filter((_testcase, index) => index !== currentIndex);
            setQuestionData((prev) => {
                return prev.map((question) => (question._id === target ? { ...question, test_case: result } : question));
            });
        }
    }
    
    // render
    return (
        <>
            {isRender ?
                <>
                    <div className="question-list-container">
                        <div>
                            <ReactSortable className="side-question-list" list={questionData} setList={setQuestionData}>
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
                            </ReactSortable>
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
                                            <div className="question-info-input">
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
                                            <div className="main-body-question">
                                                {question.type === "multiple_choice" && (
                                                    <>
                                                        <form className="input-choice">
                                                            {question.choices.map((choice, index) => (
                                                                <div className="choice-info" key={index}>
                                                                    <input
                                                                        id={"choice" + index}
                                                                        name="choice-radio"
                                                                        type="radio"
                                                                        value={choice}
                                                                        checked={question.solution === choice}
                                                                        onChange={(e) => handleQuestion(question._id, "solution", e.target.value)}
                                                                    />
                                                                    <input
                                                                        type="text"
                                                                        value={choice}
                                                                        onChange={(e) => handleChoice(question._id, index, e.target.value)}
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => removeChoice(question._id, index)}
                                                                    >
                                                                        <i><BsTrash3 size={18} /></i>
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </form>
                                                        <button
                                                            className="create-selection-btn"
                                                            onClick={() => addChoice(question._id)}
                                                        >
                                                            <i><BsPlus size={18} /></i>
                                                            Add selection
                                                        </button>
                                                    </>
                                                )}
                                                {question.type === "coding" && (
                                                    <>
                                                        <form className="code-input">
                                                            <div className="select-code">
                                                                <label htmlFor="code-language">
                                                                    Code language : 
                                                                </label>
                                                                <Select
                                                                    id="code-language"
                                                                    options={codeLanguage}
                                                                    defaultValue={codeLanguage.some((code) => code.value === question.solution) ? question.solution : ""}
                                                                    onChange={(selected) => handleQuestion(question._id, "solution", selected)}
                                                                />
                                                            </div>
                                                            {question.test_case.map((testcase, index) => (
                                                                <div className="case-info" key={index}>
                                                                    <input
                                                                        type="text"
                                                                        value={testcase}
                                                                        onChange={(e) => handleCase(question._id, index, e.target.value)}
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => removeCase(question._id, index)}
                                                                    >
                                                                        <i><BsTrash3 size={17} /></i>
                                                                    </button>
                                                                </div>
                                                            ))}
                                                            <button
                                                                className="create-case-btn"
                                                                type="button"
                                                                onClick={() => addCase(question._id)}
                                                            >
                                                                <i><BsPlus size={18} /></i>
                                                                Add case
                                                            </button>
                                                        </form>
                                                    </>
                                                )}
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