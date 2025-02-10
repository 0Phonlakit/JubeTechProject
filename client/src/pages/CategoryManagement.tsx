import MainDashboard from "../layouts/MainDashboard";
import CategoryTable from "../components/Admin/categoryManagement/CategoryTable";

export default function TutorDashboard() {
    return (
        <MainDashboard title="Category Management" order={3}>
            <CategoryTable />
        </MainDashboard>
    );
}