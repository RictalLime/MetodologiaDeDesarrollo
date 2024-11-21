import Image from "next/image";

export default function Navbarnologin() {
  return (
    <nav className="flex items-center justify-center w-full h-20 bg-[#7DACB6] text-black transition-all duration-300 fixed top-0 left-0">
      <Image
        src="/logoGerva.svg"
        alt="Logo de Gerva Comercial"
        width={28}
        height={24}
        priority
      />
    </nav>
  );
}  