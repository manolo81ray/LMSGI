import type { IDescripcion } from "@/model/interfaces/home/IDescripcion"
import { supabase } from "@/model/utils/supabase"


export const getDescripciones = async () : Promise<IDescripcion[]> => {
    
    //en data se almacena el resultado de la consulta a supabase para obtener los cursos
    const { data, error } = await supabase
        .from('descripcion')
        .select ()

    if (error) {
        console.error(error)
        return []
    }

    return data as IDescripcion[]
}
