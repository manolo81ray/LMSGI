export interface IProyectos {
    id:             number;
    titulo:         string;
    url:            string | null;
    fecha_creacion: Date;
    tecnologia:     string;
    etiquetas:      string[];
    descripcion:    string;
    img_web:        string;
    visible:        boolean;
    created_at?:    string;
    updated_at?:    string;
}
