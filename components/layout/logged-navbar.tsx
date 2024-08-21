"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { UserButton } from '@/components/layout/user-button';
import { useCurrentRole } from "@/hooks/useCurrentRole";

export const Navbar = () => {
  const pathname = usePathname();
  const role = useCurrentRole();

  return (
    <>
      <nav className="hidden gap-12 lg:flex">
        {role == "USER" && (
          <>
            <Button
              variant={pathname === "/settings" ? "default" : "outline"}
              asChild
            >
              <Link href="/settings">Ajustes</Link>
            </Button>
            <Button
              variant={pathname === "/myinvitations" ? "default" : "outline"}
              asChild
            >
              <Link href="/myinvitations">Mis Invitaciones</Link>
            </Button>
            <Button
              variant={pathname === "/shop" ? "default" : "outline"}
              asChild
            >
              <Link href="/shop">Tienda</Link>
            </Button>
          </>
        ) || (
          <>
            <Button
              variant={pathname === "/admin" ? "default" : "outline"}
              asChild
            >
              <Link href="/admin">Panel</Link>
            </Button>
            <Button
              variant={pathname === "/settings" ? "default" : "outline"}
              asChild
            >
              <Link href="/settings">Ajustes</Link>
            </Button>
            <Button
              variant={pathname === "/templates" ? "default" : "outline"}
              asChild
            >
              <Link href="/templates">Plantillas</Link>
            </Button>
          </>
        )}
      </nav>
      <div className="-ml-8 hidden flex-col gap-2.5 sm:flex-row sm:justify-center lg:flex lg:justify-end w-[140px]">
        <UserButton/>
      </div>
    </>
  );
};