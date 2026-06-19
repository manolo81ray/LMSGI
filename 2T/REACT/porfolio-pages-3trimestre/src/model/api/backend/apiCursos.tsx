import type { ICurso } from "@/model/interfaces/ICurso"
import { supabase } from "@/model/utils/supabase"

export const getCursos = async (): Promise<ICurso[]> => {
    const { data, error } = await supabase
        .from('cursos')
        .select('*')
        .order('id', { ascending: false })

    if (error) {
        console.error(error)
        return []
    }

    return data as ICurso[]
}

export const insertCurso = async (curso: Omit<ICurso, "id">) => {
    const { error } = await supabase
        .from('cursos')
        .insert([curso])
        .select()

    if (error) {
        console.error(error)
        return false
    }
    return true
}

export const updateCurso = async (id: number, curso: Omit<ICurso, "id">) => {
    const { error } = await supabase
        .from('cursos')
        .update(curso)
        .eq('id', id)
        .select()

    if (error) {
        console.error(error)
        return false
    }
    return true
}

export const deleteCurso = async (id: number) => {
    const { error } = await supabase
        .from('cursos')
        .delete()
        .eq('id', id)

    if (error) {
        console.error(error)
        return false
    }
    return true
}
