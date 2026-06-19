import type { IServicios } from "@/model/interfaces/servicios/IServicios"
import { supabase } from "@/model/utils/supabase"

export const getServicios = async (): Promise<IServicios[]> => {
    const { data, error } = await supabase
        .from("servicios")
        .select("*")
        .order("id", { ascending: false })

    if (error) {
        console.error(error)
        return []
    }
    return data as IServicios[]
}

export const insertServicio = async (servicio: Omit<IServicios, "id">): Promise<boolean> => {
    const { error } = await supabase.from("servicios").insert([servicio]).select()
    if (error) { console.error(error); return false }
    return true
}

export const updateServicio = async (id: number, servicio: Omit<IServicios, "id">): Promise<boolean> => {
    const { error } = await supabase.from("servicios").update(servicio).eq("id", id).select()
    if (error) { console.error(error); return false }
    return true
}

export const deleteServicio = async (id: number): Promise<boolean> => {
    const { error } = await supabase.from("servicios").delete().eq("id", id)
    if (error) { console.error(error); return false }
    return true
}

export const updateServicioVisible = async (id: number, visible: boolean): Promise<boolean> => {
    const { error } = await supabase.from("servicios").update({ visible, updated_at: new Date().toISOString() }).eq("id", id)
    if (error) { console.error(error); return false }
    return true
}
