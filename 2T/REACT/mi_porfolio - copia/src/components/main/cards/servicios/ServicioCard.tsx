import type { IServicios } from "@/model/interfaces/servicios/IServicios";
// Importamos Link para convertir la tarjeta en un enlace
import { Link } from "react-router-dom";

interface Props {
    servicio: IServicios;
}

export const ServicioCard = ({ servicio }: Props) => {
    // Formateamos el precio
    // const precioFormateado = new Intl.NumberFormat('es-ES', {
    //     style: 'currency',
    //     currency: 'EUR',
    //     minimumFractionDigits: 2
    // }).format(servicio.precio);

    return (
        // CAMBIO 1 y 3: Ahora es un <Link> y el borde es 'border-2' y más opaco (/40)
        // También añadimos estilos de foco para accesibilidad
        <Link 
            to={`/servicios/${servicio.id}`} // O servicio.slug si lo tienes
            className="group flex flex-col bg-[#131b2e] rounded-sm overflow-hidden border-2 border-[#e4e7f0]/40 shadow-[0_24px_48px_rgba(0,0,0,0.12)] transition-all duration-500 hover:border-[#e9c349] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#e9c349] focus:ring-offset-2 focus:ring-offset-[#0b1326]"
        >
            
            {/* Contenedor de la Imagen */}
            <div className="relative h-56 w-full overflow-hidden bg-[#0b1326]">
                {/* CAMBIO 2: Imagen a Full Color (opacity-100, eliminamos mix-blend) */}
                <img 
                    src={servicio.imagen} 
                    alt={servicio.nombre}
                    className="w-full h-full object-cover opacity-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                
                {/* Degradado inferior para legibilidad del título, más suave ahora */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e] via-[#131b2e]/20 to-transparent" />
                
                {/* Etiqueta superior derecha */}
                <span className="absolute top-6 right-6 font-sans text-base font-bold tracking-[0.15em] text-[#ffc802] text-right uppercase z-10">
                    {servicio.tipo}
                </span>
            </div>

            {/* Contenido Editorial */}
            <div className="flex flex-col flex-grow p-8 pt-6">
                
                {/* Título Principal */}
                <h3 className="font-serif text-3xl text-[#e4e7f0] mb-4 tracking-tight group-hover:text-[#e9c349] transition-colors">
                    {servicio.nombre}
                </h3>
                
                {/* Descripción */}
                <p className="font-sans text-[#e4e7f0]/70 text-sm leading-relaxed mb-8 font-light line-clamp-4">
                    {servicio.descripcion}
                </p>

                {/* Precio (Estilizado como botón, pero ya no es un elemento interactivo real) */}
                <div className="mt-auto flex items-center justify-center ">
                    <span className="inline-block bg-gradient-to-br from-[#e9c349] to-[#9d7d00] text-[#0b1326] font-sans font-semibold 
                                    text-base px-10 py-3 rounded-md shadow-lg transform transition-transform duration-300 group-hover:scale-105">
                        Desde {servicio.precio} €
                    </span>
                </div>
                
            </div>
        </Link>
    );
};