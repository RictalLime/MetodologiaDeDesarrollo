import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  const abrirPerfil = () => {
    if (isNavigating) return;
    setIsNavigating(true);
    const userRol = localStorage.getItem("userRol");
    const ruta = userRol === "1" ? "/PerfilAdmin" : "/PerfilVendedor";
    router.push(ruta).finally(() => setIsNavigating(false));
  };

  const handleOpenMenu = () => setOpenMenu(true);
  const handleCloseMenu = () => setOpenMenu(false);

  return (
    <div>
      <div className="w-screen h-20 bg-azul flex justify-between items-center px-4">
        <div className="flex items-center">
          <Image
            src="/menu.svg"
            alt="Abrir menú"
            width={40}
            height={40}
            className="cursor-pointer"
            onClick={handleOpenMenu}
          />
        </div>
        <div className="flex-grow flex justify-center">
          <Image src="/logoGerva.svg" alt="Logo Gerva" width={80} height={40} />
        </div>
        <div className="flex-grow flex justify-center">
          <Image
            src="/acount.svg"
            alt="Abrir perfil"
            width={40}
            height={40}
            className="cursor-pointer"
            onClick={abrirPerfil}
          />
        </div>
      </div>

      {openMenu && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-start z-50"
          onClick={handleCloseMenu}
        >
          <div
            className="w-[300px] flex flex-col bg-white p-5 border border-black rounded-[25px]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="text-right font-bold text-lg mb-4"
              onClick={handleCloseMenu}
            >
              X
            </button>
            <Link href="/registrar-productos" className="text-lg mb-2">
              Registrar producto
            </Link>
            <Link href="/consultar-productos" className="text-lg mb-2">
              Lista de productos
            </Link>
            <Link href="/registrar-empleados" className="text-lg mb-2">
              Registrar empleados
            </Link>
            <Link href="/consultar-empleados" className="text-lg mb-2">
              Lista de empleados
            </Link>
            <Link href="/registrar-venta" className="text-lg mb-2">
              Registrar ventas
            </Link>
            <Link href="/consultar-ventas" className="text-lg mb-2">
              Consultar ventas
            </Link>
            <Link href="/" className="text-lg mb-2">
              Cerrar sesión
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;