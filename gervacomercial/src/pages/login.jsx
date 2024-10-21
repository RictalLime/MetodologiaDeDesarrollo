import React from 'react'

function Login() {
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className='w-screen flex flex-col items-center'>
            <h1 className='text-5xl mb-8 font-serif font-bold'>
                Iniciar sesión
            </h1>
            <form className='flex flex-col items-center space-y-6' onSubmit={handleSubmit}>
                {/* Grupo de Rol */}
                <div className='flex flex-col items-center'>
                    <label className='text-lg text-center font-bold'>
                        Rol
                    </label>
                    <select className='border-2 border-negro rounded-[25px] mt-2' name="RolOpciones" id="RolSelect">
                        <optgroup className='text-base' label="Selecciona un rol">
                            <option className='text-base' value="">Administrador</option>
                            <option className='text-base' value="">Empleado</option>
                        </optgroup>
                    </select>
                </div>

                {/* Grupo de Correo */}
                <div className='flex flex-col items-center'>
                    <label className='text-lg text-center font-bold'>
                        Correo Electrónico o nombre de usuario
                    </label>
                    <input className='border-2 border-negro rounded-[25px] mt-2' type="text" name="email" id="emailInput" />
                </div>

                {/* Grupo de Contraseña */}
                <div className='flex flex-col items-center'>
                    <label className='text-lg text-center font-bold'>
                        Contraseña
                    </label>
                    <input className='border-2 border-negro rounded-[25px] mt-2' type="password" />
                </div>

                {/* Botón de Iniciar Sesión */}
                <button className='text-lg border-2 rounded-[25px] border-negro bg-[#7DACB6] px-4 py-2 font-bold' type="submit">
                    Iniciar sesión
                </button>
                <button className='underline font-bold'>Olvidé mi contraseña</button>
            </form>
        </div>
    )
}

export default Login

