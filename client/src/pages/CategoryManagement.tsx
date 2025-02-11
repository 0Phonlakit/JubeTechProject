import MainDashboard from "../layouts/MainDashboard";
import CategoryTable from "../components/Admin/categoryManagement/CategoryTable";

interface DashboardProp {
    toggleSidebar: boolean,
    setToggleSidebar: (value: boolean | ((prev: boolean) => boolean)) => void
}

export default function TutorDashboard({ toggleSidebar, setToggleSidebar }:DashboardProp) {
    return (
        <MainDashboard
            title="Category Management"
            toggleSidebar={toggleSidebar}
            setToggleSidebar={setToggleSidebar}
            order={3}
        >
            <CategoryTable />
        </MainDashboard>
    );
}