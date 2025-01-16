import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { UserView } from 'src/sections/user-management';

// ----------------------------------------------------------------------

export default function UserManagementPage() {
  return (
    <>
      <Helmet>
        <title> {`User Management - ${CONFIG.appName}`}</title>
      </Helmet>

      <UserView />
    </>
  );
}
