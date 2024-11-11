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
        <div className="flex-grow flex justify-center">
          <img src="/logoGerva.svg" alt="" className="w-40 h-20" />
        </div>
        <div className="flex-grow flex justify-center">
          <img
            src="/acount.svg"
            alt=""
            className="w-10 cursor-pointer"
            onClick={abrirPerfil}
          />
        </div>
      </nav>

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
            <Link href="/registrar-productos" className="text-lg underline underline-offset-1 mb-2" onClick={handleCloseMenu}>
                Registrar producto
            </Link>
            <Link href="/consultar-productos" className="text-lg underline underline-offset-1 mb-2" onClick={handleCloseMenu}>
                Lista de productos
            </Link>
            <Link href="/registrar-empleados" className="text-lg underline underline-offset-1 mb-2" onClick={handleCloseMenu}>
                Registrar empleados
            </Link>
            <Link href="/consultar-empleados" className="text-lg underline underline-offset-1 mb-2" onClick={handleCloseMenu}>
                Lista de empleados
            </Link>
            <Link href="/registrar-venta" className="text-lg underline underline-offset-1 mb-2" onClick={handleCloseMenu}>
                Registrar ventas
            </Link>
            <Link href="/consultar-ventas" className="text-lg underline underline-offset-1 mb-2" onClick={handleCloseMenu}>
                Consultar ventas
            </Link>
            <Link href="/login" className="text-lg underline underline-offset-1 mb-2" onClick={handleCloseMenu}>
                Cerrar sesión
            </Link>
            

          </div>
        </div>
      )}
      <main className="flex-1 bg-[#F5F5F5] p-6 ml-16 mt-25">
        {/* Aquí iría el contenido principal de cada página */}
      </main>
    </div>
  );
}
export default Navbar