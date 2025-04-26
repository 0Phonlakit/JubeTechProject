import {
    BsX,
    BsPlus
} from "react-icons/bs";

import { useState, useEffect } from "react";
import Spinner from 'react-bootstrap/Spinner';
import { useExam, IFCreateExam } from "../../../contexts/ExamContext";

import "../../../assets/css/exam/exam-modal.css";

interface CreateExamModalProp {
    showExamModal: boolean,
    setShowExamModal: React.Dispatch<React.SetStateAction<boolean>>,
    editExamId: string,
    setEditExamId: React.Dispatch<React.SetStateAction<string>>,
}

export default function CreateExamModal({ showExamModal, setShowExamModal, editExamId, setEditExamId }:CreateExamModalProp) {
    // context
    const { state, createExam, updateExam } = useExam();

    // state
    const [examForm, setExamForm] = useState<IFCreateExam>({
        title: "",
        description: "",
        question_ids: []
    });
    const { title, description } = examForm;

    // function
    const handleExamForm = (target:string, value:string) => {
        setExamForm((prev) => ({...prev, [target]: value}));
    }

    const submitExam = async(e:React.FormEvent) => {
        e.preventDefault();
        if (editExamId) {
            await updateExam(editExamId, examForm);
            setEditExamId("");
        } else {
            await createExam(examForm);
        }
        await new Promise(resolve => setTimeout(resolve, 100));
        clearExamData();
        setShowExamModal(false);
    }

    const clearExamData = () => {
        setExamForm({
            title: "",
            description: "",
            question_ids: []
        });
    }

    // effect
    useEffect(() => {
        if (editExamId) {
            const current_data = state.exams.filter((exam) => exam._id === editExamId);
            handleExamForm("title", current_data[0].title);
            handleExamForm("description", current_data[0].description);
        }
    }, [editExamId]);

    // render
    return (
        <div className={"create-exam-modal " + (showExamModal ? "active-modal" : "")}>
            <div className={"create-exam-content " + (showExamModal ? "active-modal" : "")}>
                {state.loading ? 
                    <div className="exam-modal-preload">
                        <Spinner animation="grow" variant="dark" />
                    </div>
                    :
                    <>
                        <div className="exam-modal-header">
                            <p>{editExamId ? "Update exam" : "Create exam"}</p>
                            <button onClick={() => {
                                clearExamData();
                                setEditExamId("");
                                setShowExamModal(false);
                            }}>
                                <i><BsX size={25} /></i>
                            </button>
                        </div>
                        <span>{editExamId ? "This action will update exam information and describe about detail of exam." : "This action will create exam information and describe about detail of exam."}</span>
                        <div className="exam-modal-body">
                            <form onSubmit={submitExam}>
                                <div className="manual-input">
                                    <label htmlFor="exam-title">Title</label>
                                    <input
                                        id="exam-title"
                                        type="text"
                                        value={title}
                                        maxLength={50}
                                        placeholder="Enter your title of exam..."
                                        onChange={(e) => handleExamForm("title", e.target.value)}
                                    />
                                    <span>{title.length} / 50</span>
                                </div>
                                <div className="manual-input">
                                    <label htmlFor="exam-description">Description</label>
                                    <textarea
                                        id="exam-description"
                                        maxLength={300}
                                        value={description}
                                        onChange={(e) => handleExamForm("description", e.target.value)}
                                        placeholder="Enter your description about exam..."
                                    ></textarea>
                                    <span>{description.length} / 300</span>
                                </div>
                                <button type="submit">
                                    <i><BsPlus size={18} /></i>
                                    {editExamId ? "Update" : "Create"}
                                </button>
                            </form>
                        </div>
                    </>
                }
            </div>
        </div>
    );
}