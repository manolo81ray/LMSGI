import type { IFormacion } from "@/model/interfaces/formacion/IFormacion"
import { supabase } from "@/model/utils/supabase"

export const getFormaciones = async (): Promise<IFormacion[]> => {
    const { data, error } = await supabase
        .from("formacion")
        .select("*")
        .order("fecha_inicio", { ascending: false })

    if (error) {
        console.error(error)
        return []
    }
    return data as IFormacion[]
}

export const insertFormacion = async (formacion: Omit<IFormacion, "id">): Promise<boolean> => {
    const { error } = await supabase.from("formacion").insert([formacion]).select()
    if (error) { console.error(error); return false }
    return true
}

export const updateFormacion = async (id: number, formacion: Omit<IFormacion, "id">): Promise<boolean> => {
    const { error } = await supabase.from("formacion").update(formacion).eq("id", id).select()
    if (error) { console.error(error); return false }
    return true
}

export const deleteFormacion = async (id: number): Promise<boolean> => {
    const { error } = await supabase.from("formacion").delete().eq("id", id)
    if (error) { console.error(error); return false }
    return true
}

export const updateFormacionVisible = async (id: number, visible: boolean): Promise<boolean> => {
    const { error } = await supabase.from("formacion").update({ visible, updated_at: new Date().toISOString() }).eq("id", id)
    if (error) { console.error(error); return false }
    return true
}
