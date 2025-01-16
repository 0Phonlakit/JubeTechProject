import { DashboardContent } from 'src/layouts/dashboard';

import UserManagementPage from 'src/components/Admin/userManagement/UserTable';

export function UserView() {
    return (
        <DashboardContent>
            <UserManagementPage />
        </DashboardContent>
    );
}