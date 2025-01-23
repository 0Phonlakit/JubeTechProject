import Topbar from "../Topbar";
import CourseSlide from "../CourseSlide";
import "../../../assets/css/landing/main.css";
import FactoryImage from "../../../assets/img/Factory Education.png";
import Star from "../../../assets/img/Star.png";
import Task from "../../../assets/img/Task.png";
import Bag from "../../../assets/img/Bag.png";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function LandingView() {
    const [courses, setCourses] = useState([
        {
            title: "Test Course",
            content: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.......",
        },
        {
            title: "Test Course",
            content: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.......",
        },
        {
            title: "Test Course",
            content: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.......",
        },
        {
            title: "Test Course",
            content: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.......",
        }
    ]);

    return (
        <div className="landing-page">
            <Topbar />
            <header>
                <div className="slogan">
                    <h1>เรียนรู้เทคโนโลยี สร้างความก้าวหน้าและทำให้บรรลุเป้าหมาย</h1>
                    <p>Lorem ipsum dolor sit amet นักกราฟิกและการพิมพ์รู้ดีว่าในความเป็นจริงทุกอาชีพที่เกี่ยวข้องกับจักรวาลของการสื่อสารมีความสัมพันธ์ที่มั่นคงกับคำเหล่านี้ 
                    เป็นลำดับของ</p>
                    <button>เข้าสู่หน้าหลักคอร์สเรียน</button>
                </div>
                <img src={FactoryImage} alt="Factory Education" />
            </header>
            <div className="card-container">
                <div className="card-content">
                    <img src={Star} alt="star" />
                    <p>เจาะกลุ่มเป้าหมายโดยมุ่งที่เทคโนโลยี คอร์สเรียนราคาย่อมเยาและสามารถเรียนรู้ได้ฟรีตลอดชีพ</p>
                </div>
                <div className="card-content">
                    <img src={Task} alt="task" />
                    <p>มีบททดสอบพร้อมกับใบประกาศนียบัตร</p>
                </div>
                <div className="card-content">
                    <img src={Bag} alt="bag" />
                    <p>สามารถสะสมแต้มเพื่อแลกของรางวัลและคอร์สเรียนได้</p>
                </div>
            </div>
            <div className="course-slide container">
                <h2>คอร์สเรียนยอดนิยม</h2>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    <SwiperSlide>
                        {courses.map((course, index) => {
                            return <CourseSlide title={course.title} content={course.content} key={index} />
                        })}
                    </SwiperSlide>
                    <SwiperSlide>content</SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
}