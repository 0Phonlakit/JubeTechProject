import { Link } from "react-router-dom";
import { Rating, Box } from "@mui/material";

import "../../assets/css/landing/one_course.css";

interface CourseProp {
    title: string,
    description: string,
    image: string,
    score: number,
    price: number,
    href?: string
}

export default function Course({ title, description, image, score, href, price }:CourseProp):JSX.Element {
    return (
        <>
        {href ? 
            <Link to="#">
                <div className="course-container">
                    <img src={image} alt={title} />
                    <div className="course-content">
                        <strong>{title.slice(0, 44)}{title.length > 44 ? "..." : null}</strong><br />
                        <span>{description.slice(0, 63)}{description.length > 63 ? "..." : null}</span>
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
                            <Link to="#">
                                {price > 0 ? `${price.toLocaleString()} บาท` : "เข้าเรียนฟรี"}
                            </Link>
                        </div>
                    </div>
                </div>
            </Link>
            :
            <div className="course-container">
                <img src={image} alt={title} />
                <div className="course-content">
                    <strong>{title.slice(0, 44)}{title.length > 44 ? "..." : null}</strong><br />
                    <span>{description.slice(0, 63)}{description.length > 63 ? "..." : null}</span>
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
                        <Link to="#">
                            {price > 0 ? `${price.toLocaleString()} บาท` : "เข้าเรียนฟรี"}
                        </Link>
                    </div>
                </div>
            </div>
        }
        </>
    );
}