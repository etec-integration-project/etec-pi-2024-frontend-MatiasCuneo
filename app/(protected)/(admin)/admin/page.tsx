"use client";

import { RoleGate } from "@/components/auth/rolegate";
import { useCurrentRole } from "@/hooks/useCurrentRole";

const AdminPage = () => {
  const role = useCurrentRole();

  return (
    <RoleGate allowedRole="ADMIN">
      Current Role: {role}
    </RoleGate>
  );
};

export default AdminPage;