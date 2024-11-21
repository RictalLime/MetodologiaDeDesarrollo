import React from "react";
import Image from "next/image";

function NavbarLogo() {
  return (
    <div className="w-screen h-20 bg-azul flex justify-center items-center">
      <Image
        src="/logoGerva.svg"
        alt="Logo de Gerva Comercial"
        width={80}
        height={40}
        priority
      />
    </div>
  );
}

export default NavbarLogo;