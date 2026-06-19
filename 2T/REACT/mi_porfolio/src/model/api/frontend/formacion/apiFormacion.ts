import type { IFormacion } from "@/model/interfaces/formacion/IFormacion"
import { supabase } from "@/model/utils/supabase"

export const getFormaciones = async () : Promise<IFormacion[]> => {
    
    //en data se almacena el resultado de la consulta a supabase para obtener los cursos
    const { data, error } = await supabase
        .from('formacion')
        .select()
        .eq('visible', true)

    if (error) {
        console.error(error)
        return []
    }

    return data as IFormacion[]
}

// La usamos en FormacionDetalle
export const getFormacionId = async (id: string | number) : Promise<IFormacion | null> => {
    const { data, error } = await supabase
        .from('formacion')
        .select()
        .eq('id', id)
        .single() // Devuelve un solo objeto, no un array

    if (error) {
        console.error("Error obteniendo la formación:", error)
        return null
    }

    return data as IFormacion
}
