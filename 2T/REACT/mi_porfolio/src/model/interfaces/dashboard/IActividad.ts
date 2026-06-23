export type TipoActividad = "curso" | "proyecto" | "servicio" | "formacion" | "lenguaje" | "red"

// Qué se hizo con la fila desde el panel admin.
export type AccionActividad = "creado" | "editado" | "ocultado" | "activado" | "borrado" | "en curso" | "completado"

export interface IActividadItem {
    id: number
    tipo: TipoActividad
    titulo: string
    accion: AccionActividad
    fecha: string
    href: string
}
