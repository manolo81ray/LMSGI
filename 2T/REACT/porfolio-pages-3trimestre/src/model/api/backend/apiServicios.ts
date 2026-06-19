import type { IServicioAdmin } from "@/model/interfaces/IServicioAdmin"
import { supabase } from "@/model/utils/supabase"

export const getServicios = async (): Promise<IServicioAdmin[]> => {
    const { data, error } = await supabase
        .from('servicios')
        .select('*')
        .order('id', { ascending: false })

    if (error) {
        console.error(error)
        return []
    }

    return data as IServicioAdmin[]
}

export const insertServicio = async (servicio: Omit<IServicioAdmin, "id">) => {
    const { error } = await supabase
        .from('servicios')
        .insert([servicio])
        .select()

    if (error) {
        console.error(error)
        return false
    }
    return true
}

export const updateServicio = async (id: number, servicio: Omit<IServicioAdmin, "id">) => {
    const { error } = await supabase
        .from('servicios')
        .update(servicio)
        .eq('id', id)
        .select()

    if (error) {
        console.error(error)
        return false
    }
    return true
}

export const deleteServicio = async (id: number) => {
    const { error } = await supabase
        .from('servicios')
        .delete()
        .eq('id', id)

    if (error) {
        console.error(error)
        return false
    }
    return true
}
