export interface IContacto {
    id?:                                     number;
    nombre: 'Ubicación' | 'Redes Sociales' | string; // Añadimos las opciones válidas
    tecnologias?:                            string[] | string;
    URL?:                                    string[] | string;
} 