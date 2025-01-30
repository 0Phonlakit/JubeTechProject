import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { Form, Modal, InputGroup } from "react-bootstrap";
import { BsEnvelopeAtFill, BsFillKeyFill, BsFillShieldLockFill } from "react-icons/bs";

import Logo from "../../assets/img/no image.jpg";
import "../../assets/css/landing/modal.css";

interface SignupFormProp {
    signupShow: boolean,
    setSignup: Dispatch<SetStateAction<boolean>>
}

export default function SignupForm({ signupShow, setSignup }:SignupFormProp):JSX.Element {
    return (
        <Modal show={signupShow} onHide={() => setSignup(false)} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    <span>Sign Up</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="image-container">
                    <img src={Logo} alt="logo" />
                </div>
                {/* Form Container */}
                <Form>
                    {/* Email */}
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <InputGroup>
                            <InputGroup.Text><i><BsEnvelopeAtFill /></i></InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="ป้อนอีเมล..."
                            />
                        </InputGroup>
                    </Form.Group>
                    {/* Password */}
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                            <InputGroup.Text><i><BsFillKeyFill /></i></InputGroup.Text>
                            <Form.Control
                                type="password"
                                placeholder="ป้อนรหัสผ่าน..."
                            />
                        </InputGroup>
                        {/* <Link to="#" className="forgot-password">ลืมรหัสผ่าน ?</Link> */}
                    </Form.Group>
                    {/* Verify OTP */}
                    <Form.Group className="mb-4">
                        <Form.Label>Verify OTP <span className="ref-code">Ref Code : {"TYUSFD"}</span></Form.Label>
                        <InputGroup className="mb-1">
                            <InputGroup.Text><i><BsFillShieldLockFill /></i></InputGroup.Text>
                            <Form.Control
                                min={0}
                                type="number"
                                placeholder="ป้อนรหัส OTP..."
                            />
                        </InputGroup>
                        <Link to="#" className="resend-otp">ส่งยืนยันอีกครั้ง</Link>
                        <span className="wait-resend">&nbsp;รอ {30} วินาทีในการส่งครั้งถัดไป</span>
                    </Form.Group>
                    <hr />
                    {/* <span className="signup-link">คุณยังไม่มีบัญชีใช่ไหม? <Link to="#">สมัครได้ที่นี่</Link></span><br /> */}
                    <div className="button-container">
                        <button type="submit">เข้าสู่ระบบ</button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}