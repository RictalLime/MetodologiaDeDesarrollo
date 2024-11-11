import { useState } from 'react';
import Link from 'next/link';
import { FiX } from 'react-icons/fi';
import { useRouter } from "next/router";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const abrirPerfil = () => {
    const userRol = parseInt(localStorage.getItem("userRol"), 10);
    if (userRol === 1) {
      router.push("/perfilAdmin");
    } else {
      router.push("/PerfilVendedor");
    }
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex w-screen justify-center">
      {/* Navbar */}
      <nav className="flex items-center w-full h-25 bg-[#7DACB6] text-black transition-all duration-300 fixed top-0 left-0 justify-center">
        <div className="p-5 flex items-center justify-between w-full max-w-screen-lg">
          <button onClick={toggleMenu} className="focus:outline-none">
            <img src="/menu.svg" alt="Menu" className="h-5 w-5" />
          </button>
          <img src="/logoGerva.svg" alt="Logo Gerva" className="h-6 w-7 mx-auto" />
          <button onClick={abrirPerfil} className="focus:outline-none">
            <img src="/acount.svg" alt="Account" className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-start z-50">
          <div
            className="w-[300px] flex flex-col bg-white p-5 border border-black rounded-[25px]"
            onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer clic dentro del menú
          >
            <button className="text-xl self-end focus:outline-none" onClick={handleCloseMenu}>
              <FiX />
            </button>
            <nav className="mt-4 space-y-3">
              <Link href="/registrar-productos">
                <a onClick={handleCloseMenu} className="block text-lg underline underline-offset-1">
                  Registrar producto
                </a>
              </Link>
              <Link href="/consultar-productos">
                <a onClick={handleCloseMenu} className="block text-lg underline underline-offset-1">
                  Lista de productos
                </a>
              </Link>
              <Link href="/registrar-empleados">
                <a onClick={handleCloseMenu} className="block text-lg underline underline-offset-1">
                  Registrar empleados
                </a>
              </Link>
              <Link href="/consultar-empleados">
                <a onClick={handleCloseMenu} className="block text-lg underline underline-offset-1">
                  Lista de empleados
                </a>
              </Link>
              <Link href="/registrar-venta">
                <a onClick={handleCloseMenu} className="block text-lg underline underline-offset-1">
                  Registrar ventas
                </a>
              </Link>
              <Link href="/consultar-ventas">
                <a onClick={handleCloseMenu} className="block text-lg underline underline-offset-1">
                  Consultar ventas
                </a>
              </Link>
              <Link href="/">
                <a onClick={handleCloseMenu} className="block text-lg underline underline-offset-1">
                  Cerrar sesión
                </a>
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 bg-[#F5F5F5] p-6 ml-16 mt-25">
        {/* Aquí iría el contenido principal de cada página */}
      </main>
    </div>
  );
}
