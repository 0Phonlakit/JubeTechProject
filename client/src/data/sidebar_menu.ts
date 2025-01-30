import {
    FaChartLine,
    FaBookOpenReader,
    FaFilePen,
    FaCreditCard,
    FaUser,
    FaAtlassian
} from "react-icons/fa6";

import { IconType } from "react-icons";

export interface Menu {
    title:string,
    href:string,
    icon:IconType,
    roles:string[]
}

export const menus:Menu[] = [
    { 
        title: "แผนภูมิภาพรวม",
        href: "/dashboard",
        icon: FaChartLine,
        roles: ["Tutor"]
    },
    {
        title: "จัดการคอร์สเรียน",
        href: "/dashboard/course-management",
        icon: FaBookOpenReader,
        roles: ["Tutor"]
    },
    {
        title: "จัดการแบบทดสอบ",
        href: "/dashboard/exam-management",
        icon: FaFilePen,
        roles: ["Tutor"]
    },
    {
        title: "จัดการการเงิน",
        href: "/dashboard/payment-management",
        icon: FaCreditCard,
        roles: ["Tutor"]
    },
    {
        title: "จัดการผู้ใช้งาน",
        href: "/dashboard/user-management",
        icon: FaUser,
        roles: ["Admin"]
    },
    {
        title: "คอร์สที่ซื้อแล้ว",
        href: "#",
        icon: FaAtlassian,
        roles: ["Student"]
    }
]