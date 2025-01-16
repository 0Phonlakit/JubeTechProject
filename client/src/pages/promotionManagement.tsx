import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { PromotionView } from "src/sections/promotion-management"

// ----------------------------------------------------------------------

export default function promotionManagementPage() {
  return (
    <>
      <Helmet>
        <title> {`Promotion Management - ${CONFIG.appName}`}</title>
      </Helmet>
        
      <PromotionView />
    </>
  );
}