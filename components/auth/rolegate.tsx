"use client";

import { useCurrentRole } from "@/hooks/useCurrentRole";
import { FormError } from "@/components/form-error";

interface RoleGateProps {
  children: React.ReactNode,
  allowedRole: "USER" | "ADMIN"
}

export const RoleGate = ({
  children,
  allowedRole
}: RoleGateProps) => {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return (
      <FormError message="No tienes permiso para ver este contenido!"/>
    );
  }

  return (
    <>
      {children}
    </>
  );
};