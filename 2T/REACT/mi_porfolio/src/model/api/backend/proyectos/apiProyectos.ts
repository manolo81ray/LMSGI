import type { IProyectos } from "@/model/interfaces/proyectos/IProyectos"
import { supabase } from "@/model/utils/supabase"

export const getProyectos = async (): Promise<IProyectos[]> => {
    const { data, error } = await supabase
        .from("proyectos")
        .select("*")
        .order("id", { ascending: false })

    if (error) {
        console.error(error)
        return []
    }
    return data as IProyectos[]
}

export const insertProyecto = async (proyecto: Omit<IProyectos, "id">): Promise<boolean> => {
    const { error } = await supabase.from("proyectos").insert([proyecto]).select()
    if (error) { console.error(error); return false }
    return true
}

export const updateProyecto = async (id: number, proyecto: Omit<IProyectos, "id">): Promise<boolean> => {
    const { error } = await supabase.from("proyectos").update(proyecto).eq("id", id).select()
    if (error) { console.error(error); return false }
    return true
}

export const deleteProyecto = async (id: number): Promise<boolean> => {
    const { error } = await supabase.from("proyectos").delete().eq("id", id)
    if (error) { console.error(error); return false }
    return true
}

export const updateProyectoVisible = async (id: number, visible: boolean): Promise<boolean> => {
    const { error } = await supabase.from("proyectos").update({ visible, updated_at: new Date().toISOString() }).eq("id", id)
    if (error) { console.error(error); return false }
    return true
}
