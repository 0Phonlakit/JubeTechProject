import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { menus, Menu } from "../../data/sidebar_menu";

import Logo from "../../assets/img/no image.jpg";
import "../../assets/css/dashboard/sidebar.css";

interface SidebarProp {
    order:number
}

export default function Sidebar({ order }:SidebarProp) {
    const [selected, setSelected] = useState<number>(0);
    
    useEffect(() => {
        setSelected(order);
    }, []);

    const userRole = ["Admin", "Tutor", "Student"];
    const filter_menus:Menu[] = menus.filter((menu) => {
        return menu.roles.some(role => userRole.includes(role));
    });

    return (
        <nav className="sidebar">
            {/* Logo */}
            <Link className="logo" to="/dashboard">
                <img src={Logo} alt="logo" />
                <span><span>Jube</span>Tech</span>
            </Link>
            {/* Sidebar Menu */}
            <div className="sidebar-menu">
                {filter_menus! && filter_menus.map((menu, index) => (
                    <Link
                        to={menu.href}
                        className={"menu-list " + (selected === menu.order ? "active" : null)}
                        key={index}
                        onClick={() => setSelected(index)}
                    >
                        <menu.icon size={19} />
                        <span>{menu.title}</span>
                    </Link>
                )) }
            </div>
        </nav>
    );
}