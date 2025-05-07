import axios from "axios";
import { message } from "antd";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getToken } from "../services/authorize";
import { fetchFileFromStorage } from "../services/storage";
import { onAuthStateChanged, getAuth } from "firebase/auth";

import "../assets/css/subcourse/main_subcourse.css";
import NoImage from "../assets/img/no image.jpg";

interface IFSectionForm {
    title: string,
    lesson_ids: string[],
}

interface IFSubCourse {
    thumbnail: string,
    title: string,
    description: string,
    objectives: string[],
    group_ids: {
        name: string
    }[],
    status: "draft" | "published" | "archived",
    note: string,
    pretest: {
        _id: string,
        title: string,
        description: string,
        random_question: boolean
    }[] | null,
    posttest: {
        _id: string,
        title: string,
        description: string,
        random_question: boolean
    }[] | null,
    section_ids: {
        _id: string,
        title: string,
        lesson_ids: {
            _id: string,
            title: string,
            type: string,
            sub_file: string[],
            main_content: string,
            duration: number,
            isFreePreview: boolean,
            createdBy: string,
            updatedBy: string,
            createdAt: string | Date,
            updatedAt: string | Date,
            __v: number
        }
    }[]
}

interface IFCourseImage {
    path: string,
    url: string,
    render: boolean,
    hasThumbnail: boolean
}

export default function SubCourseManagement() {
    // params & auth
    const auth = getAuth();
    const { course_id } = useParams();

    // state
    const [isRender, setIsRender] = useState<boolean>(false);
    const [courseImage, setCourseImage] = useState<IFCourseImage>({
        path: "",
        url: "",
        render: false,
        hasThumbnail: false
    });
    const [courseData, setCourseData] = useState<IFSubCourse>({
        thumbnail: "",
        title: "",
        description: "",
        objectives: [],
        group_ids: [],
        status: "draft",
        note: "",
        pretest: null,
        posttest: null,
        section_ids: []
    });
    const [sectionForm, setSectionForm] = useState<IFSectionForm>({
        title: "",
        lesson_ids: []
    });

    // effect
    useEffect(() => {
        setIsRender(false);
        const trackauth = onAuthStateChanged(auth, (user) => {
            if (!user || course_id?.trim() === "") {
                alert("Unauthorize from firebase");
                location.href = "/dashboard/course-management";
            } else fetchSubCourse();
        });
        return () => trackauth();
    }, []);

    // function
    const fetchSubCourse = async() => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/course/sub/id/${course_id}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });
            if (response.data.data) {
                const course = response.data.data;
                setCourseData(course);
                if (course.thumbnail.trim() !== "") {
                    const newUrl = await fetchFileFromStorage(course.thumbnail);
                    setCourseImage({ path: course.thumbnail, url: newUrl, render: true, hasThumbnail: true });
                } else setCourseImage({ path: "", url: "", render: true, hasThumbnail: false });
                message.success("The course was fetch successfully.");
                setIsRender(true);
            } else redirectErrorPage();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data.message || "Something went wrong.");
                location.href = "/dashboard/course-management";
            } else redirectErrorPage();
        }
    }

    const redirectErrorPage = () => {
        alert("Something went wrong.");
        location.href = "/dashboard/course-management";
    }

    // render
    return (
        <div className="sub-course-container">
            {isRender ?
                <>
                    <div className="sub-course-topbar">
                        
                    </div>
                    <div className="sub-course-content">
                        <div className="course-header-info">
                            <div className="preview-sub-course">
                                <img
                                    alt={courseData.title}
                                    src={courseImage.hasThumbnail ? courseImage.url : NoImage}
                                />
                                <div className="sub-course-info">
                                    test
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                :
                ""
            }
        </div>
    );
}