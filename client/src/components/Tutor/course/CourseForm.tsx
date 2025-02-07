import ProcessBar from "./ProcessBar";
import CourseCardForm from "./CourseCardForm";
import CourseDetailForm from "./CourseDetailForm";
import "../../../assets/css/course/course-form.css";
import { CourseState } from "../../../pages/CourseManagement";

const steps = ["สร้างคอร์สเรียน", "เพิ่มรายละเอียดของคอร์ส", "เพิ่มเนื้อหาและบทเรียน"];

interface CourseStateFunction {
    progress: number,
    setProgress: (value: number | ((prev: number) => number)) => void,
    setCourse: (value: CourseState | ((prev: CourseState) => CourseState)) => void,
}

export default function CourseForm({ title, price, point, is_point, description, categories, sections, image, setCourse, setProgress, progress, objectives }:CourseState & CourseStateFunction) {
    const course = { title, price, point, is_point, description, categories, sections, image, objectives};

    function handleCourse(event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name:string) {
        const target = event.target;
        if (name === "is_point") {
            const point_value:string = "point"
            setCourse({
                ...course,
                [name]: is_point === true ? false : true,
                [point_value]: is_point === true ? point : 0
            });
        } else {
            if (target instanceof HTMLInputElement && target.type === "file") {
                setCourse({
                    ...course,
                    [name]: target.files && target.files.length > 0 ? target.files[0] : null 
                });
            } else {
                setCourse({
                    ...course,
                    [name]: target.type === "number"
                    ? (isNaN(parseInt(target.value)) ? 0 : parseInt(target.value))
                    : target.value
                });
            }
        }
    }

    function handleCourseArray(value:string[], name:string) {
        setCourse({...course, [name]: value});
    }

    return (
        <div className="course-form-container">
            <ProcessBar steps={steps} progress={progress} />
            {progress === 0 ? 
                <CourseCardForm
                    title={title}
                    price={price}
                    point={point}
                    is_point={is_point}
                    description={description}
                    handleCourse={handleCourse}
                    setProgress={setProgress}
                    image={image instanceof File ? image : null}
                /> 
            : null}
            {progress === 1 ? 
                <CourseDetailForm 
                    handleCourseArray={handleCourseArray}
                />
            : null}
        </div>
    )
}