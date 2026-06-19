import type { IFormacion } from "@/model/interfaces/formacion/IFormacion"
import { supabase } from "@/model/utils/supabase"

export const getFormaciones = async () : Promise<IFormacion[]> => {
    
    //en data se almacena el resultado de la consulta a supabase para obtener los cursos
    const { data, error } = await supabase
        .from('formacion')
        .select ()

    if (error) {
        console.error(error)
        return []
    }

    return data as IFormacion[]
}
