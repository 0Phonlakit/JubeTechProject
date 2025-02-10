import MainDashboard from "../layouts/MainDashboard";
import CardList from "../components/Tutor/dashboard/CardList";
import EnrollGraph from "../components/Tutor/dashboard/EnrollGraph";
import StatementTable from "../components/Tutor/dashboard/StatementTable";

export default function TutorDashboard() {
    return (
        <MainDashboard title="Tutor Dashboard" order={0}>
            <CardList />
            <EnrollGraph />
            <StatementTable />
        </MainDashboard>
    );
}