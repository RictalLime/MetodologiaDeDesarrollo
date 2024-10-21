import React from 'react'

function Login() {
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className='w-screen flex flex-col items-center'>
            <button className='rounded-full border-3 border-[#151918] bg-[#7DACB6] items-center'>
                <span className="material-icons">arrow_back</span>
            </button>
            <h1 className='text-5xl mb-8 font-serif font-bold'>
                Crear empleados
            </h1>
            <form className='flex flex-col items-center space-y-6' onSubmit={handleSubmit}>
                <label className='text-lg text-center font-bold'>
                    Nombre del usuario
                </label>
                <input className='border-2 border-negro rounded-[25px] mt-2' type="text" name='nombre'/>
                <label className='text-lg text-center font-bold'>
                    Sueldo por día
                </label>
                <input className='border-2 border-negro rounded-[25px] mt-2' type="text"/>
                <button className='text-lg border-2 rounded-[25px] border-negro bg-[#7DACB6] px-4 py-2 font-bold font-serif' type='submit'>
                    GUARDAR
                </button>
            </form>
        </div>

    )
}

export default Login
