export type TipoActividad = "curso" | "proyecto" | "servicio" | "formacion" | "lenguaje"

// Qué ocurrió con la fila: se creó, o se cambió su visibilidad en la web.
export type AccionActividad = "creado" | "activado" | "ocultado"

export interface IActividadItem {
    id: number
    tipo: TipoActividad
    titulo: string
    accion: AccionActividad
    visible: boolean
    fecha: string | null
    href: string
}
