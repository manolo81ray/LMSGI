import type { ILenguajes } from "@/model/interfaces/home/ILenguajes"
import { supabase } from "@/model/utils/supabase"

export const getLenguajes = async (): Promise<ILenguajes[]> => {
    const { data, error } = await supabase
        .from("lenguajes")
        .select("*")
        .order("id_lenguaje", { ascending: true })

    if (error) {
        console.error(error)
        return []
    }
    // La columna en la BD se llama "Nombre" (mayuscula); la normalizamos a "nombre"
    return (data ?? []).map(({ Nombre, ...rest }) => ({ ...rest, nombre: Nombre })) as ILenguajes[]
}

// Convierte la propiedad "nombre" del modelo a la columna "Nombre" de la BD
const toRow = ({ nombre, ...rest }: Omit<ILenguajes, "id_lenguaje">) => ({ ...rest, Nombre: nombre })

export const insertLenguaje = async (lenguaje: Omit<ILenguajes, "id_lenguaje">): Promise<boolean> => {
    const { error } = await supabase.from("lenguajes").insert([toRow(lenguaje)]).select()
    if (error) { console.error(error); return false }
    return true
}

export const updateLenguaje = async (id_lenguaje: number, lenguaje: Omit<ILenguajes, "id_lenguaje">): Promise<boolean> => {
    const { error } = await supabase.from("lenguajes").update(toRow(lenguaje)).eq("id_lenguaje", id_lenguaje).select()
    if (error) { console.error(error); return false }
    return true
}

export const deleteLenguaje = async (id_lenguaje: number): Promise<boolean> => {
    const { error } = await supabase.from("lenguajes").delete().eq("id_lenguaje", id_lenguaje)
    if (error) { console.error(error); return false }
    return true
}

export const updateLenguajeVisible = async (id_lenguaje: number, visible: boolean): Promise<boolean> => {
    const { error } = await supabase.from("lenguajes").update({ visible, updated_at: new Date().toISOString() }).eq("id_lenguaje", id_lenguaje)
    if (error) { console.error(error); return false }
    return true
}
