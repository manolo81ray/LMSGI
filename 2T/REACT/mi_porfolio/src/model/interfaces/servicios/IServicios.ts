export interface IServicios {
    id:          number;
    imagen:      string;
    nombre:      string;
    tipo:        string;
    descripcion: string;
    precio:      number;
    visible:     boolean;
    created_at?: string;
    updated_at?: string;
}
