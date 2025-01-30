import { Rating, Box } from "@mui/material";
import { Link } from "react-router-dom";

interface CourseProp {
    title: string,
    description: string,
    image: string,
    score: number
}

export default function Course({ title, description, image, score }:CourseProp):JSX.Element {
    return (
        <Link to="#">
            <div className="course-container">
                <img src={image} alt={title} />
                <div className="course-content">
                    <strong>{title}</strong><br />
                    <span>{description.slice(0, 120)}...</span>
                    <div className="course-info">
                        <div className="rating">
                            <Rating
                                name="text-feedback"
                                value={score}
                                readOnly
                                precision={0.5}
                                size="small"
                            />
                            <Box sx={{ ml: 1 }}>{score}</Box>
                        </div>
                        <Link to="#">{"เข้าเรียนฟรี"}</Link>
                    </div>
                </div>
            </div>
        </Link>
    );
}