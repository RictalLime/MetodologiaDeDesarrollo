import { supabaseClient } from "@/utils/supabase";

const registrarAsistencia = async (userId) => {
  try {
    // Obtener la fecha actual sin hora
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    // Verificar si ya existe un registro de asistencia para el usuario en el día de hoy
    const { data: asistenciaExistente, error: errorExistente } = await supabaseClient
      .from('asistencia') // Cambia 'asistencias' al nombre correcto de tu tabla
      .select('usuarioid')
      .eq('usuarioid', userId)
      .gte('fecha', hoy.toISOString()) // Filtra para verificar si ya hay una asistencia registrada hoy
      .single();

    if (errorExistente && errorExistente.code !== 'PGRST116') {
      throw errorExistente;
    }

    if (!asistenciaExistente) {
      // Si no existe un registro, insertar una nueva asistencia
      const { error } = await supabaseClient
        .from('asistencias')
        .insert([{ usuario_id: userId, fecha: new Date().toISOString() }]);

      if (error) {
        throw error;
      }

      console.log('Asistencia registrada correctamente');
    } else {
      console.log('Ya existe un registro de asistencia para el día de hoy');
    }
  } catch (error) {
    console.error('Error al registrar la asistencia:', error.message);
  }
};
