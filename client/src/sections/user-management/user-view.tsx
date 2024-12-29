import { DashboardContent } from 'src/layouts/dashboard';
import UserManagementPage from 'src/components/Admin/userManagementLayout';

export function UserView() {
    return (
        <DashboardContent>
            <UserManagementPage />
        </DashboardContent>
    );
}