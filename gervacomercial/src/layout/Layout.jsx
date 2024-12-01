import React from "react";
import { useRouter } from "next/router";
import Navbar from "@/componentes/layout/Navbar";
import NavbarLogo from "@/componentes/layout/NavbarLogo";

function Layout({ children }) {
  const router = useRouter();
  const isRoot = router.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen">
      {isRoot ? <NavbarLogo /> : <Navbar />}
      {children}
    </div>
  );
}

export default Layout;
