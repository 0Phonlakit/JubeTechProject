import MainDashboard from "../layouts/MainDashboard";
import CategoryTable from "../components/Admin/categoryManagement/CategoryTable";

export default function TutorDashboard():JSX.Element {
    return (
        <MainDashboard title="Category Management" order={6}>
            <CategoryTable />
        </MainDashboard>
    );
}