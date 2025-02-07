import {
    FaChartLine,
    FaBookOpenReader,
    FaFilePen,
    FaCreditCard,
    FaUser,
    FaAtlassian,
    FaSitemap,
    FaUserPlus
} from "react-icons/fa6";

import { IconType } from "react-icons";
import { MdDiscount } from "react-icons/md";

export interface Menu {
    title: string,
    href: string,
    order: number,
    icon: IconType,
    roles: string[]
}

export const menus:Menu[] = [
    { 
        title: "แผนภูมิภาพรวม",
        href: "/dashboard",
        icon: FaChartLine,
        order: 0,
        roles: ["Tutor"]
    },
    {
        title: "จัดการคอร์สเรียน",
        href: "/dashboard/course-management",
        icon: FaBookOpenReader,
        order: 1,
        roles: ["Tutor"]
    },
    {
        title: "จัดการแบบทดสอบ",
        href: "/dashboard/exam-management",
        icon: FaFilePen,
        order: 2,
        roles: ["Tutor"]
    },
    {
        title: "จัดการการเงิน",
        href: "/dashboard/payment-management",
        icon: FaCreditCard,
        order: 3,
        roles: ["Tutor"]
    },
    {
        title: "จัดการผู้ใช้งาน",
        href: "/dashboard/user-management",
        icon: FaUser,
        order: 4,
        roles: ["Admin"]
    },
    {
        title: "จัดการบทบาท",
        href: "/dashboard/role-management",
        icon: FaUserPlus,
        order: 5,
        roles: ["Admin"]
    },
    {
        title: "จัดการโปรโมชั่น",
        href: "/dashboard/promotion-management",
        icon: MdDiscount ,
        order: 6,
        roles: ["Admin"]
    },
    {
        title: "คอร์สที่ซื้อแล้ว",
        href: "#",
        icon: FaAtlassian,
        order: 7,
        roles: ["Student"]
    },
    {
        title: "จัดการหมวดหมู่",
        href: "/dashboard/category-management",
        icon: FaSitemap,
        order: 8,
        roles: ["Admin"]
    }
]