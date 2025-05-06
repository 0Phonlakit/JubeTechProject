import {
    BsPlus,
    BsGear,
    BsSearch,
    BsBookFill,
    BsFillPenFill,
    BsChevronLeft,
    BsChevronRight,
    BsFillStarFill
} from "react-icons/bs";

import CourseModal from "./CourseModal";
import { useEffect, useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { fetchFileFromStorage } from "../../../services/storage";
import { useCourse, CourseCard } from "../../../contexts/CourseContext";
import { ResponseMessage, ToastMessageContainer } from "../../ToastMessageContainer";

import "../../../assets/css/course/course-manage.css";
import NoImage from "../../../assets/img/no image.jpg";

export interface IFSearchCourse {
    title: string,
    sortField: string,
    sortOrder: "ascend" | "descend",
    page: number,
    pageSize: number
}

interface IFCourseTopOption {
    title: string,
    sortField: string,
    sortOrder: "ascend" | "descend",
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    handleSearchCourse: (target:string, value:string | number) => void
}

interface CourseImage {
    _id: string,
    path: string,
    url: string,
}

const CourseTopOption = ({ title, sortField, sortOrder, handleSearchCourse, setShowModal }:IFCourseTopOption) => {
    return (
        <div className="course-option-container">
            <span>0 Content</span>
            <div className="vertical-line">|</div>
            <div className="search-course-container">
                <i><BsSearch size={18} /></i>
                <input
                    type="text"
                    value={title}
                    placeholder="Search course by title..."
                    onChange={(e) => handleSearchCourse("title", e.target.value)}
                />
            </div>
            <div className="course-option-btn">
                <button
                    onClick={() => setShowModal(true)}
                    className="create-course-btn"
                >
                    <i><BsPlus size={18} /></i>
                    Create course
                </button>
                <select
                    defaultValue={sortField + ":" + sortOrder}
                    onChange={(e) => {
                        const modifyValue = e.target.value.split(":");
                        handleSearchCourse("sortField", modifyValue[0]);
                        handleSearchCourse("sortOrder", modifyValue[1]);
                    }}
                >
                    <option value="createdAt:descend">Lastest</option>
                    <option value="createdAt:ascend">Oldest</option>
                    <option value="student_enrolled:descend">Highest enrolled</option>
                    <option value="student_enrolled:ascend">Lowest enrolled</option>
                </select>
            </div>
        </div>
    )
}

const CourseSkeleton = () => {
    return (
        <div className="course-list-container">

        </div>
    )
}

const CourseCardInfo = ({ course, course_image }:{ course:CourseCard, course_image:CourseImage[] }) => {
    const filterImage = course_image.filter(image => image._id === course._id);
    const urlImage = filterImage.length > 0 ? filterImage[0].url : "";
    return (
        <div className="course-card-container">
            <div className="course-card-image">
                <button>
                    <i><BsGear size={18} /></i>
                </button>
                <img
                    alt={course.title}
                    src={urlImage.trim() !== "" ? urlImage : NoImage}
                />
            </div>
            <div className="course-card-info">
                <span className="course-title">
                    {course.title.length > 25 ?
                        course.title.slice(0, 25) + "..."
                        :
                        course.title
                    }
                </span>
                <span className="course-description">
                    {course.description.length > 80 ?
                        course.description.slice(0, 80) + "..."
                        :
                        course.description
                    }
                </span>
                <div className="course-sub-info">
                    <div className="rating-info">
                        <i><BsFillStarFill size={10} fill="#f5d002" /></i>
                        {course.rating.toFixed(2)}
                    </div>
                    <div className="level-info">
                        <i><BsBookFill size={10} /></i>
                        {course.level}
                    </div>
                </div>
                <div className="author">
                    <i><BsFillPenFill size={14} /></i>
                    {course.instructor ? `${course.instructor.firstname} ${course.instructor.lastname}` : ""}
                </div>
                <div className="course-card-footer">
                    <span className="price">{course.price > 0 ? course.price.toLocaleString() + "฿" : "Free"}</span>
                    <button className="see-detail">
                        See detail
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function CourseManage() {
    // firebase
    const auth = getAuth();

    // context
    const { state, fetchCourseByTutor } = useCourse();

    // state
    const [searchCourse, setSearchCourse] = useState<IFSearchCourse>({
        title: "",
        sortField: "createdAt",
        sortOrder: "ascend",
        page: 1,
        pageSize: 12
    });
    const [isRender, setIsRender] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const { title, page, sortField, sortOrder } = searchCourse;
    const [editCourseId, setEditCourseId] = useState<string>("");
    const [prepareCourse, setPrepareCourse] = useState<boolean>(true);
    const [courseImages, setCourseImages] = useState<CourseImage[]>([]);
    const [messageList, setMessageList] = useState<ResponseMessage[]>([]);


    // effect
    useEffect(() => {
        setIsRender(false);
        const trackauth = onAuthStateChanged(auth, (user) => {
            if (!user) {
                alert("Unauthenticate on firebase.");
            }
        });
    
        return () => trackauth();
    }, []);

    useEffect(() => {
        fetchCourseFromTutor();
    }, [searchCourse]);

    useEffect(() => {
        if (state.courses.length > 0) {
            const imageDatas = state.courses.map(
                course => ({ _id:course._id, path: course.thumbnail, url: "" })
            );
            setCourseImages(imageDatas);
        } else {
            setCourseImages([]);
        }
    }, [state.courses]);

    useEffect(() => {
        const allUrlsReady = courseImages.every(course => course.url && course.url.trim() !== "");
        if (courseImages.length > 0 && !allUrlsReady) {
            prepareImages();
        }
    }, [courseImages]);

    useEffect(() => {
            if (state.response) {
                if (Array.isArray(state.response)) {
                    state.response.map((error) => {
                        const response:ResponseMessage = {
                            status: state.status,
                            message: error.message + " , value : " + error.path
                        }
                        setMessageList(prev => [...prev, response]);
                    });
                } else {
                    const response:ResponseMessage = {
                        status: state.status,
                        message: state.response
                    }
                    setMessageList(prev => [...prev, response]);
                }
                setTimeout(() => {
                    setMessageList((prev) => prev.slice(1));
                }, 2000);
            }
        }, [state.response]);

    // function
    const handleSearchCourse = (target:string, value:string | number) => {
        setSearchCourse({ ...searchCourse, [target]: value });
    }

    const fetchCourseFromTutor = async() => {
        setPrepareCourse(true);
        await fetchCourseByTutor("", searchCourse);
        setPrepareCourse(false);
        setIsRender(true);
    }

    const changePage = (type:string) => {
        switch (type) {
            case "increase":
                handleSearchCourse(
                    "page",
                    Number(page) === Number(state.pagination?.totalPages) ? page : page + 1
                );
                break;
            case 'decrease':
                handleSearchCourse(
                    "page",
                    Number(page) <= 1 ? 1 : Number(page) - 1
                );
                break;
            default:
                handleSearchCourse("page",page);
                break;
        }
    }

    const prepareImages = async() => {
        const modifyUrl = await Promise.all(courseImages.map(async(course) => {
            const newUrl = course.path.trim() !== "" ? await fetchFileFromStorage(course.path) : "";
            return { ...course, url: newUrl };
        }))
        setCourseImages(modifyUrl);
    }

    // render
    return (
        <div className="course-manage-container">
            {messageList.length > 0 &&
                <ToastMessageContainer messageList={messageList} setMessageList={setMessageList} />
            }
            <CourseModal
                showModal={showModal}
                editCourseId={editCourseId}
                setShowModal={setShowModal}
                searchCourse={searchCourse}
                setEditCourseId={setEditCourseId}
            />
            {isRender ?
                <>
                    <CourseTopOption
                        title={title}
                        sortField={sortField}
                        sortOrder={sortOrder}
                        setShowModal={setShowModal}
                        handleSearchCourse={handleSearchCourse}
                    />
                    {prepareCourse ?
                        <CourseSkeleton />
                        :
                        <>
                            <div className="course-list-container">
                                {state.courses.map((course, index) => (
                                    <CourseCardInfo
                                        key={index}
                                        course={course}
                                        course_image={courseImages}
                                    />
                                ))}
                            </div>
                            <div className="course-pagination-container">
                                <button onClick={() => changePage("decrease")}>
                                    <i><BsChevronLeft size={14} /></i>
                                </button>
                                <input
                                    min={1}
                                    value={page}
                                    type="number"
                                    onChange={(e) => handleSearchCourse("page", e.target.value)}
                                />
                                <button onClick={() => changePage("increase")}>
                                    <i><BsChevronRight size={14} /></i>
                                </button>
                                <span className="total-page">
                                    Total pages : {state.pagination?.totalPages.toLocaleString()}
                                </span>
                            </div>
                        </>
                    }
                </>
                :
                ""
            }
        </div>
    );
}