import { BsSearch, BsBookHalf, BsMortarboard, BsList } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Topbar() {
    return (
        <nav>
            <div className="logo">
                <span><span>Jube</span>Tech</span>
            </div>
            <div className="responsive-container">
                <BsList size={24} />
                <div className="search-container">
                    <BsSearch size={19} />
                    <input type="text" placeholder="ค้นหาคอร์สเรียน" />
                </div>
                <ul className="page-container">
                    <li>
                        <Link to="#">
                            <i><BsBookHalf /></i>
                            เข้าสู่หน้าคอร์สเรียน
                        </Link>
                    </li>
                    <li>
                        <Link to="#">
                            <i><BsMortarboard /></i>
                            สมัครใช้งานเป็นติวเตอร์
                        </Link>
                    </li>
                </ul>
                <div className="button-container">
                    <button className="signin-btn">เข้าสู่ระบบ</button>
                    <button className="signup-btn">สมัครใช้งาน</button>
                </div>
            </div>
        </nav>
    )
}