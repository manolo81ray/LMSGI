// Forma real de la tabla "servicios" en Supabase, usada por el backend/admin.
// NOTA: es distinta de IServicio (usado por el sitio publico con datos
// estaticos de servicios.json). No reutilizar una por la otra.
export interface IServicioAdmin {
    id:          number;
    nombre:      string;
    tipo:        string;
    descripcion: string;
    imagen:      string | null;
    precio:      number;
}
