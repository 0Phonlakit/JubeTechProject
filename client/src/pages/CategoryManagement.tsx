import { useState } from "react";
import MainDashboard from "../layouts/MainDashboard";
import { GroupProvider } from "../contexts/GroupContext";
import { CategoryProvider } from "../contexts/CategoryContext";
import GroupForm from "../components/Admin/categoryManagement/GroupForm";
import CategoryList from "../components/Admin/categoryManagement/CategoryList";
import { BsChevronRight } from "react-icons/bs";

import "../assets/css/category/category.css";

interface DashboardProp {
    toggleSidebar: boolean,
    setToggleSidebar: (value: boolean | ((prev: boolean) => boolean)) => void
}

export default function CategoryManagement({ toggleSidebar, setToggleSidebar }:DashboardProp) {
    const [toggleCategory, setToggleCategory] = useState<boolean>(true);

    return (
        <MainDashboard title="Category Management" order={3} toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} >
            <CategoryProvider>
                <GroupProvider>
                    <div className={"category-manage-container " + (toggleCategory ? "active-toggle" : "")}>
                        <button
                            onClick={() => setToggleCategory(!toggleCategory)}
                            className={"toggle-category " + (toggleCategory ? "active-toggle" : "")}
                        >
                            <i><BsChevronRight /></i>
                        </button>
                        <CategoryList />
                        <GroupForm />
                    </div>
                </GroupProvider>
            </CategoryProvider>
        </MainDashboard>
    );
}