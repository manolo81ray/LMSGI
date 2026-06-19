import type { ITrabajo } from "@/model/interfaces/ITrabajo"
import { supabase } from "@/model/utils/supabase"

export const getTrabajos = async (): Promise<ITrabajo[]> => {
    const { data, error } = await supabase
        .from('trabajos')
        .select('*')
        .order('id', { ascending: false })

    if (error) {
        console.error(error)
        return []
    }

    return data as ITrabajo[]
}

export const insertTrabajo = async (trabajo: Omit<ITrabajo, "id">) => {
    const { error } = await supabase
        .from('trabajos')
        .insert([trabajo])
        .select()

    if (error) {
        console.error(error)
        return false
    }
    return true
}

export const updateTrabajo = async (id: number, trabajo: Omit<ITrabajo, "id">) => {
    const { error } = await supabase
        .from('trabajos')
        .update(trabajo)
        .eq('id', id)
        .select()

    if (error) {
        console.error(error)
        return false
    }
    return true
}

export const deleteTrabajo = async (id: number) => {
    const { error } = await supabase
        .from('trabajos')
        .delete()
        .eq('id', id)

    if (error) {
        console.error(error)
        return false
    }
    return true
}
