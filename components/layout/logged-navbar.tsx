"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { UserButton } from '@/components/layout/user-button';

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <>
      <nav className="hidden gap-12 lg:flex">
        <Button
          variant={pathname === "/settings" ? "default" : "outline"}
          asChild
        >
          <Link href="/settings">Ajustes</Link>
        </Button>
        <Button
          variant={pathname === "/dashboard" ? "default" : "outline"}
          asChild
        >
          <Link href="/dashboard">Panel</Link>
        </Button>
      </nav>
      <div className="-ml-8 hidden flex-col gap-2.5 sm:flex-row sm:justify-center lg:flex lg:justify-end w-[140px]">
        <UserButton/>
      </div>
    </>
  );
};