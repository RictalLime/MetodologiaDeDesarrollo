import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();

  const abrirPerfil = () => {
    const userRol = localStorage.getItem("userRol");
    if (userRol === 1) {
      router.push("/perfilAdmin");
    } else {
      router.push("/PerfilVendedor");
    }
  };

  const handleOpenMenu = () => {
    setOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  return (
    <div>
      <div className="w-screen h-20 bg-azul flex justify-between items-center px-4">
        <div className="flex items-center">
          <img
            src="/menu.svg"
            alt=""
            className="w-10 cursor-pointer"
            onClick={handleOpenMenu}
          />
        </div>
        <div className="flex-grow flex justify-center">
          <img src="/logoGerva.svg" alt="" className="w-20 h-10" />
        </div>
        <div className="flex-grow flex justify-center">
          <img
            src="/acount.svg"
            alt=""
            className="w-10 cursor-pointer"
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
            onClick={(e) => e.stopPropagation()} // Prevent closing the menu when clicking inside the menu
          >
            <p className="cursor-pointer font-bold" onClick={handleCloseMenu}>
              X
            </p>
            <Link
              href="/registrar-productos"
              className="text-lg underline underline-offset-1 mb-2"
              onClick={handleCloseMenu}
            >
              Registrar producto
            </Link>
            <Link
              href="/consultar-productos"
              className="text-lg underline underline-offset-1 mb-2"
              onClick={handleCloseMenu}
            >
              Lista de productos
            </Link>
            <Link
              href="/registrar-empleados"
              className="text-lg underline underline-offset-1 mb-2"
              onClick={handleCloseMenu}
            >
              Registrar empleados
            </Link>
            <Link
              href="/consultar-empleados"
              className="text-lg underline underline-offset-1 mb-2"
              onClick={handleCloseMenu}
            >
              Lista de empleados
            </Link>
            <Link
              href="/registrar-venta"
              className="text-lg underline underline-offset-1 mb-2"
              onClick={handleCloseMenu}
            >
              Registrar ventas
            </Link>
            <Link
              href="/consultar-ventas"
              className="text-lg underline underline-offset-1 mb-2"
              onClick={handleCloseMenu}
            >
              Consultar ventas
            </Link>
            <Link
              href="/"
              className="text-lg underline underline-offset-1 mb-2"
              onClick={handleCloseMenu}
            >
              Cerrar sesión
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
