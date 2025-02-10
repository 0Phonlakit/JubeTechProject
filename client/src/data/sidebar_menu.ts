import {
    FaChartLine,
    FaBookOpenReader,
    FaFilePen,
    FaCreditCard,
    FaUser,
    FaAtlassian,
    FaSitemap
} from "react-icons/fa6";

import { IconType } from "react-icons";

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
        title: "จัดการผู้ใช้งาน",
        href: "/dashboard/user-management",
        icon: FaUser,
        order: 2,
        roles: ["Admin"]
    },
    {
        title: "จัดการหมวดหมู่",
        href: "/dashboard/category-management",
        icon: FaSitemap,
        order: 3,
        roles: ["Admin"]
    }
]