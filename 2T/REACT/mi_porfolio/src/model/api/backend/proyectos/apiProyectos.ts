import type { IProyectos } from "@/model/interfaces/proyectos/IProyectos"
import { supabase } from "@/model/utils/supabase"
import { registrarActividad, tituloDe } from "@/model/api/backend/dashboard/apiActividad"

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
    await registrarActividad("proyecto", "creado", proyecto.titulo)
    return true
}

export const updateProyecto = async (id: number, proyecto: Omit<IProyectos, "id">): Promise<boolean> => {
    const { error } = await supabase.from("proyectos").update(proyecto).eq("id", id).select()
    if (error) { console.error(error); return false }
    await registrarActividad("proyecto", "editado", proyecto.titulo, id)
    return true
}

export const deleteProyecto = async (id: number): Promise<boolean> => {
    const titulo = await tituloDe("proyecto", id)
    const { error } = await supabase.from("proyectos").delete().eq("id", id)
    if (error) { console.error(error); return false }
    await registrarActividad("proyecto", "borrado", titulo, id)
    return true
}

export const updateProyectoVisible = async (id: number, visible: boolean): Promise<boolean> => {
    const { error } = await supabase.from("proyectos").update({ visible, updated_at: new Date().toISOString() }).eq("id", id)
    if (error) { console.error(error); return false }
    await registrarActividad("proyecto", visible ? "activado" : "ocultado", await tituloDe("proyecto", id), id)
    return true
}
