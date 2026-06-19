import type { IProyectos } from "@/model/interfaces/proyectos/IProyectos"
import { supabase } from "@/model/utils/supabase"


export const getProyectos = async () : Promise<IProyectos[]> => {
    
    //en data se almacena el resultado de la consulta a supabase para obtener los cursos
    const { data, error } = await supabase
        .from('proyectos')
        .select()
        .eq('visible', true)
        .order('id', { ascending: true })

    if (error) {
        console.error(error)
        return []
    }

    return data as IProyectos[]
}

// La usamos en ProyectoDetalle
export const getProyectoId = async (id: string | number) : Promise<IProyectos | null> => {
    const { data, error } = await supabase
        .from('proyectos')
        .select()
        .eq('id', id)
        .single() // Devuelve un solo objeto, no un array

    if (error) {
        console.error("Error obteniendo el proyecto:", error)
        return null
    }

    return data as IProyectos
}

