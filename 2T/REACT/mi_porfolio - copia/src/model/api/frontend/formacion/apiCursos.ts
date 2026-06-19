import type { ICursos } from "@/model/interfaces/formacion/ICursos"
import { supabase } from "@/model/utils/supabase"


export const getCursos = async () : Promise<ICursos[]> => {

    //en data se almacena el resultado de la consulta a supabase para obtener los cursos
    const { data, error } = await supabase
        .from('cursos')
        .select ()

    if (error) {
        console.error(error)
        return []
    }

    return data as ICursos[]
}
