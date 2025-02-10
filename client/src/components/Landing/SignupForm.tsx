import { FaRegCircleUser, FaKey, FaRegEnvelope } from "react-icons/fa6";

export default function SignupForm() {
    return (
        <div className="signup-form-container">
            <p className="auth-title">สมัครสมาชิก</p>
            <span className="auth-description">ลงทะเบียนผู้ใช้งานเพื่อเริ่มต้นในการเป็นสมาชิกภายในแอปพลิเคชั่นและเรียนรู้คอร์สเรียนของเรา</span>
            <form id="signup-section">
                <div className="row">
                    <div className="col-12 col-lg-6">
                        {/* First Name */}
                        <div className="form-group">
                            <label htmlFor="firstname_signup">ชื่อจริง (ไม่ต้องใส่คำนำหน้า)</label>
                            <div className="input-group">
                                <div className="input-group-text">
                                    <i><FaRegCircleUser size={20} /></i>
                                </div>
                                <input
                                    id="firstname_signup"
                                    type="text"
                                    className="form-control"
                                    placeholder="ป้อนชื่อจริงของคุณ..."
                                    maxLength={150}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6">
                        {/* Lastname */}
                        <div className="form-group">
                            <label htmlFor="lastname_signup">นามสกุล</label>
                            <div className="input-group">
                                <input
                                    id="lastname_signup"
                                    type="text"
                                    className="form-control"
                                    placeholder="ป้อนนามสกุลของคุณ..."
                                    maxLength={150}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Email */}
                <div className="form-group">
                    <label htmlFor="email_signup">อีเมล</label>
                    <div className="input-group">
                        <div className="input-group-text">
                            <i><FaRegEnvelope size={20} /></i>
                        </div>
                        <input
                            id="email_signup"
                            type="text"
                            className="form-control"
                            placeholder="ป้อนอีเมลของคุณ..."
                            maxLength={150}
                            required
                        />
                    </div>
                </div>
                {/* Password */}
                <div className="form-group">
                    <label htmlFor="password_signup">รหัสผ่าน</label>
                    <div className="input-group">
                        <div className="input-group-text">
                            <i><FaKey size={15} /></i>
                        </div>
                        <input
                            id="password_signup"
                            type="password"
                            className="form-control"
                            placeholder="ป้อนรหัสผ่านของคุณ..."
                            required
                        />
                    </div>
                </div>
                {/* Confirm Password */}
                <div className="form-group">
                    <label htmlFor="password_confirm">ยืนยันรหัสผ่าน</label>
                    <div className="input-group">
                        <input
                            id="password_confirm"
                            type="password"
                            className="form-control"
                            placeholder="ป้อนรหัสผ่านยืนยันของคุณ..."
                            required
                        />
                    </div>
                </div>
                {/* OTP */}
                <div className="form-group">
                    <label htmlFor="otp_password">ยืนยัน OTP</label>
                    <div className="input-group">
                        <input
                            id="otp_password"
                            type="number"
                            className="form-control"
                            placeholder="ป้อนรหัสผ่านยืนยันของคุณ..."
                            required
                        />
                        <input type="hidden" />
                    </div>
                </div>
                <a href="#">ส่ง OTP ไปยังอีเมล</a><br />
                <span className="count-otp">สามารถส่งอีกครั้งภายใน 30 วิ</span>
        
                <div className="btn-sign-container">
                    <button
                        type="submit"
                        id="signup-submit"
                    >
                        สมัครสมาชิก
                    </button>
                </div>
            </form>
        </div>
    );
}