import type { IRedSocial } from "@/model/interfaces/contacto/IRedSocial"
import { supabase } from "@/model/utils/supabase"
import { registrarActividad, tituloDe } from "@/model/api/backend/dashboard/apiActividad"

// Lista completa (incluye ocultas) para el panel admin.
export const getRedes = async (): Promise<IRedSocial[]> => {
    const { data, error } = await supabase
        .from("redes_sociales")
        .select("*")
        .order("orden", { ascending: true })
        .order("id", { ascending: true })

    if (error) {
        console.error(error)
        return []
    }
    return (data ?? []) as IRedSocial[]
}

export const insertRed = async (red: Omit<IRedSocial, "id">): Promise<boolean> => {
    const { error } = await supabase.from("redes_sociales").insert([red]).select()
    if (error) { console.error(error); return false }
    await registrarActividad("red", "creado", red.nombre ?? "")
    return true
}

export const updateRed = async (id: number, red: Omit<IRedSocial, "id">): Promise<boolean> => {
    const { error } = await supabase
        .from("redes_sociales")
        .update({ ...red, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
    if (error) { console.error(error); return false }
    await registrarActividad("red", "editado", red.nombre ?? "", id)
    return true
}

export const deleteRed = async (id: number): Promise<boolean> => {
    const titulo = await tituloDe("red", id)
    const { error } = await supabase.from("redes_sociales").delete().eq("id", id)
    if (error) { console.error(error); return false }
    await registrarActividad("red", "borrado", titulo, id)
    return true
}

export const updateRedVisible = async (id: number, visible: boolean): Promise<boolean> => {
    const { error } = await supabase
        .from("redes_sociales")
        .update({ visible, updated_at: new Date().toISOString() })
        .eq("id", id)
    if (error) { console.error(error); return false }
    await registrarActividad("red", visible ? "activado" : "ocultado", await tituloDe("red", id), id)
    return true
}
