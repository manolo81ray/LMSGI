import type { ICursos } from "@/model/interfaces/formacion/ICursos"
import { supabase } from "@/model/utils/supabase"


export const getCursos = async () : Promise<ICursos[]> => {

    //en data se almacena el resultado de la consulta a supabase para obtener los cursos
    const { data, error } = await supabase
        .from('cursos')
        .select()
        .eq('visible', true)

    if (error) {
        console.error(error)
        return []
    }

    return data as ICursos[]
}

// La usamos en CursoDetalle
export const getCursoId = async (id: string | number) : Promise<ICursos | null> => {
    const { data, error } = await supabase
        .from('cursos')
        .select()
        .eq('id', id)
        .single() // Devuelve un solo objeto, no un array

    if (error) {
        console.error("Error obteniendo el curso:", error)
        return null
    }

    return data as ICursos
}
