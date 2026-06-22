export interface ICursos {
    id:          number;
    imagen:      string;
    fecha:       Date;
    fecha_fin?:  Date | null;
    plataforma:  string;
    titulo:      string;
    descripcion: string;
    etiquetas:   string[];
    precio:      number;
    impartido:   string;
    visible:     boolean;
    created_at?: string;
    updated_at?: string;
}
