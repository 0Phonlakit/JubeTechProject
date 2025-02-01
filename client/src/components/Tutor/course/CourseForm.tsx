import Course from "../../Landing/Course";
import { useState } from "react";

import NoImage from "../../../assets/img/no image.jpg";
import "../../../assets/css/course_management/course_form.css";

interface CourseState {
    title: string,
    description: string,
    image: File | null,
    price: number,
    score: number,
    isUseScore: boolean,
    categories: { 
        id: string,
        name: string
    } [],
}

type InputEvent = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>;


export default function CourseForm() {
    // Course State
    const [course, setCourse] = useState<CourseState>({
        title: "",
        description: "",
        image: null,
        price: 0,
        score: 0,
        isUseScore: false,
        categories: []
    });

    const { 
        title,
        description,
        image,
        price,
        score,
        isUseScore,
        categories
    } = course;

    // Track Stage
    const handleChange = (name:string, event:InputEvent) => {
        const target = event.target;
        if (target instanceof HTMLInputElement && target.files) {
            const file = target.files[0];
            setCourse({ ...course, [name]: file });
        } else {
            setCourse({ ...course, [name]: target.value });
        }
    }

    // Render
    return (
        <div className="course-form-container">
            <h1>สร้างคอร์สเรียน</h1>
            <div className="main-course-form">
                <div className="preview-container">
                    <div className="course-overview">
                        <Course
                            title={title.trim().length > 0 ? title : ""}
                            description={description.trim().length > 0 ? description : ""}
                            image={image && image instanceof File ? URL.createObjectURL(image) : NoImage}
                            price={2499}
                            score={0}
                        />
                    </div>
                    <div className="input-container">
                        {/* Title */}
                        <div className="title sub-input">
                            <label htmlFor="title">ชื่อคอร์สเรียน</label>
                            <textarea
                                id="title"
                                placeholder="ป้อนชื่อคอร์สเรียน..."
                                rows={3}
                                minLength={10}
                                maxLength={200}
                                onChange={(event) => handleChange("title", event)}
                                required
                            ></textarea>
                            <span className="count-word">{title.length} / 200</span>
                        </div>

                        {/* Description */}
                        <div className="description sub-input">
                            <label htmlFor="description">คำอธิบายคอร์สเรียน</label>
                            <textarea
                                id="description"
                                placeholder="ป้อนคำอธิบายคอร์สเรียน..."
                                rows={5}
                                maxLength={500}
                                onChange={(event) => handleChange("description", event)}
                            ></textarea>
                            <span className="count-word">{description.length} / 500</span>
                        </div>

                        {/* Image */}
                        <div className="image sub-input">
                            <label htmlFor="image">เลือกรูปภาพคอร์สเรียน</label>
                            <input
                                type="file"
                                id="image"
                                className="form-control"
                                accept="image/*"
                                onChange={(event) => handleChange("image", event)}
                                required
                            />
                            <span className="mt-2">ขนาดรูปภาพไม่เกิน 5MB</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}