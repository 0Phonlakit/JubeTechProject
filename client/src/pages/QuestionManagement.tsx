import { IFToggleSidebar } from "../app";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainDashboard from "../layouts/MainDashboard";

export default function QuestionManagement({ toggleSidebar, setToggleSidebar }:IFToggleSidebar) {
    // get exam id
    const { exam_id } = useParams();

    // effect
    useEffect(() => {
        console.log(exam_id);
    }, []);

    return (
        <MainDashboard
            title="Question Management"
            title_sidebar="ชุดคำถามแบบทดสอบ"
            toggleSidebar={toggleSidebar}
            setToggleSidebar={setToggleSidebar}
        >
            <div className="main-question-container">
                awdawd
            </div>
        </MainDashboard>
    );
}