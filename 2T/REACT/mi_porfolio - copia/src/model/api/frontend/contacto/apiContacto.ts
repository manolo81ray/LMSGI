import type { IContacto } from "@/model/interfaces/contacto/IContacto"
import { supabase } from "@/model/utils/supabase"

/* Promise es una promesa que cuando se resuelva devolverá un array de IProducto
Algo que no tenemos aún, pero si tendremos en el futuro
    ---> Voy a devolverte una lista de productos .. pero no ahora, sino en un f
*/

// funcion para obtener los cursos desde SUPABASE y almacenarlos en el estado de cursos

export const getContactos = async () : Promise<IContacto[]> => {
    //en data se almacena el resultado de la consulta a supabase para obtener los cursos
    const { data, error } = await supabase
        .from('contacto')
        .select ('*')
        .order ('id', { ascending: true })

    if (error) {
        console.error(error)
        return []
    }

    return data as IContacto[]
}

// getCurso(id:number) => devuelve un curso por su id

//getFilterCursos(precio, academia, categoria)