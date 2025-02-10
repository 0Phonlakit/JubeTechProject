import { useState } from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Paper from "@mui/material/Paper";
import MainDashboard from "../layouts/MainDashboard";
import CourseForm from "../components/Tutor/course/CourseForm";

import "../assets/css/course/course.css";

export interface CourseState {
    title: string,
    price: number,
    is_point: boolean,
    point: number,
    description: string,
    categories: string[],
    objectives: string[],
    sections: string[],
    image: File | null
}

export default function CourseManagement() {
    const [tabPage, setTapPage] = useState<number>(0);
    const [progress, setProgress] = useState(0);
    const [course, setCourse] = useState<CourseState>({
        title: "",
        price: 0,
        point: 0,
        is_point: false,
        description: "",
        categories: [],
        objectives: [],
        sections: [],
        image: null
    });

    function triggerTab(_event: React.SyntheticEvent, newValue: number) {
        setTapPage(newValue);
    }
    
    return (
        <MainDashboard title="Course Management" order={1}>
            <div className="main-course-container">
                <Paper sx={{ height: 800, width: "100%", borderRadius: "20px", padding: "10px 5px", overflowY: "scroll"}}>
                    <Tabs
                        value={tabPage}
                        onChange={triggerTab}
                        textColor="secondary"
                        indicatorColor="secondary"
                    >
                        <Tab value={0} label="รายการคอร์สเรียน" sx={{ fontFamily: "Mitr, sans-serif" }} />
                        <Tab value={1} label="สร้างคอร์สเรียน" sx={{ fontFamily: "Mitr, sans-serif" }} />
                    </Tabs>
                    {tabPage === 0 
                        ? "" 
                        : <CourseForm {...course} progress={progress} setCourse={setCourse} setProgress={setProgress} />
                    }
                </Paper>
            </div>
        </MainDashboard>
    )
}