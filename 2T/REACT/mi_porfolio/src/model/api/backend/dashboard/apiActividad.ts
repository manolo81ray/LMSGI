import { supabase } from "@/model/utils/supabase"
import type { AccionActividad, IActividadItem, TipoActividad } from "@/model/interfaces/dashboard/IActividad"

const LIMITE = 6

interface Fuente {
    tabla: string
    pk: string
    tituloCol: string
    tipo: TipoActividad
    href: string
}

// Cada entidad guarda su título en una columna distinta, así que mapeamos
// la tabla -> columna de título -> tipo para poder unificarlas en una sola lista.
const FUENTES: Fuente[] = [
    { tabla: "cursos", pk: "id", tituloCol: "titulo", tipo: "curso", href: "/admin/cursos" },
    { tabla: "proyectos", pk: "id", tituloCol: "titulo", tipo: "proyecto", href: "/admin/proyectos" },
    { tabla: "servicios", pk: "id", tituloCol: "nombre", tipo: "servicio", href: "/admin/servicios" },
    { tabla: "formacion", pk: "id", tituloCol: "nombre", tipo: "formacion", href: "/admin/formacion" },
    { tabla: "lenguajes", pk: "id_lenguaje", tituloCol: "nombre", tipo: "lenguaje", href: "/admin/lenguajes" },
]

// `updated_at` solo se rellena al cambiar la visibilidad (ver updateXxxVisible),
// así que si existe representa el último ocultar/activar; si no, la fila solo se creó.
const resolverAccion = (visible: boolean, updatedAt: string | null): AccionActividad => {
    if (!updatedAt) return "creado"
    return visible ? "activado" : "ocultado"
}

// Trae los últimos movimientos de cada tabla (alta o cambio de visibilidad),
// los combina y devuelve los más recientes en conjunto. Las filas sin fecha
// quedan al final (nullsFirst: false).
export const getActividadReciente = async (limite = LIMITE): Promise<IActividadItem[]> => {
    const porFuente = await Promise.all(
        FUENTES.map(async (f) => {
            const columnas = `${f.pk}, ${f.tituloCol}, visible, created_at, updated_at`

            // Pedimos las más recientes por alta y por cambio de visibilidad: así
            // afloran tanto las recién creadas como las antiguas que se acaban de
            // ocultar/activar (su created_at puede ser viejo y quedarían fuera).
            const [porAlta, porCambio] = await Promise.all([
                supabase.from(f.tabla).select(columnas).order("created_at", { ascending: false, nullsFirst: false }).limit(limite),
                supabase.from(f.tabla).select(columnas).order("updated_at", { ascending: false, nullsFirst: false }).limit(limite),
            ])

            if (porAlta.error) console.error(porAlta.error)
            if (porCambio.error) console.error(porCambio.error)

            // Fusionamos y quitamos duplicados por clave primaria.
            const porId = new Map<unknown, Record<string, unknown>>()
            for (const row of [...(porAlta.data ?? []), ...(porCambio.data ?? [])]) {
                porId.set((row as Record<string, unknown>)[f.pk], row as Record<string, unknown>)
            }

            return [...porId.values()].map((row) => {
                const createdAt = (row.created_at as string) ?? null
                const updatedAt = (row.updated_at as string) ?? null
                const visible = Boolean(row.visible)
                return {
                    id: row[f.pk] as number,
                    tipo: f.tipo,
                    titulo: (row[f.tituloCol] as string) ?? "(sin título)",
                    accion: resolverAccion(visible, updatedAt),
                    visible,
                    // La fecha relevante es la del último movimiento: el cambio de
                    // visibilidad si lo hubo, o la de alta en caso contrario.
                    fecha: updatedAt ?? createdAt,
                    href: f.href,
                }
            })
        })
    )

    return porFuente
        .flat()
        .sort((a, b) => {
            const ta = a.fecha ? new Date(a.fecha).getTime() : 0
            const tb = b.fecha ? new Date(b.fecha).getTime() : 0
            return tb - ta
        })
        .slice(0, limite)
}
