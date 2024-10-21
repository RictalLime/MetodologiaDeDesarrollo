import React from "react";
import Navbar from "@/componentes/layout/Navbar";

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;
