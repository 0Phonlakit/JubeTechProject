import { useEffect } from "react";
import { message } from "antd";
import { useParams } from "react-router-dom";

export default function LearnCourse() {
    // params
    const { course_id } = useParams();

    // effect
    useEffect(() => {
        if (!course_id) message.error("The course was not found.");
        else {

        }
    }, []);

    //

    // render
    return (
        <div className="learn-course-container">
            {!course_id ?
                <div className="not-found-course">

                </div>
                :
                <>
                    <div className="course-content">
                        <div className="main-lesson-content">

                        </div>
                        <div className="review-content">

                        </div>
                    </div>
                    <div className="side-section">

                    </div>
                </>
            }
        </div>
    );
}