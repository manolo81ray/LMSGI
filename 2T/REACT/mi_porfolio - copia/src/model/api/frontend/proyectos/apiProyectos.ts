import type { IProyectos } from "@/model/interfaces/proyectos/IProyectos"
import { supabase } from "@/model/utils/supabase"


export const getProyectos = async () : Promise<IProyectos[]> => {
    
    //en data se almacena el resultado de la consulta a supabase para obtener los cursos
    const { data, error } = await supabase
        .from('proyectos')
        .select ()
        .order('id', { ascending: true })

    if (error) {
        console.error(error)
        return []
    }

    return data as IProyectos[]
}

