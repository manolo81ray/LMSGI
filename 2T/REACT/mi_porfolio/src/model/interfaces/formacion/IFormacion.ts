export interface IFormacion {
    id:                number;
    tipo:              string;
    fecha_inicio:      string;
    fecha_fin:         string;
    nombre:            string;
    descripcion:       string;
    imagen:            string;
    institucion:       string;
    lugar_institucion: string;
    visible:           boolean;
    created_at?:       string;
    updated_at?:       string;
}
