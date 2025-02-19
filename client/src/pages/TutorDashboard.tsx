import MainDashboard from "../layouts/MainDashboard";
import CardList from "../components/Tutor/dashboard/CardList";
import EnrollGraph from "../components/Tutor/dashboard/EnrollGraph";
import StatementTable from "../components/Tutor/dashboard/StatementTable";

interface DashboardProp {
    toggleSidebar: boolean,
    setToggleSidebar: (value: boolean | ((prev: boolean) => boolean)) => void
}

export default function TutorDashboard({ toggleSidebar, setToggleSidebar }:DashboardProp) {
    return (
        <MainDashboard
            title="Tutor Dashboard"
            toggleSidebar={toggleSidebar}
            setToggleSidebar={setToggleSidebar}
            order={0}
        >
            <CardList />
            <EnrollGraph />
            <StatementTable />
        </MainDashboard>
    );
}