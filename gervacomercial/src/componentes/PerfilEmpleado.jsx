import React from "react";
import { supabaseClient } from "@/utils/supabase";

function perfilEmpleado() {
    const handleSubmit = (e) => {};

    return (
        <div className="w-screen min-h-screen flex flex-col items-center bg-white text-black p-5 md:p-20">
            <div className="flex w-[80vw] justify-between mb-5">
                <h1 className="text-4xl font-bold">Perfil</h1>
                <label className="text-lg">
                    Ususario
                </label>
                <><label className="text-lg">
                    Empleado
                </label></>
            </div>

        </div>
    );
}

export default perfilEmpleado;