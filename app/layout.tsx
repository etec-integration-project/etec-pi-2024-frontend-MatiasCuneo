import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { Navbar } from "@/components/layout/logged-navbar";
import { SessionProvider } from "next-auth/react";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["600"]
});

export const metadata: Metadata = {
  title: "Green Invitations",
  description: "Crea invitaciones personalizables a tu casamiento!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-white w-full lg:pb-12 mx-auto lg:px-[10rem] px-4 md:py-8 flex items-center justify-between py-4 fixed top-0 z-10">
          <Link href="/" className="inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl">
            GreenInv
          </Link>
          {session && (
            <SessionProvider session={session}>
              <Navbar />
            </SessionProvider>
          ) || (

            <nav className="flex gap-2.5 md:gap-6 lg:gap-12">
              <LoginButton>
                <Button size="lg" variant="outline">Log In</Button>
              </LoginButton>
              <Link href="/auth/register">
                <Button size="lg">Sign Up</Button>
              </Link>
            </nav>
          )}
        </header>
        <main className="h-full pt-16 md:pt-18 lg:pt-[8rem] bg-white">
          {session && (
            <SessionProvider session={session}>
              {children}
            </SessionProvider>
          ) || children}
        </main>
      </body>
    </html>
  );
}
