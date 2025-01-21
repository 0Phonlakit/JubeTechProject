import { DashboardContent } from 'src/layouts/dashboard';

import RoleManagementPage from 'src/components/Admin/roleManagement/RoleTable';

export function UserView() {
    return (
        <DashboardContent>
            <RoleManagementPage />
        </DashboardContent>
    );
}