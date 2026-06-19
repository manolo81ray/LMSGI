import type { IServicios } from "@/model/interfaces/servicios/IServicios"
import { supabase } from "@/model/utils/supabase"


export const getServicios = async () : Promise<IServicios[]> => {
    
    //en data se almacena el resultado de la consulta a supabase para obtener los cursos
    const { data, error } = await supabase
        .from('servicios')
        .select()
        .eq('visible', true)

    if (error) {
        console.error(error)
        return []
    }

    return data as IServicios[]
}

// La usamos en ServicioDetalle)
export const getServicioId = async (id: string | number) : Promise<IServicios | null> => {
    const { data, error } = await supabase
        .from('servicios')
        .select()
        .eq('id', id)
        .single() // Devuelve un solo objeto, no un array

    if (error) {
        console.error("Error obteniendo el servicio:", error)
        return null
    }

    return data as IServicios
}