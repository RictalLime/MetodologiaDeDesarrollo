import React from 'react'
import { supabaseClient } from "@/utils/supabase";
import registrarAsistencia from '@/utils/registrarAsistencias';
import { useState } from 'react';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
  
    const handleLogin = async () => {
      setLoading(true);
      try {
        const { user, error } = await supabase.auth.signIn({ email, password });
  
        if (error) {
          throw error;
        }
  
        if (user) {
          // Llamar a la función para registrar la asistencia
          await registrarAsistencia(user.id);
          console.log('Inicio de sesión exitoso');
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error.message);
      } finally {
        setLoading(false);
      }
    };

    return (
        <div className='w-screen flex flex-col items-center'>
            <h1 className='text-5xl mb-8 font-serif font-bold'>
                Iniciar sesión
            </h1>
            <form className='flex flex-col items-center space-y-6' onSubmit={handleLogin}>
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
                        Correo Electrónico
                    </label>
                    <input className='border-2 border-negro rounded-[25px] mt-2' type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>

                {/* Grupo de Contraseña */}
                <div className='flex flex-col items-center'>
                    <label className='text-lg text-center font-bold'>
                        Contraseña
                    </label>
                    <input className='border-2 border-negro rounded-[25px] mt-2' type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>

                {/* Botón de Iniciar Sesión */}
                <button onClick={handleLogin} disabled={loading}>
                    {loading ? 'Cargando...' : 'Iniciar Sesión'}
                </button>
                <button className='underline font-bold'>Olvidé mi contraseña</button>
            </form>
        </div>
    )
}

export default Login

