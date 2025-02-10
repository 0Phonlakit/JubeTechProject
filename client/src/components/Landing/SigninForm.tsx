import { FaRegCircleUser, FaKey } from "react-icons/fa6";

export default function SigninForm() {
    return (
        <div className="signin-form-container">
            <p className="auth-title">เข้าสู่ระบบ</p>
            <span className="auth-description">ลงชื่อเข้าใช้งานระบบเพื่อปลดล็อคการทำงานและยืนยันตัวตนผู้ใช้งาน</span>
            <form id="signin-section">
                {/* Email */}
                <div className="form-group">
                    <label htmlFor="email">อีเมล</label>
                    <div className="input-group">
                        <div className="input-group-text">
                            <i><FaRegCircleUser size={20} /></i>
                        </div>
                        <input
                            id="email"
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
                    <label htmlFor="password">รหัสผ่าน</label>
                    <div className="input-group">
                        <div className="input-group-text">
                            <i><FaKey size={15} /></i>
                        </div>
                        <input
                            id="password"
                            type="password"
                            className="form-control"
                            placeholder="ป้อนรหัสผ่านของคุณ..."
                            required
                        />
                    </div>
                </div>
                <a href="#">ลืมรหัสผ่าน ?</a>

                <div className="btn-sign-container">
                    <button
                        type="submit"
                        id="signin-submit"
                    >
                        เข้าสู่ระบบ
                    </button>
                </div>
            </form>
        </div>
    );
}