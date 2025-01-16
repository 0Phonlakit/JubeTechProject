import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { UserView } from 'src/sections/role-management';

// ----------------------------------------------------------------------

export default function RoleManagementPage() {
  return (
    <>
      <Helmet>
        <title> {`Role Management - ${CONFIG.appName}`}</title>
      </Helmet>

      <UserView />
    </>
  );
}
