import type { ICursos } from "@/model/interfaces/formacion/ICursos"
import { supabase } from "@/model/utils/supabase"
import { registrarActividad, tituloDe } from "@/model/api/backend/dashboard/apiActividad"

export const getCursos = async (): Promise<ICursos[]> => {
    const { data, error } = await supabase
        .from("cursos")
        .select("*")
        .order("fecha", { ascending: false })

    if (error) {
        console.error(error)
        return []
    }
    return data as ICursos[]
}

export const insertCurso = async (curso: Omit<ICursos, "id">): Promise<boolean> => {
    const { error } = await supabase.from("cursos").insert([curso]).select()
    if (error) { console.error(error); return false }
    await registrarActividad("curso", "creado", curso.titulo)
    return true
}

export const updateCurso = async (id: number, curso: Omit<ICursos, "id">): Promise<boolean> => {
    const { error } = await supabase.from("cursos").update(curso).eq("id", id).select()
    if (error) { console.error(error); return false }
    await registrarActividad("curso", "editado", curso.titulo, id)
    return true
}

export const deleteCurso = async (id: number): Promise<boolean> => {
    const titulo = await tituloDe("curso", id)
    const { error } = await supabase.from("cursos").delete().eq("id", id)
    if (error) { console.error(error); return false }
    await registrarActividad("curso", "borrado", titulo, id)
    return true
}

export const updateCursoVisible = async (id: number, visible: boolean): Promise<boolean> => {
    const { error } = await supabase.from("cursos").update({ visible, updated_at: new Date().toISOString() }).eq("id", id)
    if (error) { console.error(error); return false }
    await registrarActividad("curso", visible ? "activado" : "ocultado", await tituloDe("curso", id), id)
    return true
}

export const updateCursoEnCurso = async (id: number, enCurso: boolean): Promise<boolean> => {
    const { error } = await supabase.from("cursos").update({ en_curso: enCurso, updated_at: new Date().toISOString() }).eq("id", id)
    if (error) { console.error(error); return false }
    await registrarActividad("curso", enCurso ? "en curso" : "completado", await tituloDe("curso", id), id)
    return true
}
