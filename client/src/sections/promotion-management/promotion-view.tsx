import { DashboardContent } from 'src/layouts/dashboard';

import PromotionManagementPage from 'src/components/Admin/promotionManagement/PromotionTable';

export function PromotionView() {
    return (
        <DashboardContent>
            <PromotionManagementPage />
        </DashboardContent>
    );
}