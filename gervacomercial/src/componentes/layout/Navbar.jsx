import { useState } from 'react';
import Link from 'next/link';
import { FiX } from 'react-icons/fi';
import { useRouter } from "next/router";


 function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const abrirPerfil = () => {
    const userRol = localStorage.getItem("userRol");
    if (userRol === 1) {
      router.push("/perfilAdmin");
    } else {
      router.push("/PerfilVendedor");
    }
  };
  const handleCloseMenu = () => {
    setIsMenuOpen (false);
  };


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex w-screen justify-center">
      <nav className={`flex items-center w-full h-25 bg-[#7DACB6] text-black transition-all duration-300 fixed top-0 left-0 justify-center`}> 
        <div className="p-5 flex items-center justify-between w-full max-w-screen-lg">
          <button onClick={toggleMenu} className="focus:outline-none">
            <img src="/menu.svg" alt="Menu" className="h-5 w-5" />
          </button>
          <img src="/logoGerva.svg" alt="Logo Gerva" className="h-6 w-7 mx-auto" />
          <button className="focus:outline-none">
            <img src="/acount.svg" alt="Account" className="h-5 w-5" onClick={abrirPerfil} />
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="mt-25 p-2 bg-white rounded-md shadow-lg w-full max-w-screen-lg fixed top-25 left-0">
          <button onClick={toggleMenu} className="flex items-center gap-2 mb-2 focus:outline-none">
            <FiX className="text-xl" />
          </button>
          <ul className="space-y-1">
            <li>
              <Link href="/registrar-productos"
                onClick={handleCloseMenu}>
                <div className="block p-1 text-sm font-medium rounded-md bg-[#E5E5E5] hover:bg-[#D1D1D1] cursor-pointer">
                  Registrar producto
                </div>
              </Link>
            </li>
            <li>
              <Link href="/consultar-productos"
                onClick={handleCloseMenu}>
                <div className="block p-1 text-sm font-medium rounded-md bg-[#E5E5E5] hover:bg-[#D1D1D1] cursor-pointer">
                  Lista de productos
                </div>
              </Link>
            </li>
            <li>
              <Link href="/registrar-empleados"
                onClick={handleCloseMenu}>
                <div className="block p-1 text-sm font-medium rounded-md bg-[#E5E5E5] hover:bg-[#D1D1D1] cursor-pointer">
                  Registrar empleados
                </div>
              </Link>
            </li>
            <li>
              <Link href="/consultar-empleados"
                onClick={handleCloseMenu}>
                <div className="block p-1 text-sm font-medium rounded-md bg-[#E5E5E5] hover:bg-[#D1D1D1] cursor-pointer">
                  Lista de empleados
                </div>
              </Link>
            </li>
            <li>
              <Link href="/registrar-venta"
                onClick={handleCloseMenu}>
                <div className="block p-1 text-sm font-medium rounded-md bg-[#E5E5E5] hover:bg-[#D1D1D1] cursor-pointer">
                  Registrar ventas
                </div>
              </Link>
            </li>
            <li>
              <Link href="/consultar-ventas"
                onClick={handleCloseMenu}>
                <div className="block p-1 text-sm font-medium rounded-md bg-[#E5E5E5] hover:bg-[#D1D1D1] cursor-pointer">
                  Consultar ventas
                </div>
              </Link>
            </li>
            <li>
              <Link href="/index"
                onClick={handleCloseMenu}>
                <div className="block p-1 text-sm font-medium rounded-md bg-[#E5E5E5] hover:bg-[#D1D1D1] cursor-pointer">
                  Cerrar sesión
                </div>
              </Link>
            </li>
          </ul>
        </div>
      )}
      <main className="flex-1 bg-[#F5F5F5] p-6 ml-16 mt-25">
        {/* Aquí iría el contenido principal de cada página */}
      </main>
    </div>
  );
}
export default Navbar