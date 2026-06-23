import { useEffect, useRef } from "react"
import { supabase } from "@/model/utils/supabase"

/**
 * Suscribe a cambios en una o varias tablas de Supabase (Realtime) y ejecuta
 * `onCambio` cada vez que se inserta, actualiza o borra una fila. Pensado para
 * que la web pública se refresque sola cuando se edita desde el panel admin.
 *
 * Uso:
 *   useRealtime("proyectos", fetchProyectos)
 *   useRealtime(["formacion", "cursos"], recargarTodo)
 *
 * Requiere que la tabla esté añadida a la publicación `supabase_realtime`
 * (ver supabase/realtime.sql). Respeta el RLS: el visitante solo recibe
 * cambios de las filas que tiene permitido ver.
 */
export const useRealtime = (tablas: string | string[], onCambio: () => void) => {
    // Guardamos el callback en una ref para no resuscribirnos en cada render.
    const callbackRef = useRef(onCambio)
    callbackRef.current = onCambio

    const lista = Array.isArray(tablas) ? tablas : [tablas]
    const clave = lista.join(",")

    useEffect(() => {
        const canal = supabase.channel(`realtime:${clave}`)

        for (const tabla of lista) {
            canal.on(
                "postgres_changes",
                { event: "*", schema: "public", table: tabla },
                () => callbackRef.current(),
            )
        }

        canal.subscribe()

        return () => {
            supabase.removeChannel(canal)
        }
        // `clave` resume la lista de tablas; el callback va por ref.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clave])
}
