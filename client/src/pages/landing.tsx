import { useState } from "react";
import { Link } from "react-router-dom";
import Topbar from "../components/Landing/Topbar";
import CourseList from "../components/Landing/CourseList";
import SigninForm from "../components/Landing/SigninForm";
import SignupForm from "../components/Landing/SignupForm";

import "../assets/css/landing/landing.css";
import Bag from "../assets/img/landing/Bag.png";
import Task from "../assets/img/landing/Task.png";
import Star from "../assets/img/landing/Star.png";
import FactoryImage from "../assets/img/landing/Factory Education.png";

export default function Landing():JSX.Element {
    const [signinShow, setSignin] = useState<boolean>(false);
    const [signupShow, setSignup] = useState<boolean>(false);
    return (
        <div className="landing">
            <Topbar 
                signinShow={signinShow}
                setSignin={setSignin}
                signupShow={signupShow}
                setSignup={setSignup}
            />
            <header>
                <div className="content">
                    <h1>แพลตฟอร์มการเรียนรู้เทคโนโลยี ดีไซน์การเรียนรู้ของคุณและเติบโตไปพร้อมกับสื่อการเรียนรู้ของเรา</h1>
                    <p>JubeTech แพลตฟอร์มการเรียนรู้ที่เจาะกลุ่มเป้าหมายเทคโนโลยีมีจุดประสงค์เพื่อให้ผู้ใช้งานได้เข้าถึงสื่อการเรียนรู้คุณภาพที่เฉพาะด้านนั้นๆ</p>
                    <Link to="#">เข้าสู่หน้าคอร์สเรียน</Link>
                </div>
                <img src={FactoryImage} alt="Education 3D" />
            </header>
            <div className="card-list">
                <div className="card-container">
                    <img src={Bag} alt="bag" />
                    <p>คอร์สเรียนเทคโนโลยีที่มีราคาที่ย่อมเยาจนถึงคอร์สเรียนฟรี</p>
                </div>
                <div className="card-container">
                    <img src={Task} alt="task" />
                    <p>มีแบบทดสอบพร้อมมอบใบประกาศนียบัตร</p>
                </div>
                <div className="card-container">
                    <img src={Star} alt="star" />
                    <p>สามารถสะสมแต้มเพื่อรับของรางวัลและคอร์สเรียน</p>
                </div>
            </div>
            <CourseList />
            <SigninForm 
                signinShow={signinShow}
                setSignin={setSignin}
                signupShow={signupShow}
                setSignup={setSignup}
            />
            <SignupForm
                signupShow={signupShow}
                setSignup={setSignup}
            />
        </div>
    );
}