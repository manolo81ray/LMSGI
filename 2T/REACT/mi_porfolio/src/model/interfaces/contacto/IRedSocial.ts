export interface IRedSocial {
    id:          number;
    nombre:      string;   // "YouTube", "LinkedIn"...
    icono:       string;   // código SVG del icono
    url:         string;   // enlace al perfil
    orden:       number;   // orden de aparición en la web
    visible:     boolean;
    created_at?: string;
    updated_at?: string;
}
