import { 
    FaChevronDown,
    FaPiggyBank,
    FaRegCircleUser,
    FaShield,
    FaUserAstronaut,
    FaUserGraduate,
    FaChartLine,
    FaBookJournalWhills
} from "react-icons/fa6";
import { Link } from "react-router-dom";

import Avatar from "../../assets/img/no image.jpg";
import "../../assets/css/dashboard/topbar.css";
import { useState } from "react";

export default function Topbar() {
    const [dropdownStatus, setDropdown] = useState<boolean>(false);
    return (
        <header className="topbar">
            <div className="option-avatar" onClick={() => setDropdown(!dropdownStatus)}>
                <img src={Avatar} alt="avatar" />
                <i><FaChevronDown size={14} /></i>
            </div>
            <div className={"dropdown-container " + (dropdownStatus ? "active" : null)}>
                <div className="avatar-info">
                    <img src={Avatar} alt="avatar-info" />
                    <div className="content-info">
                        <p>{"Unknow User".slice(0, 12)}{"Unknow User".length > 12 ? "...." : null}</p>
                        <span>{"Admin"}</span>
                    </div>
                </div>
                <hr />
                <Link to="#">
                    <div className="point-container">
                        <i><FaPiggyBank /></i>
                        <span>Point : {53}</span>
                    </div>
                </Link>
                <hr />
                <div className="account-container">
                    <Link to="#">
                        <div className="profile">
                            <i><FaRegCircleUser /></i>
                            <span>หน้าโปรไฟล์</span>
                        </div>
                    </Link>
                    <Link to="#">
                        <div className="account">
                            <i><FaShield /></i>
                            <span>ตั้งค่าบัญชี</span>
                        </div>
                    </Link>
                </div>
                <hr />
                <div className="console-container">
                    <Link to="#">
                        <div className="admin">
                            <i><FaUserAstronaut /></i>
                            <span>เข้าสู่หน้าแอดมิน</span>
                        </div>
                    </Link>
                    <Link to="#">
                        <div className="tutor">
                            <i><FaUserGraduate /></i>
                            <span>เข้าสู่หน้าติวเคอร์</span>
                        </div>
                    </Link>
                </div>
                <hr />
                <div className="learn-container">
                    <Link to="#">
                        <div className="statistic">
                            <i><FaChartLine /></i>
                            <span>แผนภูมิภาพรวมการเรียนรู้</span>
                        </div>
                    </Link>
                    <Link to="#">
                        <div className="learning">
                            <i><FaBookJournalWhills /></i>
                            <span>การเรียนรู้ของฉัน</span>
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
}