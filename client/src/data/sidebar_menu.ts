import {
    FaHouse,
    FaBookOpenReader,
    FaUser,
    FaSitemap,
    FaUserPlus,
    FaFilePen
} from "react-icons/fa6";

import { IconType } from "react-icons";
import { MdDiscount } from "react-icons/md";

export interface Menu {
    title: string,
    href: string,
    icon: IconType,
    roles: string[]
}

export const menus:Menu[] = [
    { 
        title: "แผนภูมิภาพรวมสำหรับติวเตอร์",
        href: "/dashboard/tutor/statistic",
        icon: FaHouse,
        roles: ["Tutor"]
    },
    {
        title: "จัดการคอร์สเรียน",
        href: "/dashboard/course-management",
        icon: FaBookOpenReader,
        roles: ["Tutor"]
    },
    {
        title: "จัดการผู้ใช้งาน",
        href: "/dashboard/user-management",
        icon: FaUser,
        roles: ["Admin"]
    },
    {
        title: "จัดการหมวดหมู่",
        href: "/dashboard/category-management",
        icon: FaSitemap,
        roles: ["Admin"]
    },
    {
        title: "จัดการบทบาท",
        href: "/dashboard/role-management",
        icon: FaUserPlus,
        roles: ["Admin"]
    },
    {
        title: "จัดการโปรโมชั่น",
        href: "/dashboard/promotion-management",
        icon: MdDiscount,
        roles: ["Admin"]
    },
    {
        title: "จัดการแบบทดสอบ",
        href: "/dashboard/exam-management",
        icon: FaFilePen,
        roles: ["Tutor"]
    }
]