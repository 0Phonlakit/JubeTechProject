import Course from "./Course";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/pagination';

import "../../assets/css/landing/course.css";

import TestImage from "../../assets/img/landing/course-test.png";

export default function CourseList():JSX.Element {
    const courses = [
        {
            title: "Node.js 2025",
            description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old",
            image: TestImage,
            score: 4
        },
        {
            title: "Web Developer Fundamental",
            description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old",
            image: TestImage,
            score: 4
        },
        {
            title: "IOT Developer",
            description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old",
            image: TestImage,
            score: 4
        },
        {
            title: "Network Engineer",
            description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old",
            image: TestImage,
            score: 4
        },
        {
            title: "Prompt AI",
            description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old",
            image: TestImage,
            score: 4
        },
        {
            title: "MERN STACK 2021",
            description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old",
            image: TestImage,
            score: 4.5
        },
        {
            title: "Computer Architecter",
            description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old",
            image: TestImage,
            score: 3.5
        }
    ]
    return (
        <div className="course-list-container">
            <h2>คอร์สเรียนที่แนะนำ</h2>
            <div className="course-list">
                <Swiper
                    // centeredSlides={true}
                    pagination={{clickable:true}}
                    spaceBetween={10}
                    modules={[Pagination]}
                    className="mySwiper"
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1440: { slidesPerView: 4 },
                    }}
                >
                    {courses && courses.map((course, index) => (
                        <SwiperSlide key={index}>
                            <Course {...course} key={index} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}