import { useEffect, useRef } from "react"
import { supabase } from "@/model/utils/supabase"

/**
 * Suscribe a avisos de cambios en una o varias tablas y ejecuta `onCambio`
 * cada vez que se inserta, actualiza, oculta o borra una fila. Pensado para
 * que la web pública se refresque sola cuando se edita desde el panel admin.
 *
 * Usa Broadcast desde la base de datos (trigger -> realtime.send) en vez de
 * `postgres_changes`. Así el aviso llega SIEMPRE, también al ocultar o borrar
 * (postgres_changes no entrega esos eventos al visitante porque la fila deja
 * de ser visible por RLS). El aviso no lleva datos de la fila: solo dice qué
 * tabla cambió, así que no expone contenido oculto.
 *
 * Requiere los triggers de supabase/realtime.sql.
 *
 * Uso:
 *   useRealtime("proyectos", fetchProyectos)
 *   useRealtime(["formacion", "cursos"], recargarTodo)
 */
export const useRealtime = (tablas: string | string[], onCambio: () => void) => {
    // Guardamos el callback en una ref para no resuscribirnos en cada render.
    const callbackRef = useRef(onCambio)
    callbackRef.current = onCambio

    const lista = Array.isArray(tablas) ? tablas : [tablas]
    const clave = lista.join(",")

    useEffect(() => {
        const canales = lista.map((tabla) => {
            // El topic debe coincidir con el que emite el trigger: "cambios:<tabla>"
            const canal = supabase.channel(`cambios:${tabla}`)
            canal.on("broadcast", { event: "cambio" }, () => callbackRef.current())
            canal.subscribe()
            return canal
        })

        return () => {
            for (const canal of canales) supabase.removeChannel(canal)
        }
        // `clave` resume la lista de tablas; el callback va por ref.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clave])
}
