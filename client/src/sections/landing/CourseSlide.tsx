import React from "react";
import CourseImage from "../../assets/img/course-test.png";
import { Rating } from "@mui/material";

interface CourseSlideProps {
    title: string;
    content: string;
}

const CourseSlide: React.FC<CourseSlideProps> = ({ title, content }) => {
    return (
        <div className="course-card">
            <img src={CourseImage} alt="course" />
            <p><strong>{title}</strong></p>
            <p className="text-muted">{content}</p>
            <div className="option-container">
                <div className="rating-container">
                    <Rating 
                        name="half-rating-read"
                        defaultValue={5}
                        precision={0.5}
                        sx={{
                            '& .MuiRating-icon': {
                            fontSize: '1rem',
                            },
                        }}
                        readOnly
                    />
                    <p>5</p>
                </div>
                <button>Free Access</button>
            </div>
        </div>
    );
}

export default CourseSlide;