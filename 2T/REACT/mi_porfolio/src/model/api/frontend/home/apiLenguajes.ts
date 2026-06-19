import type { ILenguajes } from "@/model/interfaces/home/ILenguajes"
import { supabase } from "@/model/utils/supabase"

/* Promise es una promesa que cuando se resuelva devolverá un array de IProducto
Algo que no tenemos aún, pero si tendremos en el futuro
    ---> Voy a devolverte una lista de productos .. pero no ahora, sino en un f
*/
// funcion para obtener los cursos desde SUPABASE y almacenarlos en el estado de cursos

export const getLenguajes = async () : Promise<ILenguajes[]> => {
    //en data se almacena el resultado de la consulta a supabase para obtener los cursos
    const { data, error } = await supabase
        .from('lenguajes')
        .select()
        .eq('visible', true)

    if (error) {
        console.error(error)
        return []
    }

    return data as ILenguajes[]
}
