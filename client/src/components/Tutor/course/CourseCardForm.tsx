import Course from "../../Landing/Course";
import { FaPen, FaAngleRight } from "react-icons/fa6";
import ButtonUpload from "./ButtonUpload";

import NoImage from "../../../assets/img/no image.jpg";

interface CourseCardFormProp {
    title: string,
    description: string,
    image: File | null,
    price: number,
    point: number,
    is_point: boolean,
    setProgress: (value: number | ((prev: number) => number)) => void,
    handleCourse: (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name:string) => void
}

export default function CourseCardForm({ title, price, point, is_point, image, description, handleCourse, setProgress }:CourseCardFormProp) {

    function triggerForm(event:React.FormEvent) {
        event.preventDefault();
        setProgress(1);
    }

    return (
        <div className="course-card-form">
            <form onSubmit={triggerForm}>
                <div className="preview-course">
                    <div className="course-review-card">
                        <strong>ตัวอย่างคอร์สเรียน</strong>
                        <Course
                            score={5}
                            title={title}
                            price={price}
                            description={description}
                            image={image instanceof File ? URL.createObjectURL(image) : NoImage}
                        />
                    </div>
                    <div className="course-input-container">
                        {/* Title */}
                        <div className="sub-input form-group">
                            <label htmlFor="title">ชื่อคอร์สเรียน</label>
                            <div className="input-group">
                                <div className="input-group-text">
                                    <i><FaPen /></i>
                                </div>
                                <textarea
                                    id="title"
                                    className="form-control"
                                    placeholder="ป้อนชื่อคอร์สเรียน..."
                                    rows={2}
                                    value={title}
                                    minLength={5}
                                    maxLength={150}
                                    onChange={(event) => handleCourse(event, "title")}
                                    required
                                />
                            </div>
                            <span className="guide-text">กรอกได้ไม่เกิน 150 ตัวอักษร</span>
                            <span className="count-word">{title.length} / 150</span>
                        </div>
                        {/* Description */}
                        <div className="sub-input form-group">
                            <label htmlFor="description">รายละเอียดของคอร์สเรียน</label>
                            <textarea
                                id="description"
                                rows={6}
                                className="form-control"
                                placeholder="ป้อนรายละเอียดคอร์สเรียน..."
                                value={description}
                                maxLength={500}
                                onChange={(event) => handleCourse(event, "description")}
                                required
                            />
                            <span className="guide-text">กรอกได้ไม่เกิน 500 ตัวอักษร</span>
                            <span className="count-word">{description.length} / 500</span>
                        </div>
                        {/* Course Count */}
                        <div className="course-count-container">
                            {/* Price */}
                            <div className="sub-input form-group">
                                <label htmlFor="price">ราคาคอร์สเรียน</label>
                                <input
                                    id="price"
                                    type="number"
                                    value={price === 0 ? "" : price}
                                    className="form-control"
                                    placeholder="กรอกราคาคอร์สเรียน..."
                                    min={199}
                                    max={2000}
                                    onChange={(event) => handleCourse(event, "price")}
                                    required
                                />
                                <span className="guide-text">ต้องมีราคาคอร์สเรียนขั้นต่ำ 199 บาทและไม่เกิน 2,000 บาท</span>
                            </div>
                            {/* Point */}
                            <div className="sub-input form-group">
                                <div className="point-container">
                                    <input
                                        id="point-check"
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={is_point ? true : false}
                                        onChange={(event) => handleCourse(event, "is_point")}
                                    />
                                    <label htmlFor="point-check"></label>
                                    <label htmlFor="point-input">
                                        สามารถใช้แต้มแลกคอร์สเรียน ?
                                    </label>
                                </div>
                                <input
                                    id="point-input"
                                    min={200}
                                    max={1000}
                                    value={point === 0 ? "" : point}
                                    placeholder="กรอกค่าใช้จ่ายของแต้มในการซื้อคอร์สเรียน..."
                                    className="form-control"
                                    type={is_point ? "number" : "hidden"}
                                    onChange={(event) => handleCourse(event, "point")}
                                    required
                                />
                                <span className="guide-text">ใช้ในกรณีที่ติวเตอร์สามารถให้ผู้ใช้งานซื้อคอร์สผ่านแต้มสะสมได้โดยขั้นต่ำ 200 แต้มและไม่เกิน 1,000 แต้ม</span>
                            </div>
                        </div>
                        <ButtonUpload handleCourse={handleCourse} image={image} />
                        <span className="guide-text">อัพโหลดประเภทไฟล์ .jpg, .png, .jpeg</span>
                        <div className="button-course-container">
                            <button type="submit">
                                ถัดไป
                                <FaAngleRight />
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}