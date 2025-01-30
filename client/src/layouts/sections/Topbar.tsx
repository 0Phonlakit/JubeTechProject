import { FaChevronDown } from "react-icons/fa6";

import Avatar from "../../assets/img/no image.jpg";
import "../../assets/css/dashboard/topbar.css";

export default function Topbar():JSX.Element {
    return (
        <header className="topbar">
            <div className="option-avatar">
                <img src={Avatar} alt="avatar" />
                <i><FaChevronDown size={14} /></i>
            </div>
        </header>
    );
}