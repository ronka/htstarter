"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";

interface HeaderWrapperProps {
  children: React.ReactNode;
}

export default function HeaderWrapper({ children }: HeaderWrapperProps) {
  const pathname = usePathname();

  // Don't show header on sign-in and sign-up pages
  const shouldShowHeader =
    !pathname?.startsWith("/sign-in") && !pathname?.startsWith("/sign-up");

  return (
    <>
      {shouldShowHeader && <Header />}
      {children}
    </>
  );
}
