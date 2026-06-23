import { supabase } from "@/model/utils/supabase"
import type { AccionActividad, IActividadItem, TipoActividad } from "@/model/interfaces/dashboard/IActividad"

const LIMITE = 6

// Metadatos de cada entidad: tabla, clave primaria, columna del título y a
// dónde enlaza en el panel. Sirve tanto para resolver el href de la actividad
// como para buscar el título de una fila antes de borrarla.
interface Fuente {
    tabla: string
    pk: string
    tituloCol: string
    href: string
}

const FUENTES: Record<TipoActividad, Fuente> = {
    curso: { tabla: "cursos", pk: "id", tituloCol: "titulo", href: "/admin/cursos" },
    proyecto: { tabla: "proyectos", pk: "id", tituloCol: "titulo", href: "/admin/proyectos" },
    servicio: { tabla: "servicios", pk: "id", tituloCol: "nombre", href: "/admin/servicios" },
    formacion: { tabla: "formacion", pk: "id", tituloCol: "nombre", href: "/admin/formacion" },
    // La columna en la BD se llama "Nombre" (mayúscula), ver apiLenguajes.
    lenguaje: { tabla: "lenguajes", pk: "id_lenguaje", tituloCol: "Nombre", href: "/admin/lenguajes" },
    red: { tabla: "redes_sociales", pk: "id", tituloCol: "nombre", href: "/admin/redes" },
}

// Inserta una fila en el registro de actividad. No bloquea ni hace fallar la
// operación principal: si algo va mal solo se traza por consola.
export const registrarActividad = async (
    tipo: TipoActividad,
    accion: AccionActividad,
    titulo: string,
    entidadId?: number,
): Promise<void> => {
    const { error } = await supabase
        .from("actividad")
        .insert([{ tipo, accion, titulo: titulo || "(sin título)", entidad_id: entidadId ?? null }])
    if (error) console.error(error)
}

// Busca el título de una fila por su id. Se usa antes de borrar (cuando ya no
// tenemos el objeto) o al cambiar visibilidad (solo recibimos el id).
export const tituloDe = async (tipo: TipoActividad, id: number): Promise<string> => {
    const f = FUENTES[tipo]
    const { data, error } = await supabase.from(f.tabla).select(f.tituloCol).eq(f.pk, id).single()
    if (error) { console.error(error); return "(sin título)" }
    return ((data as unknown as Record<string, unknown>)?.[f.tituloCol] as string) ?? "(sin título)"
}

// Devuelve los últimos movimientos registrados, ya ordenados por la BD.
export const getActividadReciente = async (limite = LIMITE): Promise<IActividadItem[]> => {
    const { data, error } = await supabase
        .from("actividad")
        .select("id, tipo, accion, titulo, fecha")
        .order("fecha", { ascending: false })
        .limit(limite)

    if (error) { console.error(error); return [] }

    return (data ?? []).map((row) => {
        const r = row as unknown as Record<string, unknown>
        const tipo = r.tipo as TipoActividad
        return {
            id: r.id as number,
            tipo,
            titulo: (r.titulo as string) ?? "(sin título)",
            accion: r.accion as AccionActividad,
            fecha: r.fecha as string,
            href: FUENTES[tipo]?.href ?? "/admin",
        }
    })
}
