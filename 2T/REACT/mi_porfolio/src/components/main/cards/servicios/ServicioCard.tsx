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
            className="group flex flex-col bg-card rounded-sm overflow-hidden border-2 border-border shadow-[0_24px_48px_rgba(0,0,0,0.12)] transition-all duration-500 hover:border-primary hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
        >

            {/* Contenedor de la Imagen */}
            <div className="relative h-56 xl:h-72 w-full overflow-hidden bg-background">
                {/* CAMBIO 2: Imagen a Full Color (opacity-100, eliminamos mix-blend) */}
                <img
                    src={servicio.imagen}
                    alt={servicio.nombre}
                    className="w-full h-full object-cover opacity-100 transform-gpu will-change-transform scale-[1.01] group-hover:scale-110 transition-transform duration-700 ease-out backface-hidden"
                />

                {/* Etiqueta superior derecha */}
                <span className="absolute top-6 right-6 font-sans text-base xl:text-lg font-bold tracking-[0.15em] text-[#ffc802] text-right uppercase z-10">
                    {servicio.tipo}
                </span>
            </div>

            {/* Contenido Editorial */}
            <div className="flex flex-col grow p-8 pt-6 xl:p-11 xl:pt-9">

                {/* Título Principal */}
                <h3 className="font-serif text-3xl xl:text-4xl text-foreground mb-4 xl:mb-6 tracking-tight group-hover:text-primary transition-colors">
                    {servicio.nombre}
                </h3>

                {/* Descripción */}
                <p className="font-sans text-muted-foreground text-sm xl:text-lg leading-relaxed mb-8 xl:mb-10 font-light line-clamp-4">
                    {servicio.descripcion}
                </p>

                {/* Precio (Estilizado como botón, pero ya no es un elemento interactivo real) */}
                <div className="mt-auto flex items-center justify-center ">
                    <span className="inline-block bg-linear-to-br from-primary to-[#9d7d00] text-primary-foreground font-sans font-semibold
                                    text-base xl:text-lg px-10 py-3 xl:px-12 xl:py-4 rounded-md shadow-lg transform transition-transform duration-300 group-hover:scale-105">
                        Desde {servicio.precio} €
                    </span>
                </div>

            </div>
        </Link>
    );
};