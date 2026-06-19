export interface ICurso {
    id:          number;
    titulo:      string;
    descripcion: string;
    plataforma:  string;
    imagen:      string | null;
    fecha:       string;
    etiquetas:   string[];
    precio:      number;
    impartido:   string | null;
}
