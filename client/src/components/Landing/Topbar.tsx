import { useState, Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { Offcanvas, Accordion } from "react-bootstrap";
import { BsSearch, BsBookHalf, BsFillMortarboardFill, BsList } from "react-icons/bs";

import "../../assets/css/landing/topbar.css";

interface SigninFormProp {
    signinShow: boolean,
    setSignin: Dispatch<SetStateAction<boolean>>
}

interface SignupFormProp {
    signupShow: boolean,
    setSignup: Dispatch<SetStateAction<boolean>>
}

export default function Topbar({ signinShow, setSignin, signupShow, setSignup }:SigninFormProp & SignupFormProp) {
    // Offcanvas Section
    const [show, setShow] = useState<boolean>(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // Render
    return (
        <nav className="topbar">
            {/* Logo */}
            <div className="logo">
                <span><span>Jube</span>Tech</span>
            </div>
            {/* Desktop View */}
            <div className="responsive-container">
                <i onClick={handleShow}><BsList /></i>
                <div className="search-container">
                    <i><BsSearch /></i>
                    <input type="text" placeholder="ค้นหาคอร์สเรียน" />
                </div>
                <div className="page-container">
                    <Link to="#">
                        <i><BsBookHalf /></i>
                        <span>เข้าสู่หน้าคอร์สเรียน</span>
                    </Link>
                    <Link to="#">
                        <i><BsFillMortarboardFill /></i>
                        <span>สมัครเป็นติวเตอร์</span>
                    </Link>
                </div>
                <div className="button-container">
                    <button id="signin-btn" onClick={() => setSignin(!signinShow)}>เข้าสู่ระบบ</button>
                    <button id="signup-btn" onClick={() => setSignup(!signupShow)}>สมัครสมาชิก</button>
                </div>
            </div>
            {/* Mobile & Tablet View */}
            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>เข้าสู่ระบบ & สมัครสมาชิก</Accordion.Header>
                            <Accordion.Body className="auth-mobile">
                                <Link to="#" onClick={() => setSignin(!signinShow)}>เข้าสู่ระบบ</Link><br /><br />
                                <Link to="#" onClick={() => setSignup(!signupShow)}>สมัครสมาชิก</Link>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>ตัวเลือกหน้าเว็บ</Accordion.Header>
                            <Accordion.Body>
                                <div className="page-container">
                                    <Link to="#">
                                        <i><BsBookHalf /></i>
                                        <span>เข้าสู่หน้าคอร์สเรียน</span>
                                    </Link>
                                    <Link to="#">
                                        <i><BsFillMortarboardFill /></i>
                                        <span>สมัครเป็นติวเตอร์</span>
                                    </Link>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <div className="search-container">
                        <i><BsSearch /></i>
                        <input type="text" placeholder="ค้นหาคอร์สเรียน" />
                    </div>
                    <div className="btn-container"><button type="button" className="search-mobile">ค้นหา</button></div>
                </Offcanvas.Body>
            </Offcanvas>
        </nav>
    );
}